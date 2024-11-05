import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Gemini } from "@/lib/gemini";
import {
  propmptWithFilesSchema,
  uploadFileData,
  promptSchema,
} from "@/types/ai/gemini";

export const chatRouter = createTRPCRouter({
  prompt: publicProcedure
    .input(propmptWithFilesSchema)
    .mutation(async ({ input }) => {
      const gemini = new Gemini();

      const fileData = await gemini.upload([input.files]);
      const geminiResponse = await gemini.promptWithFile(input.data, fileData);

      return geminiResponse;
    }),

  text: publicProcedure
    .input(z.object({ data: z.array(promptSchema) }))
    .mutation(async ({ input: { data } }) => {
      const gemini = new Gemini();

      // Send the prompt data to Gemini and get the response
      const geminiResponse = await gemini.prompt(data);

      // Return an object with both the response message and recommended files
      return geminiResponse;
    }),

  uploadFile: publicProcedure
    .input(z.object({ data: z.array(uploadFileData) }))
    .mutation(async ({ input: { data } }) => {
      const gemini = new Gemini();
      return gemini.upload(data);
    }),
});
