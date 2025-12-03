"use client"

import { cn } from "@/lib/utils"
import { HeroPortrait } from "./illustrations/hero-portrait"

interface HealthBarProps {
  current: number
  max: number
  animation: string | null
}

export function HealthBar({ current, max, animation }: HealthBarProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-3 border-2 transition-all duration-300",
        "bg-gradient-to-b from-card/80 to-card/40",
        "border-border/50 col-span-2 sm:col-span-1",
        animation === "damage" && "shake border-red-500/50",
        animation === "heal" && "heal-pulse border-green-500/50",
      )}
    >
      <HeroPortrait health={current} maxHealth={max} animation={animation} />
    </div>
  )
}
