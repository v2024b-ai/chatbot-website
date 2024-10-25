import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = process.env.NEXT_PUBLIC_PINECONE_API_KEY!;
if (!apiKey) {
  throw new Error(
    "PINECONE_API_KEY is not defined. Please check your environment variables.",
  );
}

// Setup Pinecone client
export const pc = new Pinecone({ apiKey });

// Connect to the index
export const indexName = "chatvpc";

export const index = pc.index(indexName);

// Optionally, you can export the model if needed later
export const model = "multilingual-e5-large";
