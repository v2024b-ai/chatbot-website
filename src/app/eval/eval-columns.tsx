"use client"

import { makeDefaultZodCols } from "@/components/data-table/data-table-default-columns"
import { modelInfo } from "@/types/ai/models/model-eval-info-types"


// TODO: this is rlly dirty, make this better later

export const ModelColumns = makeDefaultZodCols(modelInfo)

