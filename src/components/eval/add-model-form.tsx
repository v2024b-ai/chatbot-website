"use client";
import { api } from "@/trpc/react";
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
import { addModelSchema, AddModelSchema } from "@/types/ai/models/model-eval-info-types";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "../ui/textarea";

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
  const form = useForm<AddModelSchema>({
    resolver: zodResolver(addModelSchema),
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
      outputResponseTime: 0,
    },
  });

  //   On submit stuff so when the user submits the form it calls the backend
  function onSubmit(values: AddModelSchema) {
    addModel.mutate(values);
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>Add New Model</Button>
        </DialogTrigger>
        <DialogContent className="w-full">
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

              <div className={"flex flex-row justify-evenly space-x-2"}>
                {/*  Input Price Per Token*/}
                <FormField
                  control={form.control}
                  name="ppInput"
                  render={({ field }) => (
                    // Enter the Model name
                    <FormItem>
                      <FormLabel>Input Price</FormLabel>
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
                      <FormLabel>Output Price</FormLabel>
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
                <FormField
                  control={form.control}
                  name="perplexity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Perplexity</FormLabel>
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
              </div>

              <div className={"flex flex-row justify-evenly space-x-2"}>
                {/*  Model Size */}
                <FormField
                  control={form.control}
                  name="modelSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model Size</FormLabel>
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
                <FormField
                  control={form.control}
                  name="outputResponseTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Response Time</FormLabel>
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
              </div>

              <FormField control={form.control} name='modelOutput' render={({ field }) => (

                <FormItem>
                  <FormLabel>Your Model&apos;s output</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
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

              <Button className="w-full">Send</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
