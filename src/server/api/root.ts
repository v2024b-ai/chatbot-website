import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { pineconeRouter } from "@/server/api/routers/pinecone";
import { modelRoute } from "./routers/ai-model";
import { chatRouter } from "./routers/gemini";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  model: modelRoute,
  pinecone: pineconeRouter,
  chat: chatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
