import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { addModelInput } from "@/types/modelInput";

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
