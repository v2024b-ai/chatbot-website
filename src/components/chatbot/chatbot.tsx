"use client";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { z } from "zod";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useChat } from "ai/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeDisplayBlock from "@/components/chatbot/code-display-block";
import { FormControl, FormField, FormItem, Form } from "../ui/form";
import { Textarea } from "../ui/textarea";
import cuid from "cuid";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";

const makeNewMessage = (
  content: string,
  role: "user" | "assistant",
): {
  id: string;
  content: string;
  role: "user" | "assistant";
} => ({
  id: cuid(),
  content,
  role,
});

export default function ChatBot() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { messages, setMessages, isLoading } = useChat();
  const [recommendations, setRecommendations] = useState<
    { title: string; url: string }[]
  >([]);

  const gemini = api.chat.text.useMutation({
    onSuccess: (data) => {
      if (data) {
        // Separate response message from recommendations
        const { message, recommendedFiles } = data;

        setMessages([...messages, makeNewMessage(message, "assistant")]);
        setRecommendations(recommendedFiles || []);
      }
      setIsGenerating(false);
    },
  });

  const inputSchema = z.object({ prompt: z.string() });
  const form = useForm<z.infer<typeof inputSchema>>({
    resolver: zodResolver(inputSchema),
    defaultValues: { prompt: "" },
  });

  function onSubmit(values: z.infer<typeof inputSchema>) {
    form.reset();
    setIsGenerating(true);

    const userMessage = makeNewMessage(values.prompt, "user");
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    gemini.mutate({ data: updatedMessages });
  }

  return (
    <div className="flex h-full w-full">
      <Sidebar>
        <SidebarHeader>FIles for uplaod</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            Reccomended FIles for uplaod based on query
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>Bruh</SidebarFooter>
      </Sidebar>
      <div className="flex flex-1 flex-col">
        <header className="p-4 py-20">
          <h1 className="text-xl font-semibold">Chat about the VPC ✨</h1>
          <p>Ask anything about the VPC for our AI to answer</p>
        </header>
        <ChatMessageList>
          <ChatBubble variant="received">
            <ChatBubbleAvatar src="" fallback="🤖" />
            <ChatBubbleMessage>How can I help you?</ChatBubbleMessage>
          </ChatBubble>
          {messages?.map((message, index) => (
            <ChatBubble
              key={index}
              variant={message.role === "user" ? "sent" : "received"}
            >
              <ChatBubbleMessage
                variant={message.role === "user" ? "sent" : "received"}
              >
                {message.content
                  .split("```")
                  .map((part: string, index: number) => {
                    if (index % 2 === 1) {
                      const [lang = "", ...codeArray] = part.split("\n");
                      const code = codeArray.join("\n");
                      return (
                        <pre className="pt-2" key={index}>
                          <CodeDisplayBlock code={code} lang={lang} />
                        </pre>
                      );
                    } else {
                      return (
                        <Markdown key={index} remarkPlugins={[remarkGfm]}>
                          {part}
                        </Markdown>
                      );
                    }
                  })}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}
          {isGenerating && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar src="" fallback="🤖" />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 pt-2"
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      onKeyDown={async (e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          await form.handleSubmit(onSubmit)();
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || isGenerating}
            >
              Submit! <Send />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
