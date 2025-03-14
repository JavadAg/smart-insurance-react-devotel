"use client" // Error boundaries must be Client Components

import { Button } from "@/components/ui/button"
import { useScopedI18n } from "@/locale/client"
import { useEffect } from "react"

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(`[Error]: ${error.message}`)
  }, [error])

  const scopedT = useScopedI18n("error")

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 select-none">
      <div className="relative">
        <span className="text-primary/10 text-9xl font-bold">ERROR</span>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-primary block text-4xl font-bold">
            {scopedT("title")}
          </span>
          <span className="mt-2 block text-xl text-gray-500">
            {scopedT("description")}
          </span>
        </div>
      </div>

      <div className="relative mt-4">
        <Button
          onClick={() => reset()}
          className="relative z-10 min-w-[120px] animate-bounce shadow-lg"
          variant="default"
        >
          {scopedT("tryAgain")}
        </Button>
        <div className="bg-primary/20 absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full" />
      </div>
    </div>
  )
}
