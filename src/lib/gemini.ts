import "server-only";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import axios from "axios";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { FileData, UploadFileData } from "@/types/ai/gemini";

export class Gemini {
  AImodelName = { model: "gemini-1.5-flash" };
  GenAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
  Model = this.GenAI.getGenerativeModel(this.AImodelName);
  fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY as string);

  constructor() {}

  // only takes text
  async prompt(text: string) {
    const result = await this.Model.generateContent(text);
    return result.response.text();
  }

  // takes text (prompt) and FileData[], which is returned by the upload() method
  async promptWithFile(text: string, fileData: FileData[]) {
    const result = await this.Model.generateContent([
      text,
      ...fileData.map((data) => ({ fileData: data })),
    ]);
    return result.response.text;
  }

  async upload(fileData: UploadFileData[]) {
    // convert fs unlink into a promise based func
    const unlinkAsync = promisify(fs.unlink);
    const returnData: FileData[] = [];

    // retrueves a list of already uploaded files to gemini
    const UploadedFiles = await this.getFileList();

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

    await Promise.all(
      newFiles.map(async (file) => {
        const filePath = path.join("/tmp", path.basename(file.fileURL));

        try {
          const fileResponse = await axios.get(file.fileURL, {
            responseType: "stream",
          });

          const writer = fs.createWriteStream(filePath);
          fileResponse.data.pipe(writer);

          await new Promise<void>((res, rej) => {
            writer.on("finish", res);
            writer.on("error", rej);
          });

          const result = await this.fileManager.uploadFile(filePath, {
            ...file,
          });

          returnData.push({
            mimeType: result.file.mimeType,
            fileUri: result.file.uri,
          });
        } finally {
          await unlinkAsync(filePath); // cleanup
        }
      }),
    );

    return returnData;
  }

  async getFileList() {
    const result = await this.fileManager.listFiles();
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
