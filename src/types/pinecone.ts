import { z } from "zod";

export const pineconeQueryInput = z.object({
  input: z
    .string()
    .min(2, { message: "Input must be longer than 2 characters" })
    .max(50, { message: "Input must be shorter than 50 characters" }),
});

export type PineconeQueryInput = z.infer<typeof pineconeQueryInput>;
