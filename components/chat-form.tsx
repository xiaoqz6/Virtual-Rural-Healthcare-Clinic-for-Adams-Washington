"use client"

import { cn } from "@/lib/utils"
import { useChat } from "ai/react"
import { ArrowUpIcon, MessageSquarePlusIcon, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { AutoResizeTextarea } from "@/components/autoresize-textarea"
import { Card } from "@/components/ui/card"
import { ChatMessage } from "@/components/chat-message"
import type React from "react"
import { useRouter } from "next/navigation"

export function ChatForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter()
  const { messages, input, setInput, append, isLoading, setMessages, error } = useChat({
    api: "/api/chat",
    onError: (err) => {
      console.error("Chat error:", err)
      // You can add a toast notification here if you want
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      void append({ content: input, role: "user" })
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  const handleNewChat = () => {
    setMessages([])
    setInput("")
  }

  const header = (
    <Card className="mb-8 p-8">
      <h2 className="mb-4 text-3xl font-semibold">Welcome to AI Health Assistant</h2>
      <p className="text-muted-foreground text-xl">
        Ask any health-related questions, and I'll provide general advice in plain language.
      </p>
      <p className="text-muted-foreground text-xl mt-4">
        Remember, this is not a substitute for professional medical advice.
      </p>
    </Card>
  )

  const messageList = (
    <div className="mb-6 flex flex-col gap-6">
      {messages.map((message, index) => (
        <ChatMessage key={index} content={message.content} role={message.role} />
      ))}
    </div>
  )

  return (
    <TooltipProvider>
      <div
        className={cn("flex h-[calc(100vh-12rem)] max-h-[calc(100vh-12rem)] w-full flex-col items-stretch", className)}
        {...props}
      >
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={() => router.push("/dashboard")}
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-gray-800 hover:bg-gray-100"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-3xl font-bold text-center flex-grow text-gray-800">AI Health Assistant</h1>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleNewChat}
                variant="outline"
                size="sm"
                className="text-gray-800 border-gray-400 hover:bg-gray-100 hover:text-gray-900"
              >
                <MessageSquarePlusIcon size={20} className="mr-2" /> New Chat
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={5}>New Chat</TooltipContent>
          </Tooltip>
        </div>
        <div className="flex-1 overflow-y-auto px-4">
          {messages.length ? messageList : header}
          {error && (
            <div className="p-4 my-4 bg-red-50 border border-red-200 rounded-md text-red-700">
              <p>Error: {error.message || "Failed to get a response. Please try again."}</p>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="mt-6 flex items-center space-x-4">
          <AutoResizeTextarea
            onKeyDown={handleKeyDown}
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Ask a health question..."
            className="flex-1 rounded-md border p-4 text-xl"
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="submit" disabled={isLoading} className="rounded-full h-16 w-16">
                <ArrowUpIcon size={24} />
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={5}>Submit</TooltipContent>
          </Tooltip>
        </form>
      </div>
    </TooltipProvider>
  )
}

