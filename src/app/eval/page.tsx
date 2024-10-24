import { HydrateClient } from "@/trpc/server";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddModelForm } from "@/components/eval/eval";

export default async function EvalPage() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-primary bg-gradient-to-b from-primary to-secondary text-white">
        <div className="flex text-white">
          <Table>
            <TableCaption className="text-white">
              {" "}
              A list of GenAI tools and their parameters.
              <AddModelForm />
            </TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Table</TableHead>
                <TableHead className="text-white"> URL </TableHead>
                <TableHead className="text-white">
                  {" "}
                  Price per 1K Token Input(USD)
                </TableHead>
                <TableHead className="text-white">
                  {" "}
                  Price per 1K Token Output(USD)
                </TableHead>
                <TableHead className="text-white">
                  {" "}
                  User Agreement URL
                </TableHead>
                <TableHead className="text-white">
                  {" "}
                  Ethical Concerns?{" "}
                </TableHead>
                <TableHead className="text-white">
                  {" "}
                  Context Length (Tokens){" "}
                </TableHead>
                <TableHead className="text-white">
                  {" "}
                  Model Size (in Billions of Parameters)
                </TableHead>
                <TableHead className="text-white"> Perplexity Score</TableHead>
                <TableHead className="text-white"> BLEU Score</TableHead>
                <TableHead className="text-white"> ROUGE Score</TableHead>
                <TableHead className="text-white"> METEOR Score</TableHead>
                <TableHead className="text-white">
                  {" "}
                  Input Response Time (ms/1K Token)
                </TableHead>
                <TableHead className="text-white">
                  {" "}
                  Output Response Time (ms/1K Token)
                </TableHead>
                <TableHead className="text-white"> Max Input Token</TableHead>
                <TableHead className="text-white">
                  {" "}
                  File Input Allowed?{" "}
                </TableHead>
                <TableHead className="text-white">
                  {" "}
                  Additional Features{" "}
                </TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </div>
      </main>
    </HydrateClient>
  );
}
