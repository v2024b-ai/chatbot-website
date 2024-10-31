import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { addModelSchema } from "@/types/ai/models/model-eval-info-types";
import axios from "axios";

interface PostData {
  genStr: string;
}

interface scores {
  scores: { BLEU: number; ROUGE: number; METEOR: number };
}

export const modelRoute = createTRPCRouter({
  addModel: publicProcedure
    .input(addModelSchema)
    .mutation(async ({ input, ctx }) => {
      // EVAL IS A STRING
      const Eval: scores = await postEval({ genStr: input.modelOutput });
      console.log(Eval);
      console.log(Eval.scores.BLEU);
      console.log(Eval.scores.ROUGE);
      console.log(Eval.scores.METEOR);

      return ctx.db.aiEval.create({
        data: {
          model: input.model,
          url: input.url,
          ppInput: input.ppInput,
          ppOutput: input.ppOutput,
          termsURL: input.termsURL,
          ctxLength: input.ctxLength,
          modelSize: input.modelSize,
          maxOutput: input.maxOutput,
          maxInput: input.maxInput,
          fileInput: input.fileInput,
          outputResponseTime: input.outputResponseTime,
          fileOutput: input.fileOutput,
          perplexity: input.perplexity,
          bleu: Eval.scores.BLEU,
          rouge: Eval.scores.ROUGE,
          meteor: Eval.scores.METEOR,
        },
      });
    }),

  getModel: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return ctx.db.aiEval.findFirst({
      where: { model: input },
    });
  }),

  getAllModels: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.aiEval.findMany();
  }),
});

const postEval = async (data: PostData): Promise<scores> => {
  const url = "https://chatvpc-python.vercel.app/test-scoring/";
  try {
    const evals = await axios.post<scores>(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return evals.data;
  } catch (error) {
    console.error("Error posting evals:", error);
    throw error;
  }
};
