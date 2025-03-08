"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { useRef, useEffect, useCallback, type TextareaHTMLAttributes } from "react"

interface AutoResizeTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange"> {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function AutoResizeTextarea({ className, value, onChange, ...props }: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const resizeTextarea = useCallback(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [])

  useEffect(() => {
    resizeTextarea()
  }, [resizeTextarea])

  return (
    <textarea
      {...props}
      value={value}
      ref={textareaRef}
      rows={1}
      onChange={(e) => {
        onChange(e)
        resizeTextarea()
      }}
      className={cn("resize-none min-h-[2.5rem] max-h-[10rem] text-gray-900", className)}
    />
  )
}

