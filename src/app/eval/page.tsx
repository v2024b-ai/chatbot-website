"use client"
import { DataTable } from "@/components/data-table/data-table";
import { ModelColumns } from "./eval-columns";
import { api } from "@/trpc/react"
import { replicateData } from "@/lib/utils";
import { LoadingSpinner } from "@/components/loading-spinner";

export default function EvalPage() {

    const { data, isLoading } = api.model.getAllModels.useQuery();


    if (isLoading) return <LoadingSpinner big center />

    // if (!data) return <h1 className="text-2xl text-center">No data found!</h1>

    return (
        <div className="p-4">
            <DataTable columns={ModelColumns} data={replicateData(data, 50)} filterByString="model" />
        </div>
    )
};
