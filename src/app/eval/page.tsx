"use client";
import { DataTable } from "@/components/data-table/data-table";
import { ModelColumns } from "./eval-columns";
import { api } from "@/trpc/react";
import { replicateData } from "@/lib/utils";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Separator } from "@/components/ui/separator";
import { AddModelForm } from "@/components/eval/eval";

export default function EvalPage() {
  const { data, isLoading } = api.model.getAllModels.useQuery();

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
        <AddModelForm />
      </div>
      <Separator className="my-6" />
      <DataTable
        columns={ModelColumns}
        data={replicateData(data, 50)}
        filterByString="model"
      />
    </main>
  );
}
