import { z } from "zod";

export const promptSchema = z.object({
  role: z.string(),
  content: z.string(),
});

export const uploadFileData = z.object({
  fileURL: z.string(),
  mimeType: z.string(),
  displayName: z.string(),
});

export const promptWithDBSchema = z.object({
  data: z.array(promptSchema)
})

export const propmptWithFilesSchema = z.object({
  data: z.array(promptSchema),
  files: uploadFileData,
});

export type PromptSchema = z.infer<typeof promptSchema>;

export const fileData = z.object({
  fileUri: z.string(),
  mimeType: z.string(),
});

export type UploadFileData = z.infer<typeof uploadFileData>;

export type FileData = z.infer<typeof fileData>;
