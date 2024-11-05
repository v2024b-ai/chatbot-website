"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { Input } from "@/components/ui/input";
import { CenterInScreen } from "@/components/center-in-screen";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { sendURL, sendURLType } from "@/types/podcast/podcast-types";

// const formSchema = z.object({
//   url: z.string().url("Please enter a url in the form of https://..."),
// });

export default function UploadButton() {
  const form = useForm<sendURLType>({
    resolver: zodResolver(sendURL),
    defaultValues: {
      url: "",
    },
  });

  function onSubmit(values: sendURLType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <CenterInScreen>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Link to PDF</FormLabel>
                  <FormControl>
                    <Input placeholder="https://" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Get Podcast</Button>
          </form>
        </Form>
      </CenterInScreen>
    </main>
  );
}
