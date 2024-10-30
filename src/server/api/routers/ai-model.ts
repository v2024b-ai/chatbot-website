import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { addModelSchema } from "@/types/ai/models/model-eval-info-types";
import axios from 'axios';


interface PostData {
  genStr: string;
}

interface EvalData {
  BLEU: string,
  METEOR: string,
  ROUGE: string;
}

export const modelRoute = createTRPCRouter({
  addModel: publicProcedure
    .input(addModelSchema)
    .mutation(async ({ input, ctx }) => {
      try{
      const submitEval = async () => {
          const Eval = await postEval({genStr: input.modelOutput});
          console.log("Eval result: ", Eval)
          return Eval
        }
      } catch (error) {
        console.error('Error getting evals:', error)
        throw error
      }

      return ctx.db.aiEval.create({
        data: { ...input },
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

const postEval = async (data: PostData): Promise<EvalData> => {

  const url = "chatvpc-python.vercel.app/test-scoring/"

  try {
    const evals = await axios.post<EvalData>(url, data, {
      headers: {
        'Content Type': 'application/json',
      },
    });
    return evals.data;
  } catch (error) {
    console.error('Error posting evals:', error);
    throw error;
  }
}