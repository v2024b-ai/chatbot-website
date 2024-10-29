"use client";

import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
// import {
//   ExpandableChat,
//   ExpandableChatHeader,
//   ExpandableChatBody,
//   ExpandableChatFooter,
// } from "@/components/ui/chat/expandable-chat";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeDisplayBlock from "@/components/chatbot-front/code-display-block";
import { api } from "@/trpc/react";

export default function ChatSupport() {
  const gemini = api.chat.text.useMutation();
  const [isGenerating, setIsGenerating] = useState(false);
  let id = 0;
  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    isLoading,
  } = useChat({
    onResponse(response) {
      if (response) {
        setIsGenerating(false);
      }
    },
    onError(error) {
      if (error) {
        setIsGenerating(false);
      }
    },
  });

  const messagesRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();



    setIsGenerating(true);

    // Create the message that you want to append to messages
    // need to use setMessages
    setMessages([
      ...messages,
      { id: id.toString(), role: `user`, content: input },
    ]);
    id++;

    await gemini.mutateAsync(input);
    const geminiOutput = gemini.data;

    if (!geminiOutput) {
      setIsGenerating(false)
      return
    }

    setMessages([
      ...messages,
      { id: id.toString(), role: `assistant`, content: geminiOutput },
    ]);

    id++
    setIsGenerating(false)
    // handleSubmit(e);
  };

  const onKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isGenerating || isLoading || !input) return;
      setIsGenerating(true);
      setMessages([
        ...messages,
        { id: id.toString(), role: `user`, content: input },
      ]);
      id++;

      await gemini.mutateAsync(input);
      const geminiOutput = gemini.data;

      if (!geminiOutput) {
        setIsGenerating(false)
        return
      }

      setMessages([
        ...messages,
        { id: id.toString(), role: `assistant`, content: geminiOutput },
      ]);

      id++
      setIsGenerating(false)

      // await onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      {/*// <ExpandableChat size="md" position="bottom-right">*/}
      {/*//   <ExpandableChatHeader className="flex-col justify-center bg-muted/60 text-center">*/}
      <header className="py-20 p-4">
        <h1 className="text-xl font-semibold">Chat about the VPC ✨</h1>
        <p>Ask anything about the VPC for our AI to answer</p>
      </header>
      {/*// </ExpandableChatHeader>*/}
      {/*// <ExpandableChatBody>*/}
      <ChatMessageList className="bg-muted/25" ref={messagesRef}>
        {/* Initial message */}
        <ChatBubble variant="received">
          <ChatBubbleAvatar src="" fallback="🤖" />
          <ChatBubbleMessage>How can I help you?</ChatBubbleMessage>
        </ChatBubble>

        {/* Messages */}
        {messages?.map((message, index) => (
          <ChatBubble
            key={index}
            variant={message.role == "user" ? "sent" : "received"}
          >
            <ChatBubbleMessage
              variant={message.role == "user" ? "sent" : "received"}
            >
              {message.content
                .split("```")
                .map((part: string, index: number) => {
                  if (index % 2 === 0) {
                    return (
                      <Markdown key={index} remarkPlugins={[remarkGfm]}>
                        {part}
                      </Markdown>
                    );
                  } else {
                    return (
                      <pre className="pt-2" key={index}>
                        <CodeDisplayBlock code={part} lang="" />
                      </pre>
                    );
                  }
                })}
            </ChatBubbleMessage>
          </ChatBubble>
        ))}

        {/* Loading */}
        {isGenerating && (
          <ChatBubble variant="received">
            <ChatBubbleAvatar src="" fallback="🤖" />
            <ChatBubbleMessage isLoading />
          </ChatBubble>
        )}
      </ChatMessageList>
      {/*// </ExpandableChatBody>*/}
      {/*// <ExpandableChatFooter className="bg-muted/25">*/}
      <form ref={formRef} className="relative flex gap-2" onSubmit={onSubmit}>
        <ChatInput
          value={input}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
          className="min-h-12 bg-background shadow-none"
        />
        <Button
          className="absolute right-2 top-1/2 -translate-y-1/2 transform"
          type="submit"
          size="icon"
          disabled={isLoading || isGenerating || !input}
        >
          <Send className="size-4" />
        </Button>
      </form>
      {/*// </ExpandableChatFooter>*/}
      {/*// </ExpandableChat>*/}
    </div>
  );
}
