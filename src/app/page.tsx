import { HydrateClient } from "@/trpc/server";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {

  return (
    <HydrateClient>
      <main className="flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Welcome to the ChatVPC App
          </h1>
          <Card>
            <CardHeader>
              <CardTitle>
                Future work:
              </CardTitle>
              <CardContent>
                Podcasts, Chatbots, Retrieval Augmented Generation, and more!
              </CardContent>
              <CardContent>
                Check out the tools that we do have implemented in the tools section!
              </CardContent>
              <CardContent>
                Also look at the evaluation tool that we have developed under Evaluations {'>'} Add a Model
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </main>
    </HydrateClient>
  );
}
