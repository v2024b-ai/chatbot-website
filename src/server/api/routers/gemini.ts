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

    console.log("These are the embedding shit: ", embeddings);

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

      const pinecodeInput = data.at(data.length - 1)?.content;

      if (!pinecodeInput) return;

      const vector: number[] = await generateEmbeddings(pinecodeInput);

      // Perform the query with the numeric vector
      const response = await index.namespace(indexName).query({
        topK: 1,
        vector: vector,
        includeValues: true,
      });

      console.log("this is the response: ", response);
      const relavantReportNames = response.matches.map((match) => match.id);

      const urlAndNames = await ctx.db.iqpData.findMany({
        where: {
          title: {
            in: relavantReportNames,
          },
        },
        select: {
          title: true,
          url: true,
        },
      });

      console.log("after prisma query: ", urlAndNames);

      const urlNamesMimeObjects = urlAndNames.map(
        (obj): UploadFileData => ({
          fileURL: obj.url,
          mimeType: "application/pdf",
          displayName: obj.title,
        }),
      );

      console.log("After mapping with mimetype: ", urlNamesMimeObjects);

      const geminiUploadResults = await gemini.upload(urlNamesMimeObjects);

      const output = await gemini.promptWithFile(data, geminiUploadResults);
      return output;
    }),

  uploadFile: publicProcedure
    .input(z.object({ data: z.array(uploadFileData) }))
    .mutation(async ({ input: { data } }) => {
      const gemini = new Gemini();
      return gemini.upload(data);
    }),
});
