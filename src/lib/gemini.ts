import {
  type GenerativeModel,
  GoogleGenerativeAI,
  TaskType,
} from "@google/generative-ai";
import "server-only";

import { GoogleAIFileManager } from "@google/generative-ai/server";
import axios from "axios";
import fs from "fs";
import path from "path";
import {
  type FileData,
  type PromptSchema,
  type UploadFileData,
} from "@/types/ai/gemini";
import { capitalizeFirstLetter, convertToMarkdownTable } from "./utils";
import { type Readable } from "stream";
import { db } from "@/server/db";
import pdf from "pdf-parse";

export class SemanticRetriever {
  private AIEmbeddingName = { model: "text-embedding-004" };
  private GenAI: GoogleGenerativeAI;
  private Model: GenerativeModel;

  constructor() {
    this.GenAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    this.Model = this.GenAI.getGenerativeModel(this.AIEmbeddingName);
  }

  // takes in a string and returns embedding
  private async embed(data: string) {
    const result = await this.Model.embedContent(data);
    return result.embedding.values;
  }

  // takes in an array of strings and returns embeddings
  async batchEmbedDocument(documentParts: string[], title: string) {
    const convertData = (text: string) => ({
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      content: {
        role: "user",
        parts: [{ text }],
      },
    })

    const result = await this.Model.batchEmbedContents({
      requests: documentParts.map(convertData),
    });

    const data = documentParts.map((text, index) => ({
      text,
      embedding: result.embeddings[index]?.values, // Ensure embedding values are properly extracted
    }));

    // Update the database with the processed data
    return db.iqpData.update({
      where: { title },
      data: {
        pdfContents: {
          createMany: { data },
        },
      },
    });
  }

  async getRelivantChunks(qryString: string, topK = 5) {
    const [embeddings, qryVector] = await Promise.all([
      db.embeddings.findMany({
        select: {
          embedding: true,
          text: true,
          iqpTitle: true
        }
      }),
      this.embed(qryString),
    ]);

    const sortedChunks = embeddings
      .map(({ text, embedding, iqpTitle }) => ({
        cs: this.cosineSimilarity(qryVector, embedding),
        text,
        iqpTitle
      }))
      .sort((a, b) => (a.cs < b.cs ? 1 : -1))
      .slice(0, topK);

    return sortedChunks;
  }

  private cosineSimilarity(a: number[], b: number[]) {
    const dotProduct = a.reduce((t, e, i) => (t += e * b[i]!), 0);

    const magnitudes = [a, b]
      .map((e) => Math.sqrt(e.reduce((t, f) => (t += f * f), 0)))
      .reduce((t, f) => (t += f), 1);

    return dotProduct / magnitudes;
  }

  async chunkPDF(URL: string, chunkSize = 35, chunkOverlap = 3) {
    try {
      // Fetch the PDF file as a stream
      const { data: fileStream } = await axios.get<Buffer>(URL, {
        responseType: "arraybuffer",
      });

      // Parse the PDF directly from the stream
      const parsedPDF = await pdf(fileStream);

      // Split the text into sentences using regex
      const sentences = parsedPDF.text
        .split(/(?<=[.!?])\s+/) // Split after '.', '!', or '?' followed by whitespace
        .map((sentence) => sentence.trim()) // Trim whitespace around sentences
        .filter((sentence) => sentence.length > 0); // Remove empty strings

      const chunks: string[] = [];

      // Generate chunks with the specified size and overlap
      for (let i = 0; i < sentences.length; i += chunkSize - chunkOverlap) {
        const chunk = sentences.slice(i, i + chunkSize).join(" "); // Join sentences into a chunk
        chunks.push(chunk);
        if (i + chunkSize >= sentences.length) break; // Stop when near the end
      }

      return chunks;
    } catch (error) {
      console.error("Error while processing PDF:", error);
      throw new Error("Failed to process the PDF");
    }
  }
}


