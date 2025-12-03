"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface HeroPortraitProps {
  health: number
  maxHealth: number
  animation: string | null
  className?: string
}

export function HeroPortrait({ health, maxHealth, animation, className }: HeroPortraitProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const healthPercent = (health / maxHealth) * 100

  useEffect(() => {
    if (animation === "damage" || animation === "heal") {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 600)
      return () => clearTimeout(timer)
    }
  }, [animation])

  const getHealthState = () => {
    if (healthPercent > 70) return "healthy"
    if (healthPercent > 40) return "wounded"
    if (healthPercent > 15) return "critical"
    return "dying"
  }

  const state = getHealthState()

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "relative w-16 h-20 md:w-20 md:h-24 rounded-lg overflow-hidden",
          "border-2",
          state === "healthy" && "border-emerald-500/50",
          state === "wounded" && "border-amber-500/50",
          state === "critical" && "border-red-500/50",
          state === "dying" && "border-red-700/80 animate-pulse",
          isAnimating && animation === "damage" && "hero-hurt damage-flash",
          isAnimating && animation === "heal" && "hero-heal",
        )}
      >
        <svg viewBox="0 0 80 100" className="w-full h-full">
          <defs>
            <linearGradient id="helmetSteel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9ca3af" />
              <stop offset="50%" stopColor="#d1d5db" />
              <stop offset="100%" stopColor="#6b7280" />
            </linearGradient>
            <linearGradient id="helmetDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4b5563" />
              <stop offset="100%" stopColor="#1f2937" />
            </linearGradient>
            <linearGradient id="armorPlate" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6b7280" />
              <stop offset="50%" stopColor="#9ca3af" />
              <stop offset="100%" stopColor="#4b5563" />
            </linearGradient>
            <linearGradient id="crestRed" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            <linearGradient id="capeGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <filter id="heroGlow">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background */}
          <rect width="80" height="100" fill="url(#helmetDark)" />

          {/* Cape hints */}
          <path d="M10 70 Q5 85 15 100 L65 100 Q75 85 70 70" fill="url(#capeGold)" opacity="0.3" />

          {/* Armor shoulders */}
          <ellipse cx="20" cy="80" rx="15" ry="12" fill="url(#armorPlate)" />
          <ellipse cx="60" cy="80" rx="15" ry="12" fill="url(#armorPlate)" />

          {/* Shoulder spikes */}
          <path d="M12 72 L8 60 L16 68" fill="#4b5563" />
          <path d="M68 72 L72 60 L64 68" fill="#4b5563" />

          {/* Neck armor */}
          <rect x="25" y="70" width="30" height="20" fill="url(#armorPlate)" />
          <path d="M30 75 L50 75" stroke="#9ca3af" strokeWidth="2" />
          <path d="M28 82 L52 82" stroke="#9ca3af" strokeWidth="2" />

          {/* Helmet base */}
          <path d="M15 65 Q15 25 40 15 Q65 25 65 65 L65 72 Q55 75 40 75 Q25 75 15 72 Z" fill="url(#helmetSteel)" />

          {/* Helmet brow ridge */}
          <path d="M18 45 Q40 40 62 45 L60 50 Q40 46 20 50 Z" fill="#6b7280" />

          {/* Visor opening */}
          <path d="M22 50 L58 50 L55 65 Q40 68 25 65 Z" fill="#111827" />

          {/* Visor slits */}
          <rect
            x="28"
            y="54"
            width="8"
            height="3"
            rx="1"
            fill={
              state === "healthy"
                ? "#34d399"
                : state === "wounded"
                  ? "#fbbf24"
                  : state === "critical"
                    ? "#f87171"
                    : "#dc2626"
            }
            filter="url(#heroGlow)"
          >
            {(state === "critical" || state === "dying") && (
              <animate attributeName="opacity" values="1;0.5;1" dur="0.5s" repeatCount="indefinite" />
            )}
          </rect>
          <rect
            x="44"
            y="54"
            width="8"
            height="3"
            rx="1"
            fill={
              state === "healthy"
                ? "#34d399"
                : state === "wounded"
                  ? "#fbbf24"
                  : state === "critical"
                    ? "#f87171"
                    : "#dc2626"
            }
            filter="url(#heroGlow)"
          >
            {(state === "critical" || state === "dying") && (
              <animate attributeName="opacity" values="1;0.5;1" dur="0.5s" repeatCount="indefinite" />
            )}
          </rect>

          {/* Breathing holes */}
          <circle cx="35" cy="62" r="1" fill="#374151" />
          <circle cx="40" cy="63" r="1" fill="#374151" />
          <circle cx="45" cy="62" r="1" fill="#374151" />

          {/* Helmet crest */}
          <path d="M40 15 L38 5 Q40 2 42 5 L40 15" fill="url(#crestRed)" />
          <path d="M38 18 L35 8 Q40 5 45 8 L42 18" fill="url(#crestRed)" />

          {/* Crest plume */}
          <path d="M36 20 Q30 10 32 2 Q38 8 40 2 Q42 8 48 2 Q50 10 44 20" fill="url(#crestRed)" />

          {/* Helmet shine */}
          <path d="M20 30 Q25 25 30 30" fill="none" stroke="#fff" strokeWidth="2" opacity="0.3" />
          <ellipse cx="25" cy="40" rx="3" ry="8" fill="#fff" opacity="0.15" />

          {/* Decorative trim */}
          <path d="M18 68 Q40 72 62 68" fill="none" stroke="url(#capeGold)" strokeWidth="2" />

          {/* Damage effects */}
          {state === "critical" && <path d="M55 35 L58 30 L60 38 L56 36 Z" fill="#dc2626" opacity="0.6" />}
          {state === "dying" && (
            <>
              <path d="M55 35 L58 30 L60 38 L56 36 Z" fill="#dc2626" opacity="0.8" />
              <path d="M22 40 L20 35 L25 38" fill="#dc2626" opacity="0.6" />
              <rect x="0" y="0" width="80" height="100" fill="#7f1d1d" opacity="0.3" />
            </>
          )}

          {/* Healing glow */}
          {isAnimating && animation === "heal" && (
            <rect x="0" y="0" width="80" height="100" fill="#34d399" opacity="0.2">
              <animate attributeName="opacity" values="0.2;0.4;0" dur="0.8s" />
            </rect>
          )}
        </svg>
      </div>

      {/* Health bar beneath portrait */}
      <div className="mt-1 w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
        <div
          className={cn(
            "h-full transition-all duration-500 rounded-full",
            state === "healthy" && "bg-gradient-to-r from-emerald-500 to-green-400",
            state === "wounded" && "bg-gradient-to-r from-amber-500 to-yellow-400",
            state === "critical" && "bg-gradient-to-r from-red-600 to-red-400",
            state === "dying" && "bg-red-700 animate-pulse",
          )}
          style={{ width: `${healthPercent}%` }}
        />
      </div>

      {/* Health text */}
      <div className="mt-0.5 text-center">
        <span
          className={cn(
            "text-xs font-bold",
            state === "healthy" && "text-emerald-400",
            state === "wounded" && "text-amber-400",
            state === "critical" && "text-red-400",
            state === "dying" && "text-red-500",
          )}
        >
          {health}/{maxHealth}
        </span>
      </div>
    </div>
  )
}
