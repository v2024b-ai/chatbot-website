import { z } from "zod";

export const pineconeQueryInput = z.object({
  input: z
    .string()
    .min(2, { message: "Input must be longer than 2 characters" }),
});

export const pineconeReportStore = z.object({
  input: z.string(),
  id: z.string(),
});

export type PineconeQueryInput = z.infer<typeof pineconeQueryInput>;

export type PineconeReportStore = z.infer<typeof pineconeReportStore>;
