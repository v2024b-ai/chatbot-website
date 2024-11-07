import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { findURLS, uploadInput } from "@/types/iqp-upload-types";

export const iqpUploadRouter = createTRPCRouter({
  upload: publicProcedure
    .input(uploadInput)
    .mutation(async ({ input, ctx }) => {
      return ctx.db.iqpData.create({
        data: { ...input },
      });
    }),

  getReportURLS: publicProcedure
    .input(findURLS)
    .mutation(async ({ input, ctx }) => {
      console.log("Input titles:", input.titles);
      return ctx.db.iqpData.findMany({
        where: {
          title: {
            in: input.titles,
          },
        },
        select: {
          title: true,
          url: true,
        },
      });
    }),

  getAllReports: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.iqpData.findMany({
      select: { title: true, description: true },
    });
  }),
});
