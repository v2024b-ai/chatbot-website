"use client"

import { ColumnDef } from "@tanstack/react-table"

import { modelInfo, type ModelInfo } from "@/types/ai/models/model-eval-info-types"
import { capitalizeFirstLetter } from "@/lib/utils"

// this is a rlly dirty way to do it.
const keys = modelInfo.keyof().options

// TODO: Make each column better & individualized 
export const ModelColumns: ColumnDef<ModelInfo>[] = keys.map(key => ({
    header: capitalizeFirstLetter(key),
    accessorKey: key
}))




