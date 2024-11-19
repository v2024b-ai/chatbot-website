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
      const firstData = await ctx.db.iqpData.findFirst();
      if (!firstData) throw Error("NO DATA IN DB");

      const URL = firstData.url;

      const retrevier = new SemanticRetriever();

      const chunks = await retrevier.chunkPDF(URL);

      console.log(">>> FIRST DATA: ", firstData);
      console.log(">>> CHUNKS: ", chunks);

      const res = await retrevier.batchEmbedDocuments(chunks);

      console.log("Epic response that will 100% wokr with no errors: ", res);

      return { message: "hi" };
    }),
});
