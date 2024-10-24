import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const addModelInput = z.object({
  model: z
    .string()
    .min(5, { message: "Model name length must be at least 5 characters." }),
  url: z.string(),
  ppInput: z.number().nullable(),
  ppOutput: z.number().nullable(),
  termsURL: z.string().nullable(),
  ethicalConcern: z.boolean().nullable(),
  ctxLength: z.number().nullable(),
  modelSize: z.number().nullable(),
  perplexity: z.string().nullable(),
  bleu: z.number().nullable(),
  rouge: z.number().nullable(),
  meteor: z.number().nullable(),
  inputResponseTime: z.number().nullable(),
  outputResponseTime: z.number().nullable(),
  maxOutput: z.number().nullable(),
  maxInput: z.number().nullable(),
  fileInput: z.boolean().nullable(),
  fileOutput: z.boolean().nullable(),
  features: z.string().nullable(),
});

export const modelRoute = createTRPCRouter({
  addModel: publicProcedure
    .input(addModelInput)
    .mutation(async ({ input, ctx }) => {
      return ctx.db.aiEval.create({
        data: { ...input },
      });
    }),

  getModel: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return ctx.db.aiEval.findFirst({
      where: { model: input },
    });
  }),
});
