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
import { modelInfo } from "@/types/ai/models/model-eval-info-types";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

export function AddModelForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  // API SETUP
  const addModel = api.model.addModel.useMutation({
    onSuccess: () => {
      setIsDialogOpen(false);
      form.reset();

      toast({
        title: "Successfully added to database",
      });
    },

    onError: () => {
      toast({
        title: "An entry with the same name or url already exists",
        variant: "destructive",
      });
    },
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // Form initializer (like use state)
  const form = useForm<z.infer<typeof modelInfo>>({
    resolver: zodResolver(modelInfo),
    defaultValues: {
      model: "",
      url: "",
      ppInput: 0,
      ppOutput: 0,
      termsURL: "",
      ctxLength: 0,
      modelSize: 0,
      maxOutput: 0,
      maxInput: 0,
      fileInput: false,
      fileOutput: false,
      perplexity: "",
      bleu: 0,
      rouge: 0,
      meteor: 0,
      inputResponseTime: 0,
      outputResponseTime: 0,
    },
  });

  //   On submit stuff so when the user submits the form it calls the backend
  function onSubmit(values: z.infer<typeof modelInfo>) {
    addModel.mutate(values);
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                      <Input placeholder="https://..." {...field} />
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
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <div className={"flex flex-row justify-evenly"}>
                {/*  Input Price Per Token*/}
                <FormField
                  control={form.control}
                  name="ppInput"
                  render={({ field }) => (
                    // Enter the Model name
                    <FormItem>
                      <FormLabel>Input $/M Tokens</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(event) => {
                            if (event.target.value == field.value + ".") {
                              field.onChange(event.target.value);
                              return;
                            } else if (isNaN(+event.target.value)) {
                              field.onChange(field.value);
                              return;
                            } else {
                              field.onChange(+event.target.value);
                              return;
                            }
                          }}
                        />
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
                      <FormLabel>Output $/M Tokens</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="$..."
                          {...field}
                          onChange={(event) => {
                            if (event.target.value == field.value + ".") {
                              field.onChange(event.target.value);
                              return;
                            } else if (isNaN(+event.target.value)) {
                              field.onChange(field.value);
                              return;
                            } else {
                              field.onChange(+event.target.value);
                              return;
                            }
                          }}
                        />
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
                        <Input
                          placeholder="In Tokens"
                          {...field}
                          onChange={(event) => {
                            if (event.target.value == field.value + ".") {
                              field.onChange(event.target.value);
                              return;
                            } else if (isNaN(+event.target.value)) {
                              field.onChange(field.value);
                              return;
                            } else {
                              field.onChange(+event.target.value);
                              return;
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>

              <div className={"flex flex-row justify-evenly"}>
                {/*  Model Size */}
                <FormField
                  control={form.control}
                  name="modelSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model Size in Billions</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="For 8 Billion Input '8'"
                          {...field}
                          onChange={(event) => {
                            if (event.target.value == field.value + ".") {
                              field.onChange(event.target.value);
                              return;
                            } else if (isNaN(+event.target.value)) {
                              field.onChange(field.value);
                              return;
                            } else {
                              field.onChange(+event.target.value);
                              return;
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                {/*  Max Input */}
                <FormField
                  control={form.control}
                  name="maxInput"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Input</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Max Input"
                          {...field}
                          onChange={(event) => {
                            if (event.target.value == field.value + ".") {
                              field.onChange(event.target.value);
                              return;
                            } else if (isNaN(+event.target.value)) {
                              field.onChange(field.value);
                              return;
                            } else {
                              field.onChange(+event.target.value);
                              return;
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                {/*Max Output*/}
                <FormField
                  control={form.control}
                  name="maxOutput"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Output</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Max Output"
                          {...field}
                          onChange={(event) => {
                            if (event.target.value == field.value + ".") {
                              field.onChange(event.target.value);
                              return;
                            } else if (isNaN(+event.target.value)) {
                              field.onChange(field.value);
                              return;
                            } else {
                              field.onChange(+event.target.value);
                              return;
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              {/*File Input*/}
              <div className={"flex flex-row space-x-4 p-2"}>
                <FormField
                  control={form.control}
                  name="fileInput"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> Does this take file input?</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                <FormField
                  control={form.control}
                  name="fileOutput"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> Does this output a file?</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>

              <Button>Send</Button>
            </form>
          </Form>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
