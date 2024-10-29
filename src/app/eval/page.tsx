"use client";
import { DataTable } from "@/components/data-table/data-table";
import { ModelColumns } from "./eval-columns";
import { api } from "@/trpc/react";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Separator } from "@/components/ui/separator";

export default function EvalPage() {
  const { data, isLoading } = api.model.getAllModels.useQuery();

  const gemini = api.chat.text.useQuery("hiiii");



  if (isLoading) return <LoadingSpinner big center />;

  if (!data) return <h1 className="text-center text-2xl">No data found!</h1>;

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
      {gemini.data}
      <Separator className="my-6" />
      <DataTable
        columns={ModelColumns}
        data={data}
        filterByString="model"
      />
    </main>
  );
}
