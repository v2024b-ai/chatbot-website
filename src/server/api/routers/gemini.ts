import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Gemini } from "@/lib/gemini";
import { uploadFileData } from "@/types/ai/gemini";

export const chatRouter = createTRPCRouter({
  text: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    const gemini = new Gemini();
    const output = await gemini.prompt(input);
    return output;
  }),

  uploadFile: publicProcedure
    .input(z.object({ data: z.array(uploadFileData) }))
    .mutation(async ({ input }) => {
      const gemini = new Gemini();
      return gemini.upload(input.data);
    }),
});
