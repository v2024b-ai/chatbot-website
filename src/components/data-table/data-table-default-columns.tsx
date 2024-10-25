"use client"

/*
 * this provides default data table cols if caller does not want custom ones
 * */

import { ColumnDef } from "@tanstack/react-table"
import { capitalizeFirstLetter } from "@/lib/utils"
import { ZodObject, z } from "zod"

// takes in any zod object and returns deault cols
export function makeDefaultZodCols<T extends ZodObject<any>>(schema: T): ColumnDef<z.infer<T>>[] {
  const keys = schema.keyof().options as Array<keyof z.infer<T>>
  return keys.map(key => ({
    header: capitalizeFirstLetter(key as string),
    accessorKey: key as string
  }))
}


