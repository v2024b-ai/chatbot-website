"use client";
import { api } from "@/trpc/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addModelInput } from "@/types/modelInput";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function AddModelForm() {
  // API SETUP
  const addModel = api.model.addModel.useMutation();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // Form initializer (like use state)
  const form = useForm<z.infer<typeof addModelInput>>({
    resolver: zodResolver(addModelInput),
    defaultValues: {
      model: "",
      url: "",
      ppInput: null,
      ppOutput: null,
      termsURL: "",
      ethicalConcern: false,
      ctxLength: null,
      modelSize: null,
      perplexity: "",
      bleu: null,
      rouge: null,
      meteor: null,
      inputResponseTime: null,
      outputResponseTime: null,
      maxOutput: null,
      maxInput: null,
      fileInput: false,
      fileOutput: false,
      features: "",
    },
  });

  //   On submit stuff so when the user submits the form it calls the backend
  function onSubmit(values: z.infer<typeof addModelInput>) {
    addModel.mutate(values);
    return;
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add New Model</Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={"space-y-1"}
            >
              {/*Input for the */}
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  // Enter the Model name
                  <FormItem>
                    <FormLabel>Model Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ChatGPT 4o-mini, Gemini 1.5 Flash, ..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {/*Input for the URL*/}
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  // Enter the Model name
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="URL for AI Site" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {/*  Input Price Per Token*/}
              <FormField
                control={form.control}
                name="ppInput"
                render={({ field }) => (
                  // Enter the Model name
                  <FormItem>
                    <FormLabel>Input Price Per Million Tokens</FormLabel>
                    <FormControl>
                      <Input placeholder="$..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {/*  Output Price Per Token*/}
              <FormField
                control={form.control}
                name="ppOutput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Output Price Per Million Tokens</FormLabel>
                    <FormControl>
                      <Input placeholder="$..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {/*  Output Price Per Token*/}
              <FormField
                control={form.control}
                name="termsURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Terms URL</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {/*  Context Length */}
              <FormField
                control={form.control}
                name="ctxLength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Context Length</FormLabel>
                    <FormControl>
                      <Input placeholder="In Tokens" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {/*  Model Size */}
              <FormField
                control={form.control}
                name="modelSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model Size in Billions of Parameters</FormLabel>
                    <FormControl>
                      <Input placeholder="For 8 Billion Input '8'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {/*  Input Response Time */}
              <FormField
                control={form.control}
                name="inputResponseTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Input Response Time (ms/1K Tokens)</FormLabel>
                    <FormControl>
                      <Input placeholder="..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {/*Output Response Time*/}
              <FormField
                control={form.control}
                name="outputResponseTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Output Response Time (ms/1K Tokens)</FormLabel>
                    <FormControl>
                      <Input placeholder="..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <Button type="submit" className="justify-items-center">
                Send
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
