"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import {
  CARD_VALUES,
  SUIT_SYMBOLS,
  SUIT_COLORS,
  isMonster,
  isPotion,
  isWeaponCard,
  isMerchant,
  type Card,
} from "@/lib/game-logic"
import { MonsterIllustration } from "./illustrations/monster-illustration"
import { PotionIllustration } from "./illustrations/potion-illustration"
import { WeaponIllustration } from "./illustrations/weapon-illustration"
import { MerchantIllustration } from "./illustrations/merchant-illustration"

interface PlayingCardProps {
  card: Card
  isSelected: boolean
  onClick: () => void
  delay?: number
  isSlashing?: boolean
  isLeftover?: boolean
}

export function PlayingCard({
  card,
  isSelected,
  onClick,
  delay = 0,
  isSlashing = false,
  isLeftover = false,
}: PlayingCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlipped(true)
      setTimeout(() => setIsAnimating(false), 700)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  const getCardGlow = () => {
    if (!isSelected) return ""
    if (isMonster(card)) return "card-glow-monster"
    if (isPotion(card)) return "card-glow-potion"
    if (isWeaponCard(card)) return "card-glow-weapon"
    if (isMerchant(card)) return "card-glow-merchant"
    return ""
  }

  const getCardBorder = () => {
    if (isSelected) return "ring-2 ring-primary ring-offset-2 ring-offset-background"
    if (isMonster(card)) return "border-red-600/40 hover:border-red-500"
    if (isPotion(card)) return "border-green-600/40 hover:border-green-500"
    if (isWeaponCard(card)) return "border-amber-600/40 hover:border-amber-500"
    if (isMerchant(card)) return "border-purple-600/40 hover:border-purple-500"
    return "border-border hover:border-primary"
  }

  const renderIllustration = () => {
    if (isMonster(card)) return <MonsterIllustration value={card.value} />
    if (isPotion(card)) return <PotionIllustration value={card.value} />
    if (isWeaponCard(card)) return <WeaponIllustration value={card.value} />
    if (isMerchant(card)) return <MerchantIllustration />
    return null
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-28 h-40 sm:w-32 sm:h-44 md:w-36 md:h-48 rounded-xl transition-all duration-300",
        "transform hover:scale-105 hover:-translate-y-2",
        isFlipped ? "" : "pointer-events-none",
        isSelected && "scale-105 -translate-y-3",
        isSlashing && "card-slash",
        isLeftover && "opacity-80 ring-2 ring-amber-500/50",
      )}
      style={{ perspective: "1000px" }}
    >
      {/* Slash effect overlay */}
      {isSlashing && (
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent slash-effect" />
        </div>
      )}

      <div
        className={cn("absolute inset-0 rounded-xl transition-all duration-500", isAnimating && "card-flip")}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Card Back */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl",
            "bg-gradient-to-br from-primary/90 via-primary/70 to-primary/50",
            "border-2 border-primary/60 flex items-center justify-center",
            "shadow-lg shadow-primary/20",
            isFlipped && "opacity-0",
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative w-16 h-24 md:w-20 md:h-28 rounded-lg border-2 border-primary/40 bg-primary/20 flex items-center justify-center">
            <div className="text-4xl md:text-5xl opacity-50 font-serif">S</div>
          </div>
        </div>

        {/* Card Front */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl bg-gradient-to-b from-card via-card to-card/95",
            "border-2 flex flex-col overflow-hidden",
            "transition-all duration-300",
            getCardBorder(),
            getCardGlow(),
            isMerchant(card) && "merchant-sparkle",
          )}
        >
          {/* Top Corner Value */}
          <div className={cn("absolute top-1.5 left-2 flex flex-col items-center", SUIT_COLORS[card.suit])}>
            <div className="text-lg md:text-xl font-bold leading-none">{CARD_VALUES[card.value]}</div>
            <div className="text-sm md:text-base leading-none">{SUIT_SYMBOLS[card.suit]}</div>
          </div>

          {/* Center Illustration */}
          <div className="flex-1 flex items-center justify-center pt-6 pb-2">{renderIllustration()}</div>

          {/* Bottom Corner Value (rotated) */}
          <div
            className={cn("absolute bottom-1.5 right-2 flex flex-col items-center rotate-180", SUIT_COLORS[card.suit])}
          >
            <div className="text-lg md:text-xl font-bold leading-none">{CARD_VALUES[card.value]}</div>
            <div className="text-sm md:text-base leading-none">{SUIT_SYMBOLS[card.suit]}</div>
          </div>

          {/* Leftover indicator */}
          {isLeftover && (
            <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-amber-600/80 rounded text-[10px] font-bold text-amber-100">
              LEFTOVER
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
