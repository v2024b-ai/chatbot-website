// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { GoogleAIFileManager } from "@google/generative-ai/server";
// import { z } from "zod";
//
// const input = z.object({
//   prompt: z.string(),
//   fileData: z
//     .object({
//       fileUri: z.string(),
//       mimeType: z.string(),
//     })
//     .optional(),
// });
//
// type Input = z.infer<typeof input>;
//
// const MODEL = { model: "gemini-1.5-flash" };
//
// // function getTextOutput()
//
// export const chatRouter = createTRPCRouter({
//   text: publicProcedure
//     .input(
//       z.object({
//         prompt: z.string(),
//         fileData: z
//           .object({
//             fileUri: z.string(),
//             mimeType: z.string(),
//           })
//           .optional(),
//       }),
//     )
//     .query(async ({ input: { prompt, fileData } }) => {
//       const genAI = new GoogleGenerativeAI(
//         process.env.GEMINI_API_KEY as string,
//       );
//
//       const model = genAI.getGenerativeModel(MODEL);
//       const input = fileData ? [prompt, { fileData }] : prompt;
//
//       const result = await model.generateContent(input);
//       return result.response.text();
//     }),
//
//   report: publicProcedure
//     .input(z.object({ prompt: z.string(), id: z.string() }))
//     .query(async ({ input: { prompt, id }, ctx }) => {
//       const fileManager = new GoogleAIFileManager(
//         process.env.GEMINI_API_KEY as string,
//       );
//
//       const report = await ctx.db.report.findUnique({
//         where: { id },
//       });
//
//       if (!report) return;
//
//       const uploadResult = await fileManager.uploadFile(report?.url, {
//         mimeType: "pdf",
//         displayName: report?.title,
//       });
//
//       // const ret = api.chat.text({prompt,  uploadResult.file})
//       //    return api. ;
//     }),
// });
