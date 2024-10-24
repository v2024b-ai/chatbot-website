import { HydrateClient } from "@/trpc/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function ToolsPage() {
  return (
    <HydrateClient>
      <main className="min-h-screen bg-primary bg-gradient-to-b from-primary to-secondary text-white">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl"> Tools </h1>
          <p className="mb-10">
            These are the tools that we have developed so far:
          </p>
        </div>

        <div className="ml-10">
          <Link href="/tools/chatbot">
            <Card className="float-left aspect-square w-64 transition-shadow duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle> ChatVPC ChatBot</CardTitle>
                <CardDescription>
                  Use the chatbot to ask questions about specific VPC IQPs
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </main>
    </HydrateClient>
  );
}
