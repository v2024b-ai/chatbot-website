import { api, HydrateClient } from "@/trpc/server";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tightk">
            Welcome to the ChatVPC App
          </h1>
          <Card>
            <CardHeader>
              <CardTitle>
                Future work:
              </CardTitle>
              <CardContent>
                Nothing is in here yet, but expect really cool stuff soon...
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </main>
    </HydrateClient>
  );
}
