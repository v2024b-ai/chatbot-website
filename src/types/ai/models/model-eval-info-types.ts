import { z } from "zod";

export const modelInfo = z.object({
  model: z
    .string()
    .min(5, { message: "Model name length must be at least 5 characters." }),
  url: z.string().url("Please input a URL"),
  ppInput: z.number(),
  ppOutput: z.number(),
  termsURL: z.string().url("Please input a URL"),
  ctxLength: z.number().min(0, "Must have a context length greater than 1"),
  modelSize: z.number(),
  maxOutput: z.number(),
  maxInput: z.number(),
  fileInput: z.boolean(),
  fileOutput: z.boolean(),
  perplexity: z.string().nullable(),
  bleu: z.number().nullable(),
  rouge: z.number().nullable(),
  meteor: z.number().nullable(),
  inputResponseTime: z.number().nullable(),
  outputResponseTime: z.number().nullable(),
});

export type ModelInfo = z.infer<typeof modelInfo>;
