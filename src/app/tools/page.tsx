import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Models } from "@/data/models-array";

export default function ToolsPage() {
  return (
    <main className="space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Tools</h2>
        <p className="text-muted-foreground">
          Take a look at the tools we have made so far.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-wrap gap-2">
        {Models.map((model) => (
          <Link href={model.link}>
            <Card className="aspect-square w-64 transition-shadow duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle>{model.title}</CardTitle>
                <CardDescription>{model.longDesc}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
