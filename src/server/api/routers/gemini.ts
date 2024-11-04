import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Gemini } from "@/lib/gemini";
import {
  promptSchema,
  type UploadFileData,
  uploadFileData,
} from "@/types/ai/gemini";
import { PineconeHelper } from "@/lib/pinecone";

export const chatRouter = createTRPCRouter({
  text: publicProcedure
    .input(z.object({ data: z.array(promptSchema) }))
    .mutation(async ({ input: { data }, ctx }) => {
      const gemini = new Gemini();
      const pine = new PineconeHelper();

      const pineconeInput = data.at(data.length - 1)?.content;

      if (!pineconeInput) return;

      // Retrieve relevant report titles and URLs from the database
      const urlAndNames = await ctx.db.iqpData.findMany({
        where: {
          title: {
            in: await pine.getReports({ input: pineconeInput }),
          },
        },
        select: {
          title: true,
          url: true,
        },
      });

      console.log("after Prisma query: ", urlAndNames);

      // Send the prompt data to Gemini and get the response
      const geminiResponse = await gemini.prompt(data);

      // Prepare the recommended files as an array of objects
      const recommendedFiles = urlAndNames.map((file) => ({
        title: file.title,
        url: file.url,
      }));

      // Return an object with both the response message and recommended files
      return {
        message: geminiResponse,
        recommendedFiles,
      };
    }),

  uploadFile: publicProcedure
    .input(z.object({ data: z.array(uploadFileData) }))
    .mutation(async ({ input: { data } }) => {
      const gemini = new Gemini();
      return gemini.upload(data);
    }),
});
