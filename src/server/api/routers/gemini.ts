import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Gemini, SemanticRetriever } from "@/lib/gemini";
import {
  propmptWithFilesSchema,
  uploadFileData,
  promptSchema,
} from "@/types/ai/gemini";

export const chatRouter = createTRPCRouter({
  promptWithPDFChunks: publicProcedure
    .input(z.object({ data: z.array(promptSchema) }))
    .mutation(async ({ input: { data } }) => {
      const gemini = new Gemini();
      const mostRecentPrompt = data.at(data.length - 1)?.content
      if (!mostRecentPrompt) throw Error("No content!")
      const retriever = new SemanticRetriever()

      const relivantPDFChunks = await retriever.getRelivantChunks(mostRecentPrompt)

      // Send the prompt data to Gemini and get the response
      const geminiResponse = await gemini.promptWithChunks(data, relivantPDFChunks.map(chunk => chunk.text));

      // Return an object with both the response message and recommended files
      return geminiResponse;
    }),

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
