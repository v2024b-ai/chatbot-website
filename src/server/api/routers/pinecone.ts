import { EmbeddingsList, Pinecone } from "@pinecone-database/pinecone";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { pineconeQueryInput } from "@/types/pinecone";
import { index, indexName, model, pc } from "@/lib/pinecone";

export const pineconeRouter = createTRPCRouter({
  getReports: publicProcedure
    .input(pineconeQueryInput) // Use the defined input schema
    .mutation(async ({ input: { input } }) => {
      let vector: number[] = []; // Define vector as a number array

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
          vector = embeddings[0]!.values; // Assuming `values` is the key that holds the numeric array
        } else {
          throw new Error("No embeddings received.");
        }
      } catch (error) {
        console.error("Error generating embeddings:", error);
        throw new Error("Failed to generate embeddings.");
      }

      // Perform the query with the numeric vector
      const response = await index.namespace(indexName).query({
        topK: 5,
        vector: vector,
        includeValues: true,
      });

      console.log("this is the response: ", response);
      return response;
    }),
});
