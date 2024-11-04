import {
  type EmbeddingsList,
  type Index,
  Pinecone,
  type PineconeRecord,
  type RecordMetadata,
} from "@pinecone-database/pinecone";

export class PineconeHelper {
  private model = "multilingual-e5-large";
  private index: Index<RecordMetadata>;
  private indexName = "chatvpc";
  private pc: Pinecone;

  constructor() {
    const apiKey = process.env.PINECONE_API_KEY!;

    if (!apiKey) {
      throw new Error(
        "PINECONE_API_KEY is not defined. Please check your environment variables.",
      );
    }

    this.pc = new Pinecone({ apiKey });
    this.index = this.pc.index(this.indexName);
  }

  async getReports({ input, topK = 3 }: { topK?: number; input: string }) {
    const vector: number[] = await this.generateEmbeddings(input);

    // Perform the query with the numeric vector
    const response = await this.index
      .namespace(this.indexName)
      .query({ topK, vector });

    console.log("this is the response: ", response);
    return response.matches.map((match) => match.id);
  }

  async storeReports({ input, id }: { input: string; id: string }) {
    const vector: number[] = await this.generateEmbeddings(input);

    // Create the upsert record
    const record: PineconeRecord = { id, values: vector, metadata: {} };

    // Call the upsert method with the correct structure
    await this.index.namespace(this.indexName).upsert([record]);

    return { message: "Report stored successfully" }; // Return a success message
  }

  private async generateEmbeddings(input: string): Promise<number[]> {
    try {
      const embeddings: EmbeddingsList = await this.pc.inference.embed(
        this.model,
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
}
