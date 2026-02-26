"use client"

import { useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { Copy, Check, MessageCircle, X } from "lucide-react"

interface OrderSummaryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  message: string
}

export function OrderSummaryDialog({
  open,
  onOpenChange,
  message,
}: OrderSummaryDialogProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea")
      textarea.value = message
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  function handleKakao() {
    handleCopy()
    window.open("http://pf.kakao.com/_IxaZqX/chat", "_blank")
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-background p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-lg font-bold text-foreground">
              주문서 미리보기
            </Dialog.Title>
            <Dialog.Close className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-surface hover:text-foreground">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          <Dialog.Description className="sr-only">
            작성된 주문서를 확인하고 복사하거나 카카오톡으로 보내세요
          </Dialog.Description>

          <div className="mb-6 max-h-[50vh] overflow-y-auto rounded-xl bg-surface p-4">
            <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-foreground">
              {message}
            </pre>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleCopy}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-medium text-foreground transition-all hover:border-accent hover:text-accent"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  복사 완료!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  복사하기
                </>
              )}
            </button>
            <button
              onClick={handleKakao}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent py-3 text-sm font-medium text-white transition-all hover:bg-rose-dark"
            >
              <MessageCircle className="h-4 w-4" />
              카카오톡으로 보내기
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            카카오톡 채팅에 주문서를 붙여넣기(Ctrl+V) 해주세요
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
