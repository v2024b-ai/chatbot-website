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
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import {
  pineconeQueryInput,
  PineconeQueryInput,
  PineconeReportStore,
  pineconeReportStore,
} from "@/types/pinecone";
import { CenterInScreen } from "@/components/center-in-screen";
import { uploadInput, UploadInput } from "@/types/iqp-upload-types";

export default function PineconePage() {
  const queryMutation = api.pinecone.getReports.useMutation({
    onSuccess: (data) => {
      if (data) {
        getURLS.mutate({ titles: data });
      }
    },
  });
  const reportMutation = api.pinecone.storeReports.useMutation();
  const iqpMutation = api.iqpUpload.upload.useMutation();
  const getURLS = api.iqpUpload.getReportURLS.useMutation();

  // const allPapers = api.iqpUpload.getAllReports.useQuery();

  const form = useForm<PineconeQueryInput>({
    resolver: zodResolver(pineconeQueryInput),
    defaultValues: {
      input: "",
    },
  });

  const reportForm = useForm<PineconeReportStore>({
    resolver: zodResolver(pineconeReportStore),
    defaultValues: {
      input: "",
      id: "",
    },
  });

  const iqpForm = useForm<UploadInput>({
    resolver: zodResolver(uploadInput),
    defaultValues: {
      title: "",
      description: "",
      url: "",
    },
  });

  const handleSubmit = (query: PineconeQueryInput) => {
    queryMutation.mutate(query);
  };

  const handleReport = (report: PineconeReportStore) => {
    reportMutation.mutate(report);
  };

  const handleIQPUpload = (data: UploadInput) => {
    iqpMutation.mutate(data);
  };

  // New function for batch upserting all papers
  // const handleBatchUpload = () => {
  //   if (!allPapers.data) return;
  //
  //   allPapers.data.forEach((paper) => {
  //     reportMutation.mutate({
  //       id: paper.title,
  //       input: paper.description,
  //     });
  //   });
  // };

  return (
    <CenterInScreen>
      {/* Query Card */}
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

      {/* Report Upload Card */}
      <Card
        style={{
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            marginBottom: "1rem",
            fontSize: 30,
            marginTop: "1rem",
            fontWeight: "bold",
          }}
        >
          Upload Abstract
        </div>
        <Form {...reportForm}>
          <form onSubmit={reportForm.handleSubmit(handleReport)}>
            <FormField
              control={reportForm.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a unique ID for the report"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Unique ID for the report in the vector library
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={reportForm.control}
              name="input"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report Input</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your report abstract and conclusion"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Input for reports for the vector library
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Upsert</Button>
          </form>
        </Form>
      </Card>

      {/* IQP Upload Card */}
      <Card
        style={{
          justifyContent: "center",
          textAlign: "center",
          marginTop: "1rem",
        }}
      >
        <div
          style={{
            marginBottom: "1rem",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          IQP Data Upload
        </div>
        <Form {...iqpForm}>
          <form onSubmit={iqpForm.handleSubmit(handleIQPUpload)}>
            <FormField
              control={iqpForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the IQP title" {...field} />
                  </FormControl>
                  <FormDescription>Title of the IQP project</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={iqpForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the IQP description" {...field} />
                  </FormControl>
                  <FormDescription>
                    Brief description of the IQP
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={iqpForm.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the IQP URL" {...field} />
                  </FormControl>
                  <FormDescription>
                    Must start with https://digital.wpi.edu
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Upload IQP</Button>
          </form>
        </Form>
      </Card>

      {/*/!* Batch Upload Button *!/*/}
      {/*<Button style={{ marginTop: "1rem" }} onClick={handleBatchUpload}>*/}
      {/*  Batch Upload All Papers*/}
      {/*</Button>*/}
    </CenterInScreen>
  );
}
