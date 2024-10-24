"use client";
import { api } from "@/trpc/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
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
      ppInput: 0,
      ppOutput: 0,
      termsURL: "",
      ethicalConcern: false,
      ctxLength: 0,
      modelSize: 0,
      perplexity: "",
      bleu: 0,
      rouge: 0,
      meteor: 0,
      inputResponseTime: 0,
      outputResponseTime: 0,
      maxOutput: 0,
      maxInput: 0,
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
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={"space-y-6"}
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
                        placeholder="Model Name (ChatGPT 4o-mini...)"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Please enter the name and version of the LLM Model
                    </FormDescription>
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
                    <FormLabel>Model Name</FormLabel>
                    <FormControl>
                      <Input placeholder="URL for AI Site" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
