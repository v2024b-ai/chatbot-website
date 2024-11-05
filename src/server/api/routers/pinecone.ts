import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { pineconeQueryInput, pineconeReportStore } from "@/types/pinecone";
import { PineconeHelper } from "@/lib/pinecone";

export const pineconeRouter = createTRPCRouter({
  getReportTitles: publicProcedure
    .input(pineconeQueryInput)
    .mutation(async ({ input }) => {
      const pine = new PineconeHelper();
      return pine.getReportTitles(input);
    }),

  getReportTitlesAndUrls: publicProcedure
    .input(pineconeQueryInput)
    .mutation(async ({ input }) => {
      const pine = new PineconeHelper();
      return pine.getReportTitleAndUrls(input).then((res) =>
        res.map((data) => ({
          url: data.url,
          title: data.title,
          mimeType: "application/pdf",
        })),
      );
    }),

  storeReports: publicProcedure
    .input(pineconeReportStore)
    .mutation(async ({ input }) => {
      const pine = new PineconeHelper();
      return pine.storeReports(input);
    }),
});
