"use client"
import { DataTable } from "@/components/data-table/data-table";
import { ModelColumns } from "./eval-columns";
import { api } from "@/trpc/react"
import { replicateData } from "@/lib/utils";

export default function EvalPage() {

    const { data } = api.model.getAllModels.useQuery();

    // if (!data) return

    return (
        <DataTable columns={ModelColumns} data={data ? replicateData(data, 50) : {}} filterByString="model" />
    )
};
