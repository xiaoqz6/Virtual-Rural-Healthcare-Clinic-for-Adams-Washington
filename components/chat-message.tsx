"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"

interface ChatMessageProps {
  content: string
  role: "user" | "assistant"
}

export function ChatMessage({ content, role }: ChatMessageProps) {
  return (
    <Card
      className={cn("max-w-[80%] p-4 relative", role === "user" ? "self-end bg-[#4B82EA] text-white" : "self-start")}
    >
      <ReactMarkdown
        className="text-sm"
        components={{
          strong: ({ node, ...props }) => <span className="font-bold" {...props} />,
          em: ({ node, ...props }) => <span className="italic" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </Card>
  )
}

