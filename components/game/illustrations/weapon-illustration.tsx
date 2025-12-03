"use client"

import { cn } from "@/lib/utils"
import { getWeaponTier, WEAPON_NAMES } from "@/lib/game-logic"

interface WeaponIllustrationProps {
  value: number
  className?: string
  animated?: boolean
  bloodStained?: boolean
}

export function WeaponIllustration({
  value,
  className,
  animated = true,
  bloodStained = false,
}: WeaponIllustrationProps) {
  const tier = getWeaponTier(value)
  const name = WEAPON_NAMES[value] || "Weapon"

  const renderWeapon = () => {
    switch (value) {
      case 1: // Rusty Dagger
        return (
          <svg viewBox="0 0 64 64" className="w-12 h-16 md:w-14 md:h-20">
            <defs>
              <linearGradient id="rustyBlade" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8a7a6a" />
                <stop offset="30%" stopColor="#6a5a4a" />
                <stop offset="100%" stopColor="#5a4a3a" />
              </linearGradient>
            </defs>
            {/* Blade */}
            <path d="M32 8 L28 38 L32 40 L36 38 Z" fill="url(#rustyBlade)" />
            {/* Rust spots */}
            <circle cx="30" cy="20" r="2" fill="#5a3a2a" opacity="0.6" />
            <circle cx="34" cy="30" r="1.5" fill="#4a2a1a" opacity="0.5" />
            {bloodStained && <ellipse cx="31" cy="25" rx="3" ry="5" fill="#8b0000" opacity="0.5" />}
            {/* Guard */}
            <rect x="26" y="38" width="12" height="3" rx="1" fill="#6a5a4a" />
            {/* Handle */}
            <rect x="30" y="41" width="4" height="12" fill="#4a3a2a" />
            {/* Pommel */}
            <circle cx="32" cy="55" r="3" fill="#5a4a3a" />
          </svg>
        )

      case 2: // Short Sword
        return (
          <svg viewBox="0 0 64 64" className="w-12 h-16 md:w-14 md:h-20">
            <defs>
              <linearGradient id="steelBlade2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a0a0a0" />
                <stop offset="50%" stopColor="#e0e0e0" />
                <stop offset="100%" stopColor="#a0a0a0" />
              </linearGradient>
            </defs>
            {/* Blade */}
            <path d="M32 6 L27 36 L32 38 L37 36 Z" fill="url(#steelBlade2)" />
            <line x1="32" y1="10" x2="32" y2="34" stroke="#fff" strokeWidth="1" opacity="0.4" />
            {bloodStained && (
              <path d="M30 20 Q28 28 31 32" fill="none" stroke="#8b0000" strokeWidth="2" opacity="0.6" />
            )}
            {/* Guard */}
            <rect x="24" y="36" width="16" height="4" rx="1" fill="#8a7a5a" />
            <rect x="26" y="37" width="12" height="2" fill="#a08a6a" />
            {/* Handle */}
            <rect x="29" y="40" width="6" height="14" fill="#5a4030" />
            <line x1="29" y1="44" x2="35" y2="44" stroke="#3a2a1a" strokeWidth="1" />
            <line x1="29" y1="48" x2="35" y2="48" stroke="#3a2a1a" strokeWidth="1" />
            {/* Pommel */}
            <ellipse cx="32" cy="56" rx="4" ry="3" fill="#8a7a5a" />
          </svg>
        )

      case 3: // Battle Axe
        return (
          <svg viewBox="0 0 64 64" className="w-14 h-18 md:w-16 md:h-22">
            <defs>
              <linearGradient id="axeBlade" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#707070" />
                <stop offset="50%" stopColor="#c0c0c0" />
                <stop offset="100%" stopColor="#707070" />
              </linearGradient>
            </defs>
            {/* Handle */}
            <rect x="30" y="8" width="4" height="48" fill="#6a5040" />
            <line x1="30" y1="20" x2="34" y2="20" stroke="#4a3020" strokeWidth="1" />
            <line x1="30" y1="30" x2="34" y2="30" stroke="#4a3020" strokeWidth="1" />
            <line x1="30" y1="40" x2="34" y2="40" stroke="#4a3020" strokeWidth="1" />
            {/* Axe head */}
            <path d="M34 12 Q50 16 52 24 Q50 32 34 36 L34 12" fill="url(#axeBlade)" />
            <path d="M36 14 Q46 18 48 24 Q46 30 36 34" fill="none" stroke="#e0e0e0" strokeWidth="1" opacity="0.5" />
            {bloodStained && (
              <path d="M40 18 Q44 24 40 30" fill="none" stroke="#8b0000" strokeWidth="3" opacity="0.5" />
            )}
            {/* Pommel */}
            <ellipse cx="32" cy="58" rx="4" ry="3" fill="#5a4a3a" />
          </svg>
        )

      case 4: // Warhammer
        return (
          <svg viewBox="0 0 64 64" className="w-14 h-18 md:w-16 md:h-22">
            <defs>
              <linearGradient id="hammerHead" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6a6a6a" />
                <stop offset="50%" stopColor="#9a9a9a" />
                <stop offset="100%" stopColor="#5a5a5a" />
              </linearGradient>
            </defs>
            {/* Handle */}
            <rect x="30" y="24" width="4" height="34" fill="#5a4535" />
            <rect x="29" y="30" width="6" height="2" fill="#4a3525" />
            <rect x="29" y="40" width="6" height="2" fill="#4a3525" />
            {/* Hammer head */}
            <rect x="18" y="10" width="28" height="16" rx="2" fill="url(#hammerHead)" />
            <rect x="20" y="12" width="24" height="12" fill="#7a7a7a" />
            {/* Spike on back */}
            <path d="M18 14 L10 18 L18 22 Z" fill="#8a8a8a" />
            {bloodStained && <ellipse cx="38" cy="18" rx="4" ry="3" fill="#8b0000" opacity="0.5" />}
            {/* Decorative band */}
            <rect x="28" y="24" width="8" height="4" fill="#8a7a5a" />
            {/* Pommel */}
            <ellipse cx="32" cy="60" rx="5" ry="3" fill="#6a5a4a" />
          </svg>
        )

      case 5: // Longsword
        return (
          <svg viewBox="0 0 64 64" className="w-12 h-20 md:w-14 md:h-24">
            <defs>
              <linearGradient id="steelBlade5" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#b0b0b0" />
                <stop offset="50%" stopColor="#f0f0f0" />
                <stop offset="100%" stopColor="#b0b0b0" />
              </linearGradient>
            </defs>
            {/* Blade */}
            <path d="M32 4 L26 42 L32 44 L38 42 Z" fill="url(#steelBlade5)" />
            <line x1="32" y1="8" x2="32" y2="40" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
            {bloodStained && (
              <path d="M29 15 Q26 25 30 35" fill="none" stroke="#8b0000" strokeWidth="2" opacity="0.6" />
            )}
            {/* Fuller (groove) */}
            <line x1="32" y1="10" x2="32" y2="38" stroke="#8a8a8a" strokeWidth="2" />
            {/* Guard */}
            <rect x="20" y="42" width="24" height="4" rx="1" fill="#c0a060" />
            <rect x="22" y="43" width="20" height="2" fill="#d4b070" />
            {/* Handle */}
            <rect x="29" y="46" width="6" height="12" fill="#4a3020" />
            <rect x="28" y="48" width="8" height="1" fill="#3a2010" />
            <rect x="28" y="52" width="8" height="1" fill="#3a2010" />
            {/* Pommel */}
            <ellipse cx="32" cy="60" rx="5" ry="3" fill="#c0a060" />
            <circle cx="32" cy="60" r="2" fill="#d4b070" />
          </svg>
        )

      case 6: // Claymore
        return (
          <svg viewBox="0 0 64 64" className="w-14 h-22 md:w-16 md:h-26">
            <defs>
              <linearGradient id="claymoreBlade" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a8a8a8" />
                <stop offset="50%" stopColor="#e8e8e8" />
                <stop offset="100%" stopColor="#a8a8a8" />
              </linearGradient>
            </defs>
            {/* Large blade */}
            <path d="M32 2 L24 40 L32 44 L40 40 Z" fill="url(#claymoreBlade)" />
            <line x1="32" y1="6" x2="32" y2="40" stroke="#fff" strokeWidth="2" opacity="0.4" />
            {bloodStained && (
              <path d="M28 12 Q24 24 29 36" fill="none" stroke="#8b0000" strokeWidth="3" opacity="0.5" />
            )}
            {/* Cross guard - Scottish style */}
            <path d="M16 40 Q20 38 24 42 L40 42 Q44 38 48 40 Q44 44 40 44 L24 44 Q20 44 16 40" fill="#7a6a4a" />
            {/* Handle - long for two hands */}
            <rect x="29" y="44" width="6" height="16" fill="#5a4030" />
            <rect x="28" y="48" width="8" height="1" fill="#3a2010" />
            <rect x="28" y="52" width="8" height="1" fill="#3a2010" />
            <rect x="28" y="56" width="8" height="1" fill="#3a2010" />
            {/* Pommel */}
            <circle cx="32" cy="62" r="4" fill="#7a6a4a" />
            <circle cx="32" cy="62" r="2" fill="#9a8a6a" />
          </svg>
        )

      case 7: // Enchanted Blade
        return (
          <svg viewBox="0 0 64 64" className={cn("w-12 h-20 md:w-14 md:h-24", animated && "animate-glow-pulse")}>
            <defs>
              <linearGradient id="enchantedBlade" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4080ff" />
                <stop offset="50%" stopColor="#80c0ff" />
                <stop offset="100%" stopColor="#4080ff" />
              </linearGradient>
              <filter id="blueGlow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Glowing blade */}
            <path d="M32 4 L26 40 L32 44 L38 40 Z" fill="url(#enchantedBlade)" filter="url(#blueGlow)" />
            {/* Runes */}
            <circle cx="32" cy="14" r="2" fill="#fff">
              <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="32" cy="24" r="2" fill="#fff">
              <animate
                attributeName="opacity"
                values="1;0.5;1"
                dur="1.5s"
                repeatCount="indefinite"
                animationDelay="0.5s"
              />
            </circle>
            <circle cx="32" cy="34" r="2" fill="#fff">
              <animate
                attributeName="opacity"
                values="1;0.5;1"
                dur="1.5s"
                repeatCount="indefinite"
                animationDelay="1s"
              />
            </circle>
            {bloodStained && (
              <path d="M29 18 Q26 28 30 38" fill="none" stroke="#8b0000" strokeWidth="2" opacity="0.6" />
            )}
            {/* Guard */}
            <rect x="20" y="42" width="24" height="4" rx="1" fill="#304080" />
            <rect x="22" y="43" width="20" height="2" fill="#4060a0" />
            {/* Handle */}
            <rect x="29" y="46" width="6" height="12" fill="#203060" />
            {/* Pommel with gem */}
            <ellipse cx="32" cy="60" rx="5" ry="3" fill="#304080" />
            <circle cx="32" cy="60" r="2" fill="#80c0ff">
              <animate attributeName="fill" values="#80c0ff;#4080ff;#80c0ff" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        )

      case 8: // Demon Slayer
        return (
          <svg viewBox="0 0 64 64" className={cn("w-14 h-22 md:w-16 md:h-26", animated && "animate-flame")}>
            <defs>
              <linearGradient id="demonBlade" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2a2a2a" />
                <stop offset="50%" stopColor="#4a4a4a" />
                <stop offset="100%" stopColor="#2a2a2a" />
              </linearGradient>
              <linearGradient id="demonEdge" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff4400" />
                <stop offset="100%" stopColor="#ff8800" />
              </linearGradient>
            </defs>
            {/* Dark blade */}
            <path d="M32 2 L24 42 L32 46 L40 42 Z" fill="url(#demonBlade)" />
            {/* Burning edge */}
            <path d="M32 4 L26 40" fill="none" stroke="url(#demonEdge)" strokeWidth="2">
              <animate attributeName="stroke-opacity" values="1;0.6;1" dur="0.5s" repeatCount="indefinite" />
            </path>
            <path d="M32 4 L38 40" fill="none" stroke="url(#demonEdge)" strokeWidth="2">
              <animate attributeName="stroke-opacity" values="1;0.6;1" dur="0.5s" repeatCount="indefinite" />
            </path>
            {/* Demon runes */}
            <path d="M30 15 L32 12 L34 15 L32 18 Z" fill="#ff4400">
              <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
            </path>
            <path d="M30 28 L32 25 L34 28 L32 31 Z" fill="#ff4400">
              <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
            </path>
            {bloodStained && <ellipse cx="30" cy="35" rx="3" ry="5" fill="#550000" opacity="0.7" />}
            {/* Guard with horns */}
            <path d="M18 44 L20 38 L24 44 L40 44 L44 38 L46 44 L46 48 L18 48 Z" fill="#3a2a2a" />
            {/* Handle */}
            <rect x="28" y="48" width="8" height="12" fill="#2a1a1a" />
            <path d="M28 52 L36 52" stroke="#ff4400" strokeWidth="1" />
            {/* Demon pommel */}
            <ellipse cx="32" cy="62" rx="6" ry="3" fill="#3a2a2a" />
            <circle cx="32" cy="62" r="2" fill="#ff4400">
              <animate attributeName="fill" values="#ff4400;#ff8800;#ff4400" dur="1s" repeatCount="indefinite" />
            </circle>
          </svg>
        )

      case 9: // Dragon Tooth
        return (
          <svg viewBox="0 0 64 64" className={cn("w-14 h-22 md:w-16 md:h-26", animated && "animate-glow-pulse")}>
            <defs>
              <linearGradient id="toothBlade" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f5f5dc" />
                <stop offset="50%" stopColor="#e8e8c8" />
                <stop offset="100%" stopColor="#d4d4b4" />
              </linearGradient>
            </defs>
            {/* Tooth/bone blade - curved */}
            <path d="M32 2 Q24 20 26 42 L32 46 L38 42 Q40 20 32 2" fill="url(#toothBlade)" />
            {/* Vein lines */}
            <path d="M30 10 Q28 25 30 38" fill="none" stroke="#c8c8a8" strokeWidth="1" />
            <path d="M34 10 Q36 25 34 38" fill="none" stroke="#c8c8a8" strokeWidth="1" />
            {bloodStained && (
              <path d="M31 15 Q28 28 32 40" fill="none" stroke="#8b0000" strokeWidth="2" opacity="0.5" />
            )}
            {/* Dragon scale guard */}
            <ellipse cx="32" cy="46" rx="10" ry="4" fill="#8a2a1a" />
            <ellipse cx="32" cy="45" rx="8" ry="3" fill="#aa4a2a" />
            {/* Handle wrapped in dragon hide */}
            <rect x="29" y="48" width="6" height="10" fill="#6a3a2a" />
            <path d="M29 50 L35 50 M29 53 L35 53 M29 56 L35 56" stroke="#5a2a1a" strokeWidth="1" />
            {/* Claw pommel */}
            <path d="M28 58 Q26 62 28 64 L32 60 L36 64 Q38 62 36 58 Z" fill="#8a7a6a" />
          </svg>
        )

      case 10: // Excalibur
        return (
          <svg viewBox="0 0 64 64" className={cn("w-14 h-24 md:w-16 md:h-28", animated && "animate-holy-glow")}>
            <defs>
              <linearGradient id="holyBlade" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d0d0d0" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#d0d0d0" />
              </linearGradient>
              <filter id="holyGlow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Holy aura */}
            <ellipse cx="32" cy="24" rx="12" ry="20" fill="#ffd700" opacity="0.2" filter="url(#holyGlow)">
              <animate attributeName="opacity" values="0.2;0.4;0.2" dur="2s" repeatCount="indefinite" />
            </ellipse>
            {/* Pristine blade */}
            <path d="M32 2 L25 40 L32 44 L39 40 Z" fill="url(#holyBlade)" filter="url(#holyGlow)" />
            <line x1="32" y1="6" x2="32" y2="40" stroke="#ffd700" strokeWidth="2" opacity="0.6" />
            {/* No blood on holy blade */}
            {/* Golden cross guard */}
            <rect x="18" y="42" width="28" height="5" rx="1" fill="#ffd700" />
            <rect x="20" y="43" width="24" height="3" fill="#ffe44d" />
            {/* Royal handle */}
            <rect x="28" y="47" width="8" height="12" fill="#4a3080" />
            <rect x="27" y="50" width="10" height="1" fill="#ffd700" />
            <rect x="27" y="54" width="10" height="1" fill="#ffd700" />
            {/* Crown pommel */}
            <ellipse cx="32" cy="61" rx="6" ry="3" fill="#ffd700" />
            <path d="M26 60 L28 56 L30 60 L32 54 L34 60 L36 56 L38 60" fill="#ffd700" />
            <circle cx="32" cy="56" r="2" fill="#4080ff" />
          </svg>
        )

      case 11: // Soul Reaper
        return (
          <svg viewBox="0 0 64 64" className={cn("w-16 h-24 md:w-18 md:h-28", animated && "animate-soul-drain")}>
            <defs>
              <linearGradient id="soulBlade" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1a0a2a" />
                <stop offset="50%" stopColor="#3a1a4a" />
                <stop offset="100%" stopColor="#1a0a2a" />
              </linearGradient>
              <filter id="soulGlow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Scythe blade */}
            <path d="M20 4 Q10 8 8 20 Q10 24 20 20 L32 16 L32 12 Z" fill="url(#soulBlade)" />
            <path d="M18 8 Q12 12 12 18" fill="none" stroke="#6a2a8a" strokeWidth="1" />
            {/* Soul wisps */}
            <circle cx="14" cy="14" r="2" fill="#aa6aff" opacity="0.6" filter="url(#soulGlow)">
              <animate attributeName="cy" values="14;10;14" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Staff */}
            <rect x="30" y="12" width="4" height="46" fill="#2a1a3a" />
            <path d="M30 20 L34 20 M30 30 L34 30 M30 40 L34 40 M30 50 L34 50" stroke="#4a2a5a" strokeWidth="1" />
            {/* Skull decoration */}
            <ellipse cx="32" cy="24" rx="4" ry="5" fill="#e8e8d8" />
            <circle cx="30" cy="23" r="1.5" fill="#1a0a2a" />
            <circle cx="34" cy="23" r="1.5" fill="#1a0a2a" />
            <path d="M30 27 L32 26 L34 27" fill="#1a0a2a" />
            {/* Pommel */}
            <ellipse cx="32" cy="60" rx="4" ry="3" fill="#3a1a4a" />
            <circle cx="32" cy="60" r="2" fill="#aa6aff">
              <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        )

      case 12: // Chaos Blade
        return (
          <svg viewBox="0 0 64 64" className={cn("w-14 h-24 md:w-16 md:h-28", animated && "animate-chaos")}>
            <defs>
              <linearGradient id="chaosBlade" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff0040">
                  <animate
                    attributeName="stopColor"
                    values="#ff0040;#8000ff;#00ffff;#ff0040"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#8000ff">
                  <animate
                    attributeName="stopColor"
                    values="#8000ff;#00ffff;#ff0040;#8000ff"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
              <filter id="chaosGlow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Jagged chaotic blade */}
            <path
              d="M32 2 L28 10 L24 8 L26 18 L22 20 L26 30 L24 32 L28 40 L32 44 L36 40 L40 32 L38 30 L42 20 L38 18 L40 8 L36 10 Z"
              fill="url(#chaosBlade)"
              filter="url(#chaosGlow)"
            />
            {/* Chaos symbol */}
            <circle cx="32" cy="22" r="3" fill="none" stroke="#fff" strokeWidth="1">
              <animate attributeName="r" values="3;4;3" dur="1s" repeatCount="indefinite" />
            </circle>
            <path d="M32 19 L32 25 M29 22 L35 22" stroke="#fff" strokeWidth="1" />
            {/* Void guard */}
            <ellipse cx="32" cy="46" rx="12" ry="4" fill="#1a0a1a" />
            <ellipse cx="32" cy="45" rx="10" ry="3" fill="#2a1a2a" />
            {/* Corrupted handle */}
            <rect x="29" y="48" width="6" height="10" fill="#2a0a2a" />
            {/* Eye pommel */}
            <ellipse cx="32" cy="60" rx="5" ry="4" fill="#1a0a1a" />
            <ellipse cx="32" cy="60" rx="3" ry="3" fill="#ff0040">
              <animate
                attributeName="fill"
                values="#ff0040;#8000ff;#00ffff;#ff0040"
                dur="2s"
                repeatCount="indefinite"
              />
            </ellipse>
            <ellipse cx="32" cy="60" rx="1" ry="2" fill="#000" />
          </svg>
        )

      case 13: // Godslayer
        return (
          <svg viewBox="0 0 64 64" className={cn("w-16 h-26 md:w-18 md:h-30", animated && "animate-divine")}>
            <defs>
              <linearGradient id="godBlade" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffd700" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#ffd700" />
              </linearGradient>
              <linearGradient id="cosmicEdge" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="50%" stopColor="#ff00ff" />
                <stop offset="100%" stopColor="#ffff00" />
              </linearGradient>
              <filter id="divineGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Divine aura */}
            <ellipse cx="32" cy="20" rx="16" ry="24" fill="url(#cosmicEdge)" opacity="0.15" filter="url(#divineGlow)">
              <animate attributeName="opacity" values="0.15;0.3;0.15" dur="2s" repeatCount="indefinite" />
            </ellipse>
            {/* Cosmic blade */}
            <path d="M32 0 L24 40 L32 46 L40 40 Z" fill="url(#godBlade)" filter="url(#divineGlow)" />
            {/* Starlight edge */}
            <path d="M32 2 L26 38" fill="none" stroke="url(#cosmicEdge)" strokeWidth="1" />
            <path d="M32 2 L38 38" fill="none" stroke="url(#cosmicEdge)" strokeWidth="1" />
            {/* Constellation pattern */}
            <circle cx="30" cy="12" r="1" fill="#fff" />
            <circle cx="34" cy="18" r="1" fill="#fff" />
            <circle cx="30" cy="26" r="1" fill="#fff" />
            <circle cx="34" cy="32" r="1" fill="#fff" />
            <line x1="30" y1="12" x2="34" y2="18" stroke="#fff" strokeWidth="0.5" opacity="0.5" />
            <line x1="34" y1="18" x2="30" y2="26" stroke="#fff" strokeWidth="0.5" opacity="0.5" />
            <line x1="30" y1="26" x2="34" y2="32" stroke="#fff" strokeWidth="0.5" opacity="0.5" />
            {/* Wings guard */}
            <path d="M14 44 Q18 40 24 44 L40 44 Q46 40 50 44 Q46 48 40 46 L24 46 Q18 48 14 44" fill="#ffd700" />
            {/* Ethereal handle */}
            <rect x="28" y="46" width="8" height="12" fill="#3a2a6a" />
            <path d="M28 50 L36 50" stroke="#ffd700" strokeWidth="1" />
            <path d="M28 54 L36 54" stroke="#ffd700" strokeWidth="1" />
            {/* Infinity pommel */}
            <ellipse cx="32" cy="60" rx="6" ry="4" fill="#2a1a4a" />
            <path
              d="M28 60 Q30 58 32 60 Q34 62 36 60 Q34 58 32 60 Q30 62 28 60"
              fill="none"
              stroke="#ffd700"
              strokeWidth="1.5"
            >
              <animate
                attributeName="stroke"
                values="#ffd700;#ff00ff;#00ffff;#ffd700"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        )

      default:
        return (
          <svg viewBox="0 0 64 64" className="w-12 h-16">
            <rect x="30" y="8" width="4" height="30" fill="#9a9a9a" />
            <rect x="26" y="38" width="12" height="3" fill="#6a5a4a" />
            <rect x="29" y="41" width="6" height="10" fill="#5a4a3a" />
            <circle cx="32" cy="53" r="3" fill="#6a5a4a" />
          </svg>
        )
    }
  }

  return (
    <div className={cn("relative flex flex-col items-center justify-center", className)}>
      {renderWeapon()}
      <div className="mt-1">
        <span
          className={cn(
            "text-[10px] font-bold px-1.5 py-0.5 rounded",
            tier === "common" && "bg-slate-700 text-slate-300",
            tier === "uncommon" && "bg-emerald-900 text-emerald-300",
            tier === "rare" && "bg-blue-900 text-blue-300",
            tier === "legendary" && "bg-gradient-to-r from-amber-600 to-yellow-500 text-amber-100",
          )}
        >
          {name}
        </span>
      </div>
    </div>
  )
}
