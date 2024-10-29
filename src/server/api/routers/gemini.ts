import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Gemini } from "@/lib/gemini";
import { promptSchema, uploadFileData } from "@/types/ai/gemini";

export const chatRouter = createTRPCRouter({
  text: publicProcedure
    .input(z.object({ data: z.array(promptSchema) }))
    .mutation(async ({ input: { data } }) => {
      const gemini = new Gemini();
      const output = await gemini.prompt(data);
      return output;
    }),

  uploadFile: publicProcedure
    .input(z.object({ data: z.array(uploadFileData) }))
    .mutation(async ({ input: { data } }) => {
      const gemini = new Gemini();
      return gemini.upload(data);
    }),
});
