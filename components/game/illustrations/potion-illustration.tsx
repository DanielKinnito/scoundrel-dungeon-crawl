"use client"

import { cn } from "@/lib/utils"
import { getPotionTier, POTION_NAMES } from "@/lib/game-logic"

interface PotionIllustrationProps {
  value: number
  className?: string
  animated?: boolean
}

export function PotionIllustration({ value, className, animated = true }: PotionIllustrationProps) {
  const tier = getPotionTier(value)
  const name = POTION_NAMES[value] || "Potion"

  const renderPotion = () => {
    switch (value) {
      case 1: // Minor Salve
        return (
          <svg viewBox="0 0 64 80" className="w-12 h-16 md:w-14 md:h-18">
            <defs>
              <linearGradient id="salveJar" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b7355" />
                <stop offset="100%" stopColor="#5c4a3a" />
              </linearGradient>
              <linearGradient id="salveContent" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6b8e23" />
                <stop offset="100%" stopColor="#3a5a1a" />
              </linearGradient>
            </defs>
            {/* Small clay jar */}
            <ellipse cx="32" cy="65" rx="16" ry="6" fill="#4a3a2a" />
            <path d="M16 30 Q14 50 16 65 L48 65 Q50 50 48 30 Z" fill="url(#salveJar)" />
            <ellipse cx="32" cy="30" rx="16" ry="6" fill="#9a8365" />
            {/* Salve inside */}
            <ellipse cx="32" cy="32" rx="12" ry="4" fill="url(#salveContent)" />
            {/* Leaf decoration */}
            <path d="M28 28 Q32 22 36 28" fill="#4a7a2a" />
            <line x1="32" y1="28" x2="32" y2="24" stroke="#3a5a1a" strokeWidth="1" />
            {/* Shine */}
            <ellipse cx="24" cy="45" rx="3" ry="6" fill="#fff" opacity="0.2" />
          </svg>
        )

      case 2: // Healing Herbs
        return (
          <svg viewBox="0 0 64 80" className="w-12 h-16 md:w-14 md:h-18">
            <defs>
              <linearGradient id="herbBag" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b7355" />
                <stop offset="100%" stopColor="#6a5a4a" />
              </linearGradient>
            </defs>
            {/* Cloth pouch */}
            <path d="M18 35 Q15 55 20 70 L44 70 Q49 55 46 35 Q40 30 32 30 Q24 30 18 35" fill="url(#herbBag)" />
            {/* Tie */}
            <path d="M24 32 Q32 28 40 32" fill="none" stroke="#5a4a3a" strokeWidth="3" />
            <circle cx="32" cy="30" r="3" fill="#7a6a5a" />
            {/* Herbs sticking out */}
            <path d="M26 30 Q24 20 28 12" fill="none" stroke="#4a8a2a" strokeWidth="2" strokeLinecap="round" />
            <path d="M32 28 Q32 18 30 10" fill="none" stroke="#5a9a3a" strokeWidth="2" strokeLinecap="round" />
            <path d="M38 30 Q40 20 36 12" fill="none" stroke="#3a7a1a" strokeWidth="2" strokeLinecap="round" />
            {/* Leaves */}
            <ellipse cx="28" cy="14" rx="3" ry="5" fill="#4a8a2a" transform="rotate(-20 28 14)" />
            <ellipse cx="30" cy="12" rx="2" ry="4" fill="#5a9a3a" />
            <ellipse cx="36" cy="14" rx="3" ry="5" fill="#3a7a1a" transform="rotate(20 36 14)" />
            {/* Texture */}
            <path d="M22 50 Q32 52 42 50" fill="none" stroke="#5a4a3a" strokeWidth="1" opacity="0.5" />
          </svg>
        )

      case 3: // Health Tonic
        return (
          <svg viewBox="0 0 64 80" className="w-12 h-16 md:w-14 md:h-18">
            <defs>
              <linearGradient id="tonicLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#5aaa5a" />
                <stop offset="100%" stopColor="#2a6a2a" />
              </linearGradient>
              <linearGradient id="tonicGlass" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(200,220,200,0.3)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="100%" stopColor="rgba(200,220,200,0.3)" />
              </linearGradient>
            </defs>
            {/* Cork */}
            <rect x="26" y="8" width="12" height="8" rx="2" fill="#8b6b4a" />
            <rect x="27" y="10" width="10" height="2" fill="#6a5a3a" />
            {/* Bottle neck */}
            <rect x="28" y="16" width="8" height="10" fill="url(#tonicGlass)" stroke="#aaa" strokeWidth="1" />
            {/* Bottle body */}
            <path
              d="M22 26 L28 26 L28 26 L22 26 Q18 35 18 50 Q18 68 22 72 L42 72 Q46 68 46 50 Q46 35 42 26 L36 26 L36 26 L42 26"
              fill="url(#tonicGlass)"
              stroke="#aaa"
              strokeWidth="1"
            />
            {/* Liquid */}
            <path d="M20 40 Q20 68 24 70 L40 70 Q44 68 44 40 Z" fill="url(#tonicLiquid)" />
            {/* Bubbles */}
            <circle cx="28" cy="55" r="2" fill="#7aca7a" opacity="0.6">
              {animated && <animate attributeName="cy" values="55;45;55" dur="2s" repeatCount="indefinite" />}
            </circle>
            <circle cx="36" cy="60" r="1.5" fill="#8ada8a" opacity="0.5">
              {animated && <animate attributeName="cy" values="60;50;60" dur="2.5s" repeatCount="indefinite" />}
            </circle>
            {/* Shine */}
            <path d="M24 35 L24 55" stroke="#fff" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
            {/* Label */}
            <rect x="26" y="48" width="12" height="8" rx="1" fill="#f5f5dc" opacity="0.8" />
            <path d="M28 52 L36 52" stroke="#2a6a2a" strokeWidth="1" />
          </svg>
        )

      case 4: // Healing Potion
        return (
          <svg viewBox="0 0 64 80" className="w-12 h-16 md:w-14 md:h-18">
            <defs>
              <linearGradient id="potionLiquid4" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
              <filter id="potionGlow4">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Cork */}
            <ellipse cx="32" cy="10" rx="6" ry="3" fill="#a08060" />
            <rect x="26" y="10" width="12" height="6" fill="#8b7050" />
            {/* Bottle neck */}
            <rect x="28" y="16" width="8" height="8" fill="rgba(200,255,200,0.2)" stroke="#88aa88" strokeWidth="1" />
            {/* Round bottle body */}
            <ellipse cx="32" cy="50" rx="18" ry="22" fill="rgba(200,255,200,0.15)" stroke="#88aa88" strokeWidth="1" />
            {/* Liquid */}
            <ellipse cx="32" cy="52" rx="15" ry="18" fill="url(#potionLiquid4)" filter="url(#potionGlow4)" />
            {/* Bubbles */}
            <circle cx="26" cy="55" r="2" fill="#8afa8a" opacity="0.7">
              {animated && <animate attributeName="cy" values="55;42;55" dur="1.8s" repeatCount="indefinite" />}
            </circle>
            <circle cx="35" cy="58" r="1.5" fill="#aaffaa" opacity="0.6">
              {animated && <animate attributeName="cy" values="58;45;58" dur="2.2s" repeatCount="indefinite" />}
            </circle>
            <circle cx="30" cy="62" r="1" fill="#6aea6a" opacity="0.5">
              {animated && <animate attributeName="cy" values="62;50;62" dur="2s" repeatCount="indefinite" />}
            </circle>
            {/* Shine */}
            <ellipse cx="22" cy="45" rx="3" ry="8" fill="#fff" opacity="0.25" />
            {/* Cross symbol */}
            <rect x="30" y="44" width="4" height="12" rx="1" fill="#fff" opacity="0.4" />
            <rect x="26" y="48" width="12" height="4" rx="1" fill="#fff" opacity="0.4" />
          </svg>
        )

      case 5: // Strong Elixir
        return (
          <svg viewBox="0 0 64 80" className="w-12 h-16 md:w-14 md:h-18">
            <defs>
              <linearGradient id="elixirLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <filter id="elixirGlow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Ornate cork */}
            <circle cx="32" cy="8" r="5" fill="#c0a080" />
            <rect x="28" y="8" width="8" height="6" fill="#a08060" />
            {/* Elegant bottle neck */}
            <path
              d="M28 14 L26 20 L26 24 L38 24 L38 20 L36 14 Z"
              fill="rgba(150,255,200,0.2)"
              stroke="#6a9a8a"
              strokeWidth="1"
            />
            {/* Flask body - angular elegant shape */}
            <path
              d="M26 24 L20 35 L18 55 L22 70 L42 70 L46 55 L44 35 L38 24 Z"
              fill="rgba(150,255,200,0.15)"
              stroke="#6a9a8a"
              strokeWidth="1"
            />
            {/* Liquid */}
            <path d="M21 40 L19 55 L23 68 L41 68 L45 55 L43 40 Z" fill="url(#elixirLiquid)" filter="url(#elixirGlow)" />
            {/* Magical swirl */}
            <path
              d="M28 50 Q32 45 36 50 Q40 55 36 60 Q32 65 28 60"
              fill="none"
              stroke="#aaffcc"
              strokeWidth="1.5"
              opacity="0.6"
            >
              {animated && (
                <animate attributeName="stroke-opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
              )}
            </path>
            {/* Sparkles */}
            <circle cx="30" cy="48" r="1" fill="#fff">
              {animated && <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />}
            </circle>
            <circle cx="36" cy="56" r="1" fill="#fff">
              {animated && <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />}
            </circle>
            {/* Shine */}
            <path d="M24 35 L22 55" stroke="#fff" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
          </svg>
        )

      case 6: // Life Essence
        return (
          <svg viewBox="0 0 64 80" className="w-12 h-16 md:w-14 md:h-18">
            <defs>
              <linearGradient id="essenceLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <radialGradient id="essenceCore" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#6ee7b7" />
                <stop offset="100%" stopColor="#10b981" />
              </radialGradient>
              <filter id="essenceGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Crystal stopper */}
            <path d="M28 6 L32 2 L36 6 L34 12 L30 12 Z" fill="#8af" />
            <rect x="29" y="12" width="6" height="4" fill="#6ae" />
            {/* Crystal vial */}
            <path
              d="M26 16 L24 22 L22 35 L20 55 Q20 70 32 72 Q44 70 44 55 L42 35 L40 22 L38 16 Z"
              fill="rgba(200,255,230,0.2)"
              stroke="#6ab"
              strokeWidth="1"
            />
            {/* Liquid */}
            <path
              d="M23 38 L21 55 Q21 68 32 70 Q43 68 43 55 L41 38 Z"
              fill="url(#essenceLiquid)"
              filter="url(#essenceGlow)"
            />
            {/* Glowing essence core */}
            <circle cx="32" cy="54" r="8" fill="url(#essenceCore)" filter="url(#essenceGlow)">
              {animated && <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />}
            </circle>
            {/* Heart symbol */}
            <path d="M32 50 Q28 46 28 50 Q28 54 32 58 Q36 54 36 50 Q36 46 32 50" fill="#ff6b6b" opacity="0.8">
              {animated && <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1s" repeatCount="indefinite" />}
            </path>
            {/* Shine */}
            <path d="M26 30 L24 50" stroke="#fff" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
          </svg>
        )

      case 7: // Greater Potion
      case 8: // Royal Medicine
      case 9: // Ancient Remedy
        return (
          <svg
            viewBox="0 0 64 80"
            className={cn("w-12 h-16 md:w-14 md:h-18", animated && "animate-glow-pulse")}
            style={{ color: "#10b981" }}
          >
            <defs>
              <linearGradient id="greaterLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <filter id="greaterGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Ornate stopper */}
            <ellipse cx="32" cy="6" rx="4" ry="3" fill="#ffd700" />
            <path d="M28 6 L30 12 L34 12 L36 6" fill="#daa520" />
            {/* Decorated neck */}
            <rect x="28" y="12" width="8" height="8" fill="rgba(200,255,220,0.2)" stroke="#6a9" strokeWidth="1" />
            <rect x="26" y="18" width="12" height="2" fill="#daa520" />
            {/* Ornate bottle */}
            <path
              d="M26 20 Q18 28 16 45 Q16 65 24 72 L40 72 Q48 65 48 45 Q46 28 38 20 Z"
              fill="rgba(200,255,220,0.15)"
              stroke="#6a9"
              strokeWidth="1"
            />
            {/* Decorative bands */}
            <ellipse cx="32" cy="30" rx="12" ry="3" fill="none" stroke="#daa520" strokeWidth="1" />
            <ellipse cx="32" cy="65" rx="10" ry="2" fill="none" stroke="#daa520" strokeWidth="1" />
            {/* Liquid */}
            <path d="M18 42 Q18 64 25 70 L39 70 Q46 64 46 42 Z" fill="url(#greaterLiquid)" filter="url(#greaterGlow)" />
            {/* Magic particles */}
            <circle cx="26" cy="50" r="1.5" fill="#fff">
              {animated && <animate attributeName="cy" values="50;40;50" dur="2s" repeatCount="indefinite" />}
            </circle>
            <circle cx="38" cy="55" r="1" fill="#fff">
              {animated && <animate attributeName="cy" values="55;45;55" dur="2.3s" repeatCount="indefinite" />}
            </circle>
            <circle cx="32" cy="60" r="1.5" fill="#fff">
              {animated && <animate attributeName="cy" values="60;48;60" dur="1.8s" repeatCount="indefinite" />}
            </circle>
            {/* Shine */}
            <path d="M22 35 L20 55" stroke="#fff" strokeWidth="3" opacity="0.3" strokeLinecap="round" />
          </svg>
        )

      case 10: // Dragon Blood
        return (
          <svg
            viewBox="0 0 64 80"
            className={cn("w-12 h-16 md:w-14 md:h-18", animated && "animate-glow-pulse")}
            style={{ color: "#ef4444" }}
          >
            <defs>
              <linearGradient id="dragonBlood" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="50%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
              <filter id="bloodGlow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Dragon scale stopper */}
            <path d="M28 4 L32 0 L36 4 L34 8 L30 8 Z" fill="#dc2626" />
            <path d="M26 8 L32 4 L38 8 L36 14 L28 14 Z" fill="#b91c1c" />
            {/* Dragon claw holder */}
            <path d="M24 14 L22 20 L26 22 L32 20 L38 22 L42 20 L40 14 Z" fill="#5a3a2a" />
            {/* Vial body */}
            <path
              d="M24 22 Q18 32 18 50 Q18 68 26 72 L38 72 Q46 68 46 50 Q46 32 40 22 Z"
              fill="rgba(255,200,200,0.15)"
              stroke="#a55"
              strokeWidth="1"
            />
            {/* Dragon blood */}
            <path d="M20 38 Q20 66 27 70 L37 70 Q44 66 44 38 Z" fill="url(#dragonBlood)" filter="url(#bloodGlow)" />
            {/* Bubbling effect */}
            <circle cx="28" cy="55" r="2" fill="#fca5a5" opacity="0.7">
              {animated && <animate attributeName="cy" values="55;42;55" dur="1.5s" repeatCount="indefinite" />}
            </circle>
            <circle cx="36" cy="60" r="1.5" fill="#fca5a5" opacity="0.6">
              {animated && <animate attributeName="cy" values="60;48;60" dur="2s" repeatCount="indefinite" />}
            </circle>
            {/* Dragon scale pattern */}
            <path d="M26 45 L32 42 L38 45" fill="none" stroke="#fca5a5" strokeWidth="1" opacity="0.4" />
            <path d="M24 52 L32 48 L40 52" fill="none" stroke="#fca5a5" strokeWidth="1" opacity="0.4" />
            {/* Shine */}
            <path d="M24 32 L22 52" stroke="#fff" strokeWidth="2" opacity="0.25" strokeLinecap="round" />
          </svg>
        )

      case 11: // Phoenix Tears
        return (
          <svg viewBox="0 0 64 80" className={cn("w-12 h-16 md:w-14 md:h-18", animated && "animate-holy-glow")}>
            <defs>
              <linearGradient id="phoenixTears" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="50%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
              <filter id="phoenixGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Phoenix feather stopper */}
            <path d="M32 0 Q28 8 30 14 L34 14 Q36 8 32 0" fill="#f97316" />
            <path d="M30 4 L32 2 L34 4" fill="#fde047" />
            {/* Golden neck */}
            <rect x="28" y="14" width="8" height="6" fill="#fbbf24" />
            {/* Teardrop shaped vial */}
            <path
              d="M32 20 Q20 35 20 55 Q20 72 32 74 Q44 72 44 55 Q44 35 32 20"
              fill="rgba(255,240,200,0.2)"
              stroke="#d97706"
              strokeWidth="1"
            />
            {/* Phoenix tears liquid */}
            <path
              d="M32 30 Q22 42 22 55 Q22 70 32 72 Q42 70 42 55 Q42 42 32 30"
              fill="url(#phoenixTears)"
              filter="url(#phoenixGlow)"
            />
            {/* Inner flame */}
            <path d="M32 45 Q28 50 30 58 Q32 62 34 58 Q36 50 32 45" fill="#fef08a" opacity="0.8">
              {animated && (
                <animate
                  attributeName="d"
                  values="M32 45 Q28 50 30 58 Q32 62 34 58 Q36 50 32 45;M32 43 Q27 50 30 60 Q32 64 34 60 Q37 50 32 43;M32 45 Q28 50 30 58 Q32 62 34 58 Q36 50 32 45"
                  dur="1s"
                  repeatCount="indefinite"
                />
              )}
            </path>
            {/* Sparkles */}
            <circle cx="28" cy="50" r="1" fill="#fff">
              {animated && <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />}
            </circle>
            <circle cx="36" cy="55" r="1" fill="#fff">
              {animated && <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />}
            </circle>
            {/* Shine */}
            <path d="M26 40 L24 58" stroke="#fff" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
          </svg>
        )

      case 12: // Divine Nectar
        return (
          <svg viewBox="0 0 64 80" className={cn("w-12 h-16 md:w-14 md:h-18", animated && "animate-holy-glow")}>
            <defs>
              <linearGradient id="divineNectar" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fef9c3" />
                <stop offset="50%" stopColor="#fde047" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
              <filter id="divineGlow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Angelic stopper */}
            <ellipse cx="32" cy="6" rx="6" ry="4" fill="#fef9c3" />
            <path d="M26 6 L24 0 L28 4" fill="#fde047" />
            <path d="M38 6 L40 0 L36 4" fill="#fde047" />
            {/* Holy chalice shape */}
            <path
              d="M24 10 L22 16 L20 20 L18 50 Q18 72 32 74 Q46 72 46 50 L44 20 L42 16 L40 10 Z"
              fill="rgba(255,250,220,0.25)"
              stroke="#d4af37"
              strokeWidth="1.5"
            />
            {/* Decorative cross */}
            <rect x="30" y="14" width="4" height="10" fill="#d4af37" />
            <rect x="26" y="17" width="12" height="4" fill="#d4af37" />
            {/* Divine liquid */}
            <path
              d="M20 35 L19 50 Q19 70 32 72 Q45 70 45 50 L44 35 Z"
              fill="url(#divineNectar)"
              filter="url(#divineGlow)"
            />
            {/* Holy light rays */}
            <path
              d="M32 45 L28 40 M32 45 L36 40 M32 45 L32 38 M32 45 L28 50 M32 45 L36 50"
              stroke="#fef9c3"
              strokeWidth="1"
              opacity="0.6"
            >
              {animated && <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite" />}
            </path>
            {/* Floating halo */}
            <ellipse cx="32" cy="55" rx="8" ry="3" fill="none" stroke="#fef9c3" strokeWidth="1.5">
              {animated && <animate attributeName="ry" values="3;4;3" dur="2s" repeatCount="indefinite" />}
            </ellipse>
            {/* Shine */}
            <path d="M24 30 L22 50" stroke="#fff" strokeWidth="3" opacity="0.4" strokeLinecap="round" />
          </svg>
        )

      case 13: // Elixir of Life
        return (
          <svg viewBox="0 0 64 80" className={cn("w-12 h-16 md:w-14 md:h-18", animated && "animate-divine")}>
            <defs>
              <linearGradient id="lifeElixir" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ade80">
                  {animated && (
                    <animate
                      attributeName="stopColor"
                      values="#4ade80;#fde047;#4ade80"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  )}
                </stop>
                <stop offset="50%" stopColor="#22c55e">
                  {animated && (
                    <animate
                      attributeName="stopColor"
                      values="#22c55e;#f59e0b;#22c55e"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  )}
                </stop>
                <stop offset="100%" stopColor="#16a34a">
                  {animated && (
                    <animate
                      attributeName="stopColor"
                      values="#16a34a;#d97706;#16a34a"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  )}
                </stop>
              </linearGradient>
              <filter id="lifeGlow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Infinity symbol stopper */}
            <path
              d="M26 6 Q28 2 32 6 Q36 2 38 6 Q36 10 32 6 Q28 10 26 6"
              fill="none"
              stroke="#ffd700"
              strokeWidth="2"
            />
            <ellipse cx="32" cy="10" rx="4" ry="2" fill="#ffd700" />
            {/* Legendary vessel */}
            <path
              d="M26 12 L24 18 Q16 28 16 50 Q16 72 32 76 Q48 72 48 50 Q48 28 40 18 L38 12 Z"
              fill="rgba(200,255,200,0.2)"
              stroke="url(#lifeElixir)"
              strokeWidth="2"
            />
            {/* Tree of life pattern */}
            <path
              d="M32 24 L32 65 M32 35 Q26 30 24 35 M32 35 Q38 30 40 35 M32 45 Q24 40 22 48 M32 45 Q40 40 42 48 M32 55 Q26 52 24 58 M32 55 Q38 52 40 58"
              fill="none"
              stroke="#ffd700"
              strokeWidth="1"
              opacity="0.5"
            />
            {/* Elixir */}
            <path d="M18 40 Q18 70 32 74 Q46 70 46 40 Z" fill="url(#lifeElixir)" filter="url(#lifeGlow)" />
            {/* Life essence orb */}
            <circle cx="32" cy="55" r="10" fill="rgba(255,255,255,0.3)">
              {animated && <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />}
            </circle>
            <circle cx="32" cy="55" r="5" fill="#fff" opacity="0.5">
              {animated && <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />}
            </circle>
            {/* Sparkle ring */}
            {animated && (
              <g>
                <circle cx="22" cy="50" r="1" fill="#fff">
                  <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
                </circle>
                <circle cx="42" cy="50" r="1" fill="#fff">
                  <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
                </circle>
                <circle cx="32" cy="40" r="1" fill="#fff">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
                </circle>
                <circle cx="32" cy="66" r="1" fill="#fff">
                  <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
                </circle>
              </g>
            )}
            {/* Shine */}
            <path d="M22 30 L20 55" stroke="#fff" strokeWidth="3" opacity="0.4" strokeLinecap="round" />
          </svg>
        )

      default:
        return (
          <svg viewBox="0 0 64 80" className="w-12 h-16">
            <rect x="26" y="8" width="12" height="6" rx="2" fill="#8b6b4a" />
            <rect x="28" y="14" width="8" height="8" fill="rgba(200,255,200,0.2)" stroke="#aaa" strokeWidth="1" />
            <ellipse cx="32" cy="50" rx="14" ry="18" fill="rgba(200,255,200,0.15)" stroke="#aaa" strokeWidth="1" />
            <ellipse cx="32" cy="52" rx="11" ry="14" fill="#4ade80" />
          </svg>
        )
    }
  }

  return (
    <div className={cn("relative flex flex-col items-center justify-center", className)}>
      {renderPotion()}
      <div className="mt-1">
        <span
          className={cn(
            "text-[10px] font-bold px-1.5 py-0.5 rounded",
            tier === "minor" && "bg-green-900 text-green-300",
            tier === "medium" && "bg-emerald-900 text-emerald-300",
            tier === "major" && "bg-teal-900 text-teal-300",
            tier === "legendary" && "bg-gradient-to-r from-yellow-700 to-green-700 text-yellow-200",
          )}
        >
          +{value} HP
        </span>
      </div>
    </div>
  )
}
