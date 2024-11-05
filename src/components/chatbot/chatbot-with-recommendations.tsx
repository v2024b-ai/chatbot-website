"use client";
import { useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { type UploadFileData } from "@/types/ai/gemini";
import { useDebounce } from "@/hooks/use-debounce";
import { LoadingSpinner } from "../loading-spinner";


export default function ChatBotWithRec() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasSentFirstMsg, setHasSentFirstMsg] = useState(false);
  const [rec, setRec] = useState<UploadFileData[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<UploadFileData>({} as UploadFileData);
  const { messages, setMessages, isLoading } = useChat();

  const pinecone = api.pinecone.getReportTitlesAndUrls.useMutation({
    onSuccess: (data) => {
      setRec(
        data.map(({ title, url, mimeType }) => ({
          displayName: title,
          fileURL: url,
          mimeType: mimeType
        })),
      );
    },
  });


  const gemini = api.chat.prompt.useMutation({
    onSuccess: (data) => {
      if (data) {
        setMessages([...messages, makeNewMessage(data, "assistant")]);
        setHasSentFirstMsg(true);
      }
      setIsGenerating(false);
    },
  });

  const inputSchema = z.object({ prompt: z.string() });
  const form = useForm<z.infer<typeof inputSchema>>({
    resolver: zodResolver(inputSchema),
    defaultValues: { prompt: "" },
  });

  const handlePineconeChange = useDebounce((input: string) => pinecone.mutate({ input }), 500)

  function onRecommendedFileClick(file: UploadFileData) {
    setSelectedFiles(file)
  }

  function onSubmit(values: z.infer<typeof inputSchema>) {
    form.reset();
    setIsGenerating(true);

    const userMessage = makeNewMessage(values.prompt, "user");
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    gemini.mutate({ data: updatedMessages, files: selectedFiles });
  }

  return (
    <div className="flex h-full w-full">
      <div className="flex flex-1 flex-col">
        <header className="px-4 pt-20">
          <h1 className="text-xl font-semibold">Chat about the VPC ✨</h1>
        </header>
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Recommendations:</CardTitle>
            </CardHeader>
            <CardContent>
              {pinecone.isPending ?
                <LoadingSpinner />
                : (
                  <div className="flex  gap-4">
                    {rec.map(file => <RecButton selected={file == selectedFiles} file={file} onRecommendedFileClick={onRecommendedFileClick} key={file.fileURL} />)}
                  </div>
                )}
            </CardContent>
          </Card>
        </div>
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
                      onChange={async (e) => {
                        field.onChange(e);
                        if (!hasSentFirstMsg) await handlePineconeChange(e.target.value)
                      }}
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
    </div >
  );
}

function RecButton({ selected, file, onRecommendedFileClick }: { file: UploadFileData, onRecommendedFileClick?: (file: UploadFileData) => void, selected: boolean }) {
  return (
    <Button onClick={() => onRecommendedFileClick && onRecommendedFileClick(file)} key={file.fileURL} variant={selected ? "default" : "outline"} className="flex p-2 flex-col text-wrap h-full w-full">
      <h1 className="text-xl">{file.displayName}</h1>
      <p className="text-gray-600">{file.mimeType}</p>
    </Button>
  )
}

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


