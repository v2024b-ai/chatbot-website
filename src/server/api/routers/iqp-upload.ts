import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { findURLS, uploadInput } from "@/types/iqp-upload-types";

// import pdfParse from "pdf-parse";
// import axios from "axios";

// // Function to download PDFs from URLs and return their text content
// async function downloadPDFsFromURLs(urls: string[]): Promise<string[]> {
//   const pdfTexts: string[] = [];
//
//   try {
//     for (const url of urls) {
//       // Fetch the PDF as binary data
//       const response = await axios.get(url, {
//         responseType: "arraybuffer", // Request response as ArrayBuffer
//       });
//
//       // Ensure response data is of the correct type
//       const arrayBuffer = response.data as ArrayBuffer;
//
//       // Convert ArrayBuffer to Buffer
//       const buffer = Buffer.from(arrayBuffer);
//
//       // Parse the PDF to extract text using pdf-parse
//       const pdfData = await pdfParse(buffer); // Pass the Buffer
//       pdfTexts.push(pdfData.text); // Store the extracted text
//     }
//
//     return pdfTexts; // Return the extracted texts
//   } catch (error) {
//     console.error("Error downloading or parsing PDF:", error);
//     return []; // Return an empty array in case of error
//   }
// }

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
