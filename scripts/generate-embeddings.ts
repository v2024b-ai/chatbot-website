import { SemanticRetriever } from "@/lib/gemini";
import { db } from "@/server/db";


/*
 * use this badboy to populate the db with gemini generated embeddings.
 * this is if youre starting all the way from scratch, there is another script that runs an sql file
 * against the db with the ones we already generated
 * */

export default async function populateEmbeddings() {
  const reports = await db.iqpData.findMany();
  if (!reports) throw new Error("NO DATA IN DB");

  await Promise.all(
    reports.map(async (report) => {

      console.log(">>> Starting report: ", report.title)
      const retriever = new SemanticRetriever()

      // Process the PDF to get chunks
      const chunks = await retriever.chunkPDF(report.url);

      // Generate embeddings for each chunk
      await retriever.batchEmbedDocument(chunks, report.title);

      console.log(">>> Finished report: ", report.title)
    }),
  );

  console.log(">>> Finished all reports!")
}
