"use client";
import { DataTable } from "@/components/data-table/data-table";
import { ModelColumns } from "./eval-columns";
import { api } from "@/trpc/react";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Separator } from "@/components/ui/separator";

export default function EvalPage() {
  const { data, isLoading } = api.model.getAllModels.useQuery();

  if (isLoading) return <LoadingSpinner big center />;

  if (!data) return <h1 className="text-center text-2xl">No data found!</h1>;

  const processedData = data.map((item) => ({
    ...item,
    ppInput: item.ppInput ?? 0,
    ppOutput: item.ppOutput ?? 0,
    termsURL: item.termsURL ?? "",
    ctxLength: item.ctxLength ?? 0,
    modelSize: item.modelSize ?? 0,
    maxOutput: item.maxOutput ?? 0,
    maxInput: item.maxInput ?? 0,
    fileInput: item.fileInput ?? false,
    fileOutput: item.fileOutput ?? false,  // Ensure fileOutput is a boolean
    outputResponseTime: item.outputResponseTime ?? 0,
    inputResponseTime: item.inputResponseTime ?? 0,
    meteor: item.meteor ?? 0,
    rouge: item.rouge ?? 0, // Default for rouge if it's nullable
  }));
  return (
    <main className="space-y-6 p-10 pb-16">
      <div className="flex justify-between space-y-0.5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Evaluation</h2>
          <p className="text-muted-foreground">
            How different LLMs compare against each other.
          </p>
        </div>
      </div>
      <Separator className="my-6" />
      <DataTable
        columns={ModelColumns}
        data={processedData}
        filterByString="model"
      />
    </main>
  );
}
