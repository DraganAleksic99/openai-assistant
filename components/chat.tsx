"use client";

import { useAssistant } from "ai/react";
import { useRef, useEffect } from "react";
import ChatMessage from "./chat-message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Chat() {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { status, messages, submitMessage, input, handleInputChange } =
    useAssistant({
      api: "/api/assistant",
    });

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col-reverse h-full w-full">
      <div className="flex flex-col order-2 flex-grow overflow-y-auto p-3 whitespace-pre-wrap space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage key={index} role={msg.role} content={msg.content} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={submitMessage} className="flex w-full p-3 pb-10 order-1">
        <Input
          type="text"
          className="flex-grow mr-3 bg-[#efefef] py-4 px-6 rounded-3xl border-2 border-transparent border-solid text-base"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter your question"
        />
        <Button
          type="submit"
          className="py-2 px-6 text-base rounded-3xl"
          disabled={status !== "awaiting_message"}
        >
          Send
        </Button>
      </form>
    </div>
  );
}
