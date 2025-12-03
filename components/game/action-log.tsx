"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface ActionLogProps {
  message: string
  animation: string | null
}

export function ActionLog({ message, animation }: ActionLogProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setVisible(false)
    const timer = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(timer)
  }, [message])

  return (
    <div
      className={cn(
        "text-center py-3 sm:py-4 px-4 sm:px-6 rounded-xl mb-4",
        "bg-gradient-to-r from-card/30 via-card/50 to-card/30",
        "border border-border/30 backdrop-blur-sm",
        "transition-all duration-300",
        !visible && "opacity-0 transform scale-95",
        animation === "damage" && "bg-gradient-to-r from-red-900/30 via-red-800/40 to-red-900/30 border-red-500/30",
        animation === "heal" &&
          "bg-gradient-to-r from-green-900/30 via-green-800/40 to-green-900/30 border-green-500/30",
        animation === "weapon" &&
          "bg-gradient-to-r from-amber-900/30 via-amber-800/40 to-amber-900/30 border-amber-500/30",
        animation === "slay" && "bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 border-primary/30",
        animation === "merchant" &&
          "bg-gradient-to-r from-purple-900/30 via-purple-800/40 to-purple-900/30 border-purple-500/30",
        animation === "death" && "bg-gradient-to-r from-red-950/50 via-red-900/60 to-red-950/50 border-red-600/50",
      )}
    >
      <p
        className={cn(
          "text-sm sm:text-base md:text-lg font-medium transition-colors",
          animation === "damage" && "text-red-300",
          animation === "heal" && "text-green-300",
          animation === "weapon" && "text-amber-300",
          animation === "slay" && "text-primary",
          animation === "merchant" && "text-purple-300",
          animation === "death" && "text-red-400 font-bold",
          !animation && "text-foreground/80",
        )}
      >
        {message}
      </p>
    </div>
  )
}
