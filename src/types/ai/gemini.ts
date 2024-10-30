import { z } from "zod";

export const promptSchema = z.object({
  role: z.string(),
  content: z.string(),
});

export type PromptSchema = z.infer<typeof promptSchema>;

export const fileData = z.object({
  fileUri: z.string(),
  mimeType: z.string(),
});

export const uploadFileData = z.object({
  fileURL: z.string(),
  mimeType: z.string(),
  displayName: z.string(),
});

export type FileData = z.infer<typeof fileData>;

export type UploadFileData = z.infer<typeof uploadFileData>;
