"use client";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table"; //not with the rest of the imports since these are only used as types
import { Ellipsis } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { createHoverCardScope } from "@radix-ui/react-hover-card";
import { builders } from "prettier/doc";
import cursor = builders.cursor;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterByString: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterByString,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} filterByString={filterByString} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  if (header.column.columnDef.header === "Bleu") {
                    return (
                      <HoverCard key={header.id}>
                        <TableHead
                          colSpan={header.colSpan}
                          style={{ cursor: "pointer" }}
                        >
                          <HoverCardTrigger
                            style={{ width: 0, height: 0, padding: 0 }}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </HoverCardTrigger>
                        </TableHead>
                        <HoverCardContent>
                          <p>
                            Measurement of the difference between an automatic
                            translation and human-created reference translations
                            of the same source sentence. The bigger this value
                            is the better the model is.
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    );
                  }

                  if (header.column.columnDef.header === "Rouge") {
                    return (
                      <HoverCard key={header.id}>
                        <TableHead
                          colSpan={header.colSpan}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <HoverCardTrigger
                            style={{ width: 0, height: 0, padding: 0 }}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </HoverCardTrigger>
                        </TableHead>
                        <HoverCardContent>
                          <p>
                            Compare an automatically produced summary or
                            translation against a reference or a set of
                            references (human-produced) summary or translation.
                            ROUGE metrics range between 0 and 1, with higher
                            scores indicating higher similarity.
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    );
                  }

                  if (header.column.columnDef.header === "Meteor") {
                    return (
                      <HoverCard key={header.id}>
                        <TableHead
                          colSpan={header.colSpan}
                          style={{ cursor: "pointer" }}
                        >
                          <HoverCardTrigger
                            style={{ width: 0, height: 0, padding: 0 }}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </HoverCardTrigger>
                        </TableHead>

                        <HoverCardContent>
                          <p>
                            Evaluation metric for machine translation that
                            improves over traditional metrics like BLEU by
                            incorporating linguistic features such as synonymy,
                            stemming, and word order, and placing more emphasis
                            on recall to better align with human judgments of
                            translation quality. The bigger the better.
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    );
                  } else {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  }
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