export class Gemini {
  private AIModelName = { model: "gemini-1.5-pro" };
  private GenAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  private Model: GenerativeModel = this.GenAI.getGenerativeModel(
    this.AIModelName,
  );
  private fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY!);

  // only takes text
  async prompt(messages: PromptSchema[]) {
    const result = await this.Model.generateContent(
      this.formatMessages(messages),
    );
    return result.response.text();
  }

  async promptWithChunks(messages: PromptSchema[], chunks: string[], assistantRole = "helpful assistant") {
    if (!chunks || chunks.length === 0)
      throw new Error("Chunks cannot be empty.");

    const systemPrompt: PromptSchema = {
      role: "system",
      content: `You are a ${assistantRole} for the VPC, or Venice project center for Worcester Polytechnic Institute (wpi). Here is some context provided to you in the form of paragraphs:
              ${chunks.join("\n\n")}
              Use this information to answer the user's questions.
              If the provided context is insufficient to answer a question, respond with "I do not know."`
    };

    try {
      const result = await this.Model.generateContent(
        this.formatMessages([systemPrompt, ...messages]),
      );
      return result.response.text();
    } catch (error) {
      console.error("Error generating content:", error);
      throw new Error("Failed to generate content.");
    }
  }

  // takes text (prompt) and FileData[], which is returned by the upload() method
  async promptWithFile(messages: PromptSchema[], fileData: FileData[]) {
    const result = await this.Model.generateContent([
      this.formatMessages(messages),
      ...fileData.map((data) => ({ fileData: data })),
    ]);
    return result.response.text();
  }

  async promptWithDB(messages: PromptSchema[], csvSchema: string) {
    const systemPrompt: PromptSchema = {
      role: "system",
      content: "You are a chatbot that is meant to give back an PostgreSQL query on a specific schema based on " +
        "the users question. Do NOT give back anything else other than PostgreSQL queries. If you are return an " +
        "SQL query, start the query with ```sql and do NOT include anything else in the message. Limit the " +
        "amount of rows you would the query show to 25 rows. Do not select all of" +
        " the columns. Only select the columns relevant to the users question and the wiki friendly name for the fountains. " +
        " In your SQL statements, " +
        "ALWAYS add quotation marks around the name of the relation in the FROM field. Always filter out " +
        " NULL values from the results. Only return the user another SQL query if they " +
        "explicitly request you to do so. You will then answer questions based on the result of the query, " +
        "not necessarily only in SQL. This is the prisma schema you will use to reference:" + csvSchema
    };

    try {
      const result = await this.Model.generateContent(
        this.formatMessages([systemPrompt, ...messages]),
      );

      // Extract the response text
      const responseText = result.response.text();

      // Extract the SQL query from the response
      const sqlStatement = responseText
        .split('```sql') // Split the text to isolate the SQL query
        .filter((_, index) => index % 2 !== 0) // Only take the odd indexed sections (SQL queries)
        .map((query) => query.split('```')[0]?.trim())[0]; // Get the first SQL query, if any

      if (sqlStatement) {
        // Run the SQL query if one is found
        //

        const rows: Record<string, unknown>[] = await db.$queryRawUnsafe(sqlStatement);

        //return rows
        return convertToMarkdownTable(rows);
      } else {
        return responseText
      }
    } catch (error) {
      console.error("Error generating content:", error);
      throw new Error("Failed to generate content.");
    }
  }

  private formatMessages(messages: PromptSchema[]) {
    return messages
      .map((msg) => `${capitalizeFirstLetter(msg.role)}: ${msg.content}`)
      .join("\n");
  }

  async upload(fileData: UploadFileData[]): Promise<FileData[]> {
    const returnData: FileData[] = [];

    // const newFiles = fileData;
    // retrueves a list of already uploaded files to gemini
    const UploadedFiles = await this.getFileList();

    console.log("got to before filtering data");

    const newFiles = fileData.filter((file) => {
      if (!UploadedFiles.names.has(file.displayName)) {
        return true;
      }

      const alreadyCashedFile = UploadedFiles.data.find(
        (cashedFile) => cashedFile.displayName === file.displayName,
      );

      if (alreadyCashedFile) {
        returnData.push({
          fileUri: alreadyCashedFile.fileUri,
          mimeType: alreadyCashedFile.mimeType,
        });
      }

      return false;
    });

    console.log(">>> NEW FILES TO UPLOAD TO GEMINI: ", newFiles);

    await Promise.all(
      newFiles.map(async (file) => {
        const filePath = path.join("/tmp", path.basename(file.fileURL));

        const fileResponse = await axios.get(file.fileURL, {
          responseType: "stream",
        });

        const writer = fs.createWriteStream(filePath);

        (fileResponse.data as Readable).pipe(writer);

        await new Promise<void>((res, rej) => {
          writer.on("finish", res);
          writer.on("error", rej);
        });
        //
        const result = await this.fileManager.uploadFile(filePath, {
          ...file,
        });

        returnData.push({
          mimeType: result.file.mimeType,
          fileUri: result.file.uri,
        });
      }),
    );

    return returnData;
  }

  private async getFileList() {
    const result = await this.fileManager.listFiles();

    console.log(">>>> RESULT FROM GET FILE LIST: ", result);

    // Check if files are undefined and handle it
    if (!result.files) {
      return { names: new Set(), data: [] };
    }

    console.log(">>>> RESULT FROM GET FILE LIST: ", result);

    return {
      names: new Set(result.files.map((file) => file.name)),
      data: result.files.map((file) => ({
        fileUri: file.uri,
        mimeType: file.mimeType,
        displayName: file.displayName,
      })),
    };
  }

  set modelName(name: string) {
    this.AIModelName = { model: name };
    this.Model = this.GenAI.getGenerativeModel(this.AIModelName);
  }
}
