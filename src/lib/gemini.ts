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
import { capitalizeFirstLetter } from "./utils";
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
  async embed(data: string) {
    const result = await this.Model.embedContent(data);
    return result.embedding.values;
  }

  // takes in an array of strings and returns embeddings
  async batchEmbedDocuments(data: string[]) {
    function convertData(text: string) {
      return {
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        content: {
          role: "user",
          parts: [{ text }],
        },
      };
    }

    const result = await this.Model.batchEmbedContents({
      requests: data.map(convertData),
    });

    return result.embeddings;
  }

  async getRelivantChunks(qryString: string, topK = 5) {
    const [embeddings, qryVector] = await Promise.all([
      db.embeddings.findMany(),
      this.embed(qryString),
    ]);

    const sortedChunks = embeddings
      .map((embedding) => ({
        cs: this.cosineSimilarity(qryVector, embedding.embedding),
        text: embedding.text,
      }))
      .sort((a, b) => (a.cs < b.cs ? 1 : -1))
      .slice(0, topK);

    console.log(">>> SORTED COSINE CHUNKS: ", sortedChunks);
    return sortedChunks;
  }

  private cosineSimilarity(a: number[], b: number[]) {
    const dotProduct = a.reduce((t, e, i) => (t += e * b[i]!), 0);

    const magnitudes = [a, b]
      .map((e) => Math.sqrt(e.reduce((t, f) => (t += f * f), 0)))
      .reduce((t, f) => (t += f), 1);

    return dotProduct / magnitudes;
  }

  async chunkPDF(URL: string, chunkSize = 5, chunkOverlap = 1) {
    try {
      // Fetch the PDF file as a stream
      const { data: fileStream } = await axios.get<Buffer>(URL, {
        responseType: "arraybuffer",
      });

      // Parse the PDF directly from the stream
      const parsedPDF = await pdf(fileStream);
      console.log(">>> PDF Text Extracted:", parsedPDF.text);

      const text = parsedPDF.text ?? "";
      const paragraphs = text
        .split(/\n+/) // Split on single or multiple newlines
        .reduce((acc, line) => {
          const trimmedLine = line.trim();

          if (
            acc.length > 0 &&
            acc[acc.length - 1]?.endsWith('.') &&
            trimmedLine.length > 0
          ) {
            acc.push(trimmedLine); // Start a new paragraph
          } else if (trimmedLine.length > 0) {
            if (acc.length === 0) {
              acc.push(trimmedLine);
            } else {
              acc[acc.length - 1] += ` ${trimmedLine}`;
            }
          }

          return acc;
        }, [] as string[]) // Ensure the accumulator is typed as an array of strings
        .filter((para) => para.length > 0);

      const chunks: string[] = [];

      // Generate chunks with the specified size and overlap
      for (let i = 0; i < paragraphs.length; i += chunkSize - chunkOverlap) {
        const chunk = paragraphs.slice(i, i + chunkSize).join("\n\n"); // Join paragraphs with double newlines
        chunks.push(chunk);
        if (i + chunkSize >= paragraphs.length) break; // Stop when near the end
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

  // takes text (prompt) and FileData[], which is returned by the upload() method
  async promptWithFile(messages: PromptSchema[], fileData: FileData[]) {
    const result = await this.Model.generateContent([
      this.formatMessages(messages),
      ...fileData.map((data) => ({ fileData: data })),
    ]);
    return result.response.text();
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
