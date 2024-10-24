import { api, HydrateClient } from "@/trpc/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function Home() {
  const hello = await api.post.hello({ text: "the ChatVPC Team" });
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-primary bg-gradient-to-b from-primary to-secondary text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white dark:text-black">
            Welcome to the{" "}
            <span className="text-black drop-shadow-md dark:text-white">
              ChatVPC
            </span>{" "}
            App
          </h1>
          <Card>
            <CardHeader>
              <CardTitle>Future work:</CardTitle>
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
