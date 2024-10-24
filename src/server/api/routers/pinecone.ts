import { Pinecone } from "@pinecone-database/pinecone";

// Setup Pinecone client
export const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

// Connect to serverless index
const indexName = "chatvpc";

await pc.createIndex({
  name: indexName,
  dimension: 1024,
  metric: "cosine",
  spec: {
    serverless: {
      cloud: "aws",
      region: "us-east-1",
    },
  },
});

// This specifies what model will be used to generate vectors
const model = "multilingual-e5-large";

// This will be PDF data
const data = [
  {
    id: "vec1",
    text: "Apple is a popular fruit known for its sweetness and crisp texture.",
  },
  {
    id: "vec2",
    text: "The tech company Apple is known for its innovative products like the iPhone.",
  },
  { id: "vec3", text: "Many people enjoy eating apples as a healthy snack." },
  {
    id: "vec4",
    text: "Apple Inc. has revolutionized the tech industry with its sleek designs and user-friendly interfaces.",
  },
  {
    id: "vec5",
    text: "An apple a day keeps the doctor away, as the saying goes.",
  },
  {
    id: "vec6",
    text: "Apple Computer Company was founded on April 1, 1976, by Steve Jobs, Steve Wozniak, and Ronald Wayne as a partnership.",
  },
];

// Create the embedding
const embeddings = await pc.inference.embed(
  model,
  data.map((d) => d.text),
  { inputType: "passage", truncate: "END" },
);

// Ensure embeddings are defined before proceeding
if (!embeddings?.length) {
  throw new Error("No embeddings generated.");
}

console.log(embeddings[0]);

// Push vectors to the index
export const index = pc.index(indexName);

const vectors = data.map((d, i) => {
  const values = embeddings[i]?.values;

  if (!values) {
    throw new Error(`Embedding for ${d.id} is undefined.`);
  }

  return {
    id: d.id,
    values: values,
    metadata: { text: d.text },
  };
});

// Upsert vectors into the specified namespace
await index.namespace("ns1").upsert(vectors);

//optional checking
const stats = await index.describeIndexStats();
console.log(stats);

//This would be the user input
const query = ["Tell me about the tech company known as Apple."];

const embedding = await pc.inference.embed(model, query, {
  inputType: "query",
});

const queryResponse = await index.namespace("ns1").query({
  topK: 5, //number of project reports we want to return
  vector: embedding[0]!.values!,
  includeValues: false,
  includeMetadata: true,
});

console.log(queryResponse);
