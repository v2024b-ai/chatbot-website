"use client"

/*
 * this provides default data table cols if caller does not want custom ones
 * */

import type { ColumnDef } from "@tanstack/react-table"
import { capitalizeFirstLetter } from "@/lib/utils"
import type { ZodObject, ZodRawShape, z } from "zod"

// takes in any zod object and returns deault cols
export function makeDefaultZodCols<T extends ZodRawShape>(schema: ZodObject<T>): ColumnDef<z.infer<ZodObject<T>>>[] {
  const keys = schema.keyof().options as Array<keyof T>
  return keys.map(key => ({
    header: capitalizeFirstLetter(key as string),
    accessorKey: key as string
  }))
}


