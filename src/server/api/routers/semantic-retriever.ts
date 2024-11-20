// import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
// import { EmbeddingData } from "@/types/embedding-types";
import { SemanticRetriever } from "@/lib/gemini";
import { z } from "zod";

export const embeddingRouter = createTRPCRouter({
  // createEmbeding: publicProcedure
  //   .input(EmbeddingData)
  //   .mutation(async ({ input, ctx }) => {
  //     return ctx.db.embeddings.create({ data: { ...input } });
  //   }),
  // getEmbeddings: publicProcedure.query(async ({ ctx }) => {
  //   return ctx.db.embeddings.findMany({
  //     select: { text: true, iqpTitle: true, embedding: true },
  //   });
  // }),
  //
  test: publicProcedure
    .input(
      z.object({
        hi: z.string(),
      }),
    )
    .query(async ({ ctx }) => {
      console.log("got here");

      const reports = await ctx.db.iqpData.findMany({
        where: {
          pdfContents: { none: {} }
        }
      });
      if (!reports) throw new Error("NO DATA IN DB");

      await Promise.all(
        reports.map(async (report) => {

          console.log(">>> Starting report: ", report.title)
          const retriever = new SemanticRetriever();

          // Process the PDF to get chunks
          const chunks = await retriever.chunkPDF(report.url);

          // Generate embeddings for each chunk
          await retriever.batchEmbedDocument(chunks, report.title);

          console.log(">>> Finished report: ", report.title)
        }),
      );

      return { message: "hi" }; // Ensure this is outside of the Promise.all
    }),
});
