import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function ToolsPage() {
  return (
    <main className=" space-y-6 p-10 pb-16 ">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Tools</h2>
        <p className="text-muted-foreground">
          Take a look at the tools we have made so far.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="ml-10">
        <Link href="/tools/chatbot">
          <Card className="float-left aspect-square w-64 transition-shadow duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle>ChatVPC ChatBot</CardTitle>
              <CardDescription>
                Use the chatbot to ask questions about specific VPC IQPs
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </main>
  );
}
