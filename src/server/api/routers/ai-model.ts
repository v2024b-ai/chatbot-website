import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { modelInfo } from "@/types/ai/models/model-eval-info-types";

export const modelRoute = createTRPCRouter({
  addModel: publicProcedure
    .input(modelInfo)
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

  getAllModels: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.aiEval.findMany();
  }),
});
