import { EmbeddingsList, PineconeRecord } from "@pinecone-database/pinecone";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { pineconeQueryInput, pineconeReportStore } from "@/types/pinecone";
import { index, indexName, model, pc } from "@/lib/pinecone";

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

export const pineconeRouter = createTRPCRouter({
  getReports: publicProcedure
    .input(pineconeQueryInput) // Use the defined input schema
    .mutation(async ({ input: { input } }) => {
      const vector: number[] = await generateEmbeddings(input);

      // Perform the query with the numeric vector
      const response = await index.namespace(indexName).query({
        topK: 3,
        vector: vector,
        includeValues: true,
      });

      console.log("this is the response: ", response);
      return response.matches.map((match) => match.id);
    }),
  storeReports: publicProcedure
    .input(pineconeReportStore)
    .mutation(async ({ input }) => {
      const vector: number[] = await generateEmbeddings(input.input);

      // Create the upsert record
      const record: PineconeRecord = {
        id: input.id,
        values: vector,
        metadata: {},
      };

      // Call the upsert method with the correct structure
      await index.namespace(indexName).upsert([record]);

      return { message: "Report stored successfully" }; // Return a success message
    }),
});
