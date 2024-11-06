import "server-only";
import { GoogleGenerativeAI } from "@google/generative-ai";
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

export class Gemini {
  private AImodelName = { model: "gemini-1.5-pro" };
  private GenAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  private Model = this.GenAI.getGenerativeModel(this.AImodelName);
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
    this.AImodelName = { model: name };
  }
}
