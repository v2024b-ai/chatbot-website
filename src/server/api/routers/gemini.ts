import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Gemini } from "@/lib/gemini";
import {
  promptSchema,
  type UploadFileData,
  uploadFileData,
} from "@/types/ai/gemini";
import { index, indexName, model, pc } from "@/lib/pinecone";
import { type EmbeddingsList } from "@pinecone-database/pinecone";

async function generateEmbeddings(input: string): Promise<number[]> {
  try {
    const embeddings: EmbeddingsList = await pc.inference.embed(
      model,
      [input],
      {
        inputType: "query",
        truncate: "END",
      },
    );

    console.log("These are the embedding data: ", embeddings);

    // Extract the vector from the embeddings response
    if (embeddings.length > 0 && embeddings[0]!.values) {
      return embeddings[0]!.values;
    } else {
      throw new Error("No embeddings received.");
    }
  } catch (error) {
    console.error("Error generating embeddings:", error);
    throw new Error("Failed to generate embeddings.");
  }
}

export const chatRouter = createTRPCRouter({
  text: publicProcedure
    .input(z.object({ data: z.array(promptSchema) }))
    .mutation(async ({ input: { data }, ctx }) => {
      const gemini = new Gemini();

      const pineconeInput = data.at(data.length - 1)?.content;

      if (!pineconeInput) return;

      const vector: number[] = await generateEmbeddings(pineconeInput);

      // Perform the query with the numeric vector
      const response = await index.namespace(indexName).query({
        topK: 10,
        vector: vector,
        includeValues: true,
      });

      console.log("this is the response: ", response);
      const relevantReportNames = response.matches.map((match) => match.id);

      // Retrieve relevant report titles and URLs from the database
      const urlAndNames = await ctx.db.iqpData.findMany({
        where: {
          title: {
            in: relevantReportNames,
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
