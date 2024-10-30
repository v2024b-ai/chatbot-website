/* eslint-disable */
"use client";
import * as React from "react";
import { Card } from "@/components/ui/card";
// import { pc, model } from "@/server/api/routers/pinecone";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RecordMetadata,
  ScoredPineconeRecord,
} from "@pinecone-database/pinecone";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { pineconeQueryInput, PineconeQueryInput } from "@/types/pinecone";

export default function PineconePage() {
  const pine = api.pinecone.getReports.useMutation();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<PineconeQueryInput>({
    resolver: zodResolver(pineconeQueryInput),
    defaultValues: {
      input: "",
    },
  });

  // let queryResponse: ScoredPineconeRecord<RecordMetadata>[] = [];
  //
  const handleSubmit = (query: PineconeQueryInput) => {
    pine.mutate(query);
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Query Input</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your query" {...field} />
                </FormControl>
                <FormDescription>
                  Input for querying the vector library
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Query</Button>
        </form>
      </Form>
    </Card>
  );
}
