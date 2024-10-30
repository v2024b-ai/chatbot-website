import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { addModelSchema } from "@/types/ai/models/model-eval-info-types";
import axios from 'axios';

interface Scores {
  BLEU: string;
  METEOR: string;
  ROUGE: string;
}

interface Data {
  scores: Scores;
}

interface PostData {
  genStr: string;
}

export const modelRoute = createTRPCRouter({
  addModel: publicProcedure
    .input(addModelSchema)
    .mutation(async ({ input, ctx }) => {
      
      const Eval = await postEval({genStr: input.modelOutput});
      
      const data: Data = JSON.parse(Eval);

      console.log(data.scores);
      console.log(data.scores.BLEU);
      console.log(data.scores.ROUGE);
      console.log(data.scores.METEOR);

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
          bleu: parseFloat(data.scores.BLEU),
          rouge: parseFloat(data.scores.ROUGE),
          meteor: parseFloat(data.scores.METEOR)
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

const postEval = async (data: PostData): Promise<string> => {

  const url = "https://chatvpc-python.vercel.app/test-scoring/"

  try {
    const evals = await axios.post<string>(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return evals.data;
  } catch (error) {
    console.error('Error posting evals:', error);
    throw error;
  }
}