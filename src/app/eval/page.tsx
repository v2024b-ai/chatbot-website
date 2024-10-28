"use client"
import { DataTable } from "@/components/data-table/data-table";
import { ModelColumns } from "./eval-columns";
import { api } from "@/trpc/react"
import { replicateData } from "@/lib/utils";

export default function EvalPage() {

    const { data } = api.model.getAllModels.useQuery();

    if (!data) return <h1 className="text-2xl text-center">No data found!</h1>

    return (
        <div className="p-4">
            <DataTable columns={ModelColumns} data={replicateData(data, 50)} filterByString="model" />
        </div>
    )
};
