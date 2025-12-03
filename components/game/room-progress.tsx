"use client"

import { cn } from "@/lib/utils"

interface RoomProgressProps {
  cardsResolved: number
  cardsRemaining: number
}

export function RoomProgress({ cardsResolved, cardsRemaining }: RoomProgressProps) {
  const totalCards = cardsResolved + cardsRemaining
  const maxToShow = Math.min(totalCards, 4)

  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <span className="text-xs text-muted-foreground uppercase tracking-wider hidden sm:inline">Progress</span>
      <div className="flex items-center gap-2">
        {Array.from({ length: maxToShow }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-500",
              "border-2",
              i < cardsResolved
                ? "bg-primary border-primary shadow-lg shadow-primary/30"
                : "bg-transparent border-muted-foreground/30",
            )}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">{cardsResolved}/3 to advance</span>
    </div>
  )
}
