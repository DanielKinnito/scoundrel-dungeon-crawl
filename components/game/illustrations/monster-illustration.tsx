"use client"

import { cn } from "@/lib/utils"
import { getMonsterTier, MONSTER_NAMES } from "@/lib/game-logic"

interface MonsterIllustrationProps {
  value: number
  className?: string
  animated?: boolean
}

export function MonsterIllustration({ value, className, animated = true }: MonsterIllustrationProps) {
  const tier = getMonsterTier(value)
  const name = MONSTER_NAMES[value] || "Unknown"

  // Render specific monster based on value
  const renderMonster = () => {
    switch (value) {
      case 1: // Rat
        return (
          <svg viewBox="0 0 64 64" className="w-14 h-14 md:w-16 md:h-16">
            <defs>
              <radialGradient id="ratBody" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#6b5b4f" />
                <stop offset="100%" stopColor="#3d3329" />
              </radialGradient>
            </defs>
            {/* Body */}
            <ellipse cx="32" cy="38" rx="18" ry="12" fill="url(#ratBody)" />
            {/* Head */}
            <ellipse cx="48" cy="34" rx="10" ry="8" fill="url(#ratBody)" />
            {/* Snout */}
            <ellipse cx="56" cy="36" rx="5" ry="4" fill="#5a4a3e" />
            <circle cx="59" cy="35" r="2" fill="#1a1a1a" />
            {/* Eye */}
            <circle cx="50" cy="31" r="3" fill="#ff3333">
              <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="51" cy="30" r="1" fill="#fff" />
            {/* Ears */}
            <ellipse cx="44" cy="26" rx="5" ry="6" fill="#5a4a3e" />
            <ellipse cx="44" cy="26" rx="3" ry="4" fill="#8b6b5a" />
            {/* Tail */}
            <path
              d="M14 38 Q5 35 8 28 Q12 22 6 18"
              fill="none"
              stroke="#5a4a3e"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Whiskers */}
            <line x1="56" y1="34" x2="62" y2="32" stroke="#777" strokeWidth="0.5" />
            <line x1="56" y1="36" x2="62" y2="36" stroke="#777" strokeWidth="0.5" />
            <line x1="56" y1="38" x2="62" y2="40" stroke="#777" strokeWidth="0.5" />
            {/* Feet */}
            <ellipse cx="24" cy="48" rx="4" ry="2" fill="#4a3a2e" />
            <ellipse cx="38" cy="48" rx="4" ry="2" fill="#4a3a2e" />
          </svg>
        )

      case 2: // Bat
        return (
          <svg viewBox="0 0 64 64" className={cn("w-14 h-14 md:w-16 md:h-16", animated && "animate-hover")}>
            <defs>
              <linearGradient id="batWing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2d1b4e" />
                <stop offset="100%" stopColor="#1a0f2e" />
              </linearGradient>
            </defs>
            {/* Wings */}
            <path
              d="M32 32 Q15 20 5 28 Q8 22 12 20 Q6 18 2 22 Q10 12 20 18 Q16 14 18 10 Q24 16 28 20 L32 32"
              fill="url(#batWing)"
              className={animated ? "origin-right animate-flap-left" : ""}
            />
            <path
              d="M32 32 Q49 20 59 28 Q56 22 52 20 Q58 18 62 22 Q54 12 44 18 Q48 14 46 10 Q40 16 36 20 L32 32"
              fill="url(#batWing)"
              className={animated ? "origin-left animate-flap-right" : ""}
            />
            {/* Body */}
            <ellipse cx="32" cy="36" rx="8" ry="10" fill="#2d1b4e" />
            {/* Head */}
            <circle cx="32" cy="26" r="8" fill="#3d2b5e" />
            {/* Ears */}
            <path d="M24 20 L22 10 L28 18 Z" fill="#3d2b5e" />
            <path d="M40 20 L42 10 L36 18 Z" fill="#3d2b5e" />
            {/* Eyes */}
            <circle cx="28" cy="24" r="3" fill="#ff4444">
              <animate attributeName="r" values="3;2.5;3" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="36" cy="24" r="3" fill="#ff4444">
              <animate attributeName="r" values="3;2.5;3" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="29" cy="23" r="1" fill="#fff" />
            <circle cx="37" cy="23" r="1" fill="#fff" />
            {/* Fangs */}
            <path d="M29 31 L30 35 L31 31" fill="#fff" />
            <path d="M33 31 L34 35 L35 31" fill="#fff" />
          </svg>
        )

      case 3: // Spider
        return (
          <svg viewBox="0 0 64 64" className="w-14 h-14 md:w-16 md:h-16">
            <defs>
              <radialGradient id="spiderBody" cx="50%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#2a2a2a" />
                <stop offset="100%" stopColor="#0f0f0f" />
              </radialGradient>
            </defs>
            {/* Legs */}
            {[
              "M24 32 Q10 20 4 24",
              "M22 36 Q8 32 2 38",
              "M22 40 Q8 44 4 52",
              "M24 44 Q14 52 8 58",
              "M40 32 Q54 20 60 24",
              "M42 36 Q56 32 62 38",
              "M42 40 Q56 44 60 52",
              "M40 44 Q50 52 56 58",
            ].map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="2.5"
                strokeLinecap="round"
                className={animated ? "origin-center" : ""}
                style={
                  animated
                    ? {
                        animation: `spider-leg 0.5s ease-in-out infinite`,
                        animationDelay: `${i * 0.05}s`,
                      }
                    : {}
                }
              />
            ))}
            {/* Abdomen */}
            <ellipse cx="32" cy="44" rx="12" ry="10" fill="url(#spiderBody)" />
            {/* Red markings */}
            <ellipse cx="32" cy="42" rx="4" ry="6" fill="#8b0000" opacity="0.8" />
            {/* Cephalothorax */}
            <ellipse cx="32" cy="32" rx="10" ry="8" fill="url(#spiderBody)" />
            {/* Eyes - 8 of them */}
            <circle cx="28" cy="28" r="2.5" fill="#660000" />
            <circle cx="36" cy="28" r="2.5" fill="#660000" />
            <circle cx="26" cy="32" r="1.5" fill="#440000" />
            <circle cx="38" cy="32" r="1.5" fill="#440000" />
            <circle cx="30" cy="26" r="1" fill="#330000" />
            <circle cx="34" cy="26" r="1" fill="#330000" />
            <circle cx="29" cy="34" r="1" fill="#330000" />
            <circle cx="35" cy="34" r="1" fill="#330000" />
            {/* Eye shine */}
            <circle cx="28" cy="27" r="1" fill="#ff6666">
              <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="36" cy="27" r="1" fill="#ff6666">
              <animate
                attributeName="opacity"
                values="0.8;0.4;0.8"
                dur="2s"
                repeatCount="indefinite"
                animationDelay="0.5s"
              />
            </circle>
            {/* Fangs */}
            <path d="M30 36 Q28 40 30 42" fill="none" stroke="#333" strokeWidth="2" />
            <path d="M34 36 Q36 40 34 42" fill="none" stroke="#333" strokeWidth="2" />
          </svg>
        )

      case 4: // Skeleton
        return (
          <svg viewBox="0 0 64 64" className="w-14 h-14 md:w-16 md:h-16">
            <defs>
              <linearGradient id="bone" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f5f5dc" />
                <stop offset="50%" stopColor="#e8e8d0" />
                <stop offset="100%" stopColor="#d4d4b8" />
              </linearGradient>
            </defs>
            {/* Skull */}
            <ellipse cx="32" cy="18" rx="12" ry="14" fill="url(#bone)" />
            {/* Eye sockets */}
            <ellipse cx="27" cy="16" rx="4" ry="5" fill="#1a0a0a" />
            <ellipse cx="37" cy="16" rx="4" ry="5" fill="#1a0a0a" />
            {/* Glowing eyes */}
            <circle cx="27" cy="16" r="2" fill="#ff3300">
              <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="37" cy="16" r="2" fill="#ff3300">
              <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
            </circle>
            {/* Nose hole */}
            <path d="M32 20 L30 24 L34 24 Z" fill="#2a1a1a" />
            {/* Teeth */}
            <rect x="26" y="26" width="12" height="4" fill="url(#bone)" rx="1" />
            <line x1="28" y1="26" x2="28" y2="30" stroke="#999" strokeWidth="0.5" />
            <line x1="30" y1="26" x2="30" y2="30" stroke="#999" strokeWidth="0.5" />
            <line x1="32" y1="26" x2="32" y2="30" stroke="#999" strokeWidth="0.5" />
            <line x1="34" y1="26" x2="34" y2="30" stroke="#999" strokeWidth="0.5" />
            <line x1="36" y1="26" x2="36" y2="30" stroke="#999" strokeWidth="0.5" />
            {/* Spine */}
            <rect x="30" y="30" width="4" height="4" fill="url(#bone)" rx="1" />
            <rect x="30" y="35" width="4" height="4" fill="url(#bone)" rx="1" />
            <rect x="30" y="40" width="4" height="4" fill="url(#bone)" rx="1" />
            {/* Ribcage */}
            <path d="M26 32 Q20 36 22 42" fill="none" stroke="url(#bone)" strokeWidth="2" />
            <path d="M26 36 Q22 40 24 44" fill="none" stroke="url(#bone)" strokeWidth="2" />
            <path d="M38 32 Q44 36 42 42" fill="none" stroke="url(#bone)" strokeWidth="2" />
            <path d="M38 36 Q42 40 40 44" fill="none" stroke="url(#bone)" strokeWidth="2" />
            {/* Arms */}
            <line x1="22" y1="34" x2="12" y2="44" stroke="url(#bone)" strokeWidth="3" strokeLinecap="round" />
            <line x1="12" y1="44" x2="8" y2="52" stroke="url(#bone)" strokeWidth="2" strokeLinecap="round" />
            <line x1="42" y1="34" x2="52" y2="44" stroke="url(#bone)" strokeWidth="3" strokeLinecap="round" />
            <line x1="52" y1="44" x2="56" y2="52" stroke="url(#bone)" strokeWidth="2" strokeLinecap="round" />
            {/* Pelvis */}
            <ellipse cx="32" cy="48" rx="8" ry="4" fill="url(#bone)" />
            {/* Legs */}
            <line x1="26" y1="50" x2="22" y2="62" stroke="url(#bone)" strokeWidth="3" strokeLinecap="round" />
            <line x1="38" y1="50" x2="42" y2="62" stroke="url(#bone)" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )

      case 5: // Zombie
        return (
          <svg viewBox="0 0 64 64" className="w-14 h-14 md:w-16 md:h-16">
            <defs>
              <linearGradient id="zombieSkin" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7a9a6a" />
                <stop offset="100%" stopColor="#4a6a3a" />
              </linearGradient>
              <linearGradient id="zombieClothes" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3a3a2a" />
                <stop offset="100%" stopColor="#2a2a1a" />
              </linearGradient>
            </defs>
            {/* Tattered clothes */}
            <path d="M20 35 L18 58 L28 56 L32 60 L36 56 L46 58 L44 35 Z" fill="url(#zombieClothes)" />
            <path d="M20 56 L18 58 L22 58" fill="none" stroke="#2a2a1a" strokeWidth="1" />
            <path d="M44 56 L46 58 L42 58" fill="none" stroke="#2a2a1a" strokeWidth="1" />
            {/* Head */}
            <ellipse cx="32" cy="22" rx="12" ry="14" fill="url(#zombieSkin)" />
            {/* Exposed skull */}
            <path d="M24 14 Q28 10 36 12" fill="#e8e8d0" />
            {/* Wounds */}
            <path d="M38 18 L42 16 L40 20 L44 18" fill="none" stroke="#8b0000" strokeWidth="1" />
            <ellipse cx="26" cy="28" rx="2" ry="1" fill="#5a0000" />
            {/* Eyes */}
            <ellipse cx="27" cy="20" rx="4" ry="3" fill="#2a2a1a" />
            <ellipse cx="37" cy="20" rx="4" ry="3" fill="#2a2a1a" />
            <circle cx="27" cy="20" r="2" fill="#aaffaa">
              <animate attributeName="opacity" values="1;0.6;1" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="37" cy="20" r="2" fill="#aaffaa">
              <animate attributeName="opacity" values="1;0.6;1" dur="3s" repeatCount="indefinite" />
            </circle>
            {/* Nose */}
            <ellipse cx="32" cy="24" rx="2" ry="2" fill="#5a7a4a" />
            {/* Mouth with teeth */}
            <path d="M26 30 Q32 34 38 30" fill="#3a1a1a" />
            <rect x="28" y="29" width="2" height="3" fill="#ddd" />
            <rect x="32" y="30" width="2" height="2" fill="#ddd" />
            <rect x="35" y="29" width="2" height="3" fill="#ddd" />
            {/* Arms */}
            <path d="M20 36 Q14 42 10 54" fill="none" stroke="url(#zombieSkin)" strokeWidth="5" strokeLinecap="round" />
            <path d="M44 36 Q50 42 54 54" fill="none" stroke="url(#zombieSkin)" strokeWidth="5" strokeLinecap="round" />
            {/* Exposed bone on arm */}
            <ellipse cx="12" cy="50" rx="2" ry="3" fill="#e8e8d0" />
          </svg>
        )

      case 6: // Ghoul
        return (
          <svg viewBox="0 0 64 64" className="w-14 h-14 md:w-16 md:h-16">
            <defs>
              <linearGradient id="ghoulBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4a4a6a" />
                <stop offset="100%" stopColor="#2a2a3a" />
              </linearGradient>
            </defs>
            {/* Hunched body */}
            <ellipse cx="32" cy="42" rx="14" ry="16" fill="url(#ghoulBody)" />
            {/* Long arms */}
            <path
              d="M18 38 Q8 44 6 56 Q4 60 8 62"
              fill="none"
              stroke="url(#ghoulBody)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M46 38 Q56 44 58 56 Q60 60 56 62"
              fill="none"
              stroke="url(#ghoulBody)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Claws */}
            <path d="M6 62 L4 58" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 62 L8 58" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
            <path d="M10 62 L12 58" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
            <path d="M58 62 L60 58" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
            <path d="M56 62 L56 58" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
            <path d="M54 62 L52 58" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
            {/* Head */}
            <ellipse cx="32" cy="24" rx="10" ry="12" fill="url(#ghoulBody)" />
            {/* Sunken eyes */}
            <ellipse cx="27" cy="22" rx="4" ry="5" fill="#1a1a2a" />
            <ellipse cx="37" cy="22" rx="4" ry="5" fill="#1a1a2a" />
            <circle cx="27" cy="22" r="2" fill="#ffff00">
              <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="37" cy="22" r="2" fill="#ffff00">
              <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Sharp teeth mouth */}
            <path d="M26 32 L32 36 L38 32" fill="#1a1a1a" />
            <path d="M27 32 L28 35" stroke="#fff" strokeWidth="1" />
            <path d="M30 33 L30 36" stroke="#fff" strokeWidth="1" />
            <path d="M34 33 L34 36" stroke="#fff" strokeWidth="1" />
            <path d="M37 32 L36 35" stroke="#fff" strokeWidth="1" />
            {/* Pointed ears */}
            <path d="M22 18 L18 8 L26 16 Z" fill="url(#ghoulBody)" />
            <path d="M42 18 L46 8 L38 16 Z" fill="url(#ghoulBody)" />
          </svg>
        )

      case 7: // Wraith
        return (
          <svg viewBox="0 0 64 64" className={cn("w-14 h-14 md:w-16 md:h-16", animated && "animate-float")}>
            <defs>
              <linearGradient id="wraithBody" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#4a4a6a" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#1a1a2a" stopOpacity="0.3" />
              </linearGradient>
              <filter id="wraithGlow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Ethereal body */}
            <path
              d="M32 10 Q20 20 18 35 Q16 50 20 60 Q24 64 28 60 Q26 55 30 58 Q32 62 34 58 Q38 55 36 60 Q40 64 44 60 Q48 50 46 35 Q44 20 32 10"
              fill="url(#wraithBody)"
              filter="url(#wraithGlow)"
            />
            {/* Hood shadow */}
            <ellipse cx="32" cy="22" rx="10" ry="8" fill="#0a0a1a" opacity="0.8" />
            {/* Glowing eyes */}
            <ellipse cx="28" cy="22" rx="3" ry="4" fill="#00ffff" filter="url(#wraithGlow)">
              <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="36" cy="22" rx="3" ry="4" fill="#00ffff" filter="url(#wraithGlow)">
              <animate
                attributeName="opacity"
                values="1;0.5;1"
                dur="2s"
                repeatCount="indefinite"
                animationDelay="0.5s"
              />
            </ellipse>
            {/* Trailing wisps */}
            <path d="M24 50 Q18 55 20 62" fill="none" stroke="#3a3a5a" strokeWidth="2" opacity="0.5">
              <animate
                attributeName="d"
                values="M24 50 Q18 55 20 62;M24 50 Q16 56 22 62;M24 50 Q18 55 20 62"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>
            <path d="M40 50 Q46 55 44 62" fill="none" stroke="#3a3a5a" strokeWidth="2" opacity="0.5">
              <animate
                attributeName="d"
                values="M40 50 Q46 55 44 62;M40 50 Q48 56 42 62;M40 50 Q46 55 44 62"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>
            {/* Ghostly hands */}
            <path
              d="M18 35 Q10 38 8 42 Q6 44 10 46"
              fill="none"
              stroke="url(#wraithBody)"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M46 35 Q54 38 56 42 Q58 44 54 46"
              fill="none"
              stroke="url(#wraithBody)"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.7"
            />
          </svg>
        )

      case 8: // Orc
        return (
          <svg viewBox="0 0 64 64" className="w-14 h-14 md:w-16 md:h-16">
            <defs>
              <linearGradient id="orcSkin" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5a8a4a" />
                <stop offset="100%" stopColor="#3a5a2a" />
              </linearGradient>
              <linearGradient id="orcArmor" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5a5a5a" />
                <stop offset="100%" stopColor="#3a3a3a" />
              </linearGradient>
            </defs>
            {/* Armor body */}
            <path d="M18 32 L16 58 L48 58 L46 32 Q32 28 18 32" fill="url(#orcArmor)" />
            {/* Armor details */}
            <line x1="32" y1="32" x2="32" y2="58" stroke="#2a2a2a" strokeWidth="2" />
            <ellipse cx="32" cy="40" rx="6" ry="4" fill="#4a4a2a" stroke="#6a6a4a" strokeWidth="1" />
            {/* Head */}
            <ellipse cx="32" cy="22" rx="14" ry="12" fill="url(#orcSkin)" />
            {/* Brow ridge */}
            <path d="M20 18 Q32 14 44 18" fill="#4a7a3a" />
            {/* Angry eyes */}
            <ellipse cx="26" cy="20" rx="4" ry="3" fill="#1a1a1a" />
            <ellipse cx="38" cy="20" rx="4" ry="3" fill="#1a1a1a" />
            <circle cx="26" cy="20" r="2" fill="#ff4400" />
            <circle cx="38" cy="20" r="2" fill="#ff4400" />
            {/* Nose */}
            <ellipse cx="32" cy="24" rx="3" ry="2" fill="#4a7a3a" />
            <circle cx="30" cy="25" r="1" fill="#2a4a2a" />
            <circle cx="34" cy="25" r="1" fill="#2a4a2a" />
            {/* Tusks and mouth */}
            <path d="M24 30 Q32 34 40 30" fill="#2a1a1a" />
            <path d="M24 28 Q22 24 24 22" fill="none" stroke="#f5f5dc" strokeWidth="3" strokeLinecap="round" />
            <path d="M40 28 Q42 24 40 22" fill="none" stroke="#f5f5dc" strokeWidth="3" strokeLinecap="round" />
            {/* Ears */}
            <ellipse cx="16" cy="20" rx="3" ry="5" fill="url(#orcSkin)" />
            <ellipse cx="48" cy="20" rx="3" ry="5" fill="url(#orcSkin)" />
            {/* Shoulder armor */}
            <ellipse cx="16" cy="36" rx="6" ry="4" fill="url(#orcArmor)" />
            <ellipse cx="48" cy="36" rx="6" ry="4" fill="url(#orcArmor)" />
            {/* Spikes */}
            <path d="M12 34 L10 28 L14 32" fill="#4a4a4a" />
            <path d="M52 34 L54 28 L50 32" fill="#4a4a4a" />
          </svg>
        )

      case 9: // Troll
        return (
          <svg viewBox="0 0 64 64" className="w-14 h-14 md:w-16 md:h-16">
            <defs>
              <linearGradient id="trollSkin" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6a7a5a" />
                <stop offset="100%" stopColor="#4a5a3a" />
              </linearGradient>
            </defs>
            {/* Massive body */}
            <ellipse cx="32" cy="44" rx="20" ry="18" fill="url(#trollSkin)" />
            {/* Arms */}
            <path d="M12 40 Q4 50 6 60" fill="none" stroke="url(#trollSkin)" strokeWidth="10" strokeLinecap="round" />
            <path d="M52 40 Q60 50 58 60" fill="none" stroke="url(#trollSkin)" strokeWidth="10" strokeLinecap="round" />
            {/* Claws */}
            <path d="M4 60 L2 56" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 62 L6 58" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 60 L10 56" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round" />
            <path d="M60 60 L62 56" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round" />
            <path d="M58 62 L58 58" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round" />
            <path d="M56 60 L54 56" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round" />
            {/* Small head */}
            <ellipse cx="32" cy="20" rx="10" ry="10" fill="url(#trollSkin)" />
            {/* Warts */}
            <circle cx="24" cy="18" r="2" fill="#5a6a4a" />
            <circle cx="38" cy="22" r="1.5" fill="#5a6a4a" />
            <circle cx="28" cy="26" r="1" fill="#5a6a4a" />
            {/* Tiny eyes */}
            <circle cx="28" cy="18" r="2" fill="#1a1a1a" />
            <circle cx="36" cy="18" r="2" fill="#1a1a1a" />
            <circle cx="28" cy="17" r="1" fill="#ffaa00" />
            <circle cx="36" cy="17" r="1" fill="#ffaa00" />
            {/* Big nose */}
            <ellipse cx="32" cy="22" rx="4" ry="3" fill="#5a6a4a" />
            {/* Wide mouth */}
            <path d="M24 28 Q32 34 40 28" fill="#2a1a1a" />
            <rect x="26" y="27" width="3" height="4" fill="#ddd" />
            <rect x="35" y="27" width="3" height="4" fill="#ddd" />
            {/* Ears */}
            <ellipse cx="20" cy="18" rx="4" ry="6" fill="url(#trollSkin)" />
            <ellipse cx="44" cy="18" rx="4" ry="6" fill="url(#trollSkin)" />
          </svg>
        )

      case 10: // Ogre
        return (
          <svg viewBox="0 0 64 64" className="w-14 h-14 md:w-16 md:h-16">
            <defs>
              <linearGradient id="ogreSkin" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8a7a6a" />
                <stop offset="100%" stopColor="#5a4a3a" />
              </linearGradient>
              <linearGradient id="ogreClub" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6a5a4a" />
                <stop offset="100%" stopColor="#4a3a2a" />
              </linearGradient>
            </defs>
            {/* Loincloth */}
            <path d="M22 40 L20 58 L44 58 L42 40 Z" fill="#4a3a2a" />
            {/* Fat belly */}
            <ellipse cx="32" cy="40" rx="16" ry="14" fill="url(#ogreSkin)" />
            {/* Belly button */}
            <ellipse cx="32" cy="42" rx="2" ry="3" fill="#6a5a4a" />
            {/* Head */}
            <ellipse cx="32" cy="18" rx="12" ry="12" fill="url(#ogreSkin)" />
            {/* Single horn */}
            <path d="M32 6 L30 14 L34 14 Z" fill="#5a5a4a" />
            {/* Angry eyebrows */}
            <path d="M22 14 L30 16" stroke="#4a3a2a" strokeWidth="2" />
            <path d="M42 14 L34 16" stroke="#4a3a2a" strokeWidth="2" />
            {/* Eyes */}
            <circle cx="27" cy="18" r="3" fill="#ffff00" />
            <circle cx="37" cy="18" r="3" fill="#ffff00" />
            <circle cx="27" cy="18" r="1.5" fill="#1a1a1a" />
            <circle cx="37" cy="18" r="1.5" fill="#1a1a1a" />
            {/* Nose */}
            <ellipse cx="32" cy="22" rx="3" ry="2" fill="#7a6a5a" />
            {/* Underbite */}
            <path d="M26 28 Q32 26 38 28" fill="#7a6a5a" />
            <path d="M26 26 L28 30" stroke="#f5f5dc" strokeWidth="2" strokeLinecap="round" />
            <path d="M38 26 L36 30" stroke="#f5f5dc" strokeWidth="2" strokeLinecap="round" />
            {/* Ears */}
            <ellipse cx="18" cy="18" rx="4" ry="5" fill="url(#ogreSkin)" />
            <ellipse cx="46" cy="18" rx="4" ry="5" fill="url(#ogreSkin)" />
            {/* Arms with club */}
            <path d="M12 34 Q6 44 4 54" fill="none" stroke="url(#ogreSkin)" strokeWidth="8" strokeLinecap="round" />
            <path d="M52 34 Q58 40 56 48" fill="none" stroke="url(#ogreSkin)" strokeWidth="8" strokeLinecap="round" />
            {/* Club */}
            <ellipse cx="60" cy="52" rx="6" ry="10" fill="url(#ogreClub)" transform="rotate(-20 60 52)" />
            <rect x="54" y="44" width="4" height="10" fill="#5a4a3a" transform="rotate(-20 56 49)" />
            {/* Spikes on club */}
            <circle cx="58" cy="48" r="2" fill="#3a3a3a" />
            <circle cx="62" cy="54" r="2" fill="#3a3a3a" />
          </svg>
        )

      case 11: // Dark Knight
        return (
          <svg viewBox="0 0 64 64" className="w-14 h-14 md:w-16 md:h-16">
            <defs>
              <linearGradient id="darkArmor" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3a3a4a" />
                <stop offset="100%" stopColor="#1a1a2a" />
              </linearGradient>
              <linearGradient id="darkCape" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4a1a2a" />
                <stop offset="100%" stopColor="#2a0a1a" />
              </linearGradient>
            </defs>
            {/* Cape */}
            <path d="M16 24 Q8 40 12 62 L52 62 Q56 40 48 24 Z" fill="url(#darkCape)" />
            {/* Armor body */}
            <path d="M20 28 L18 54 L46 54 L44 28 Q32 24 20 28" fill="url(#darkArmor)" />
            {/* Chest emblem */}
            <path d="M28 36 L32 32 L36 36 L32 44 Z" fill="#8a1a2a" />
            {/* Helmet */}
            <path d="M20 24 Q20 8 32 6 Q44 8 44 24 L44 28 Q32 32 20 28 Z" fill="url(#darkArmor)" />
            {/* Helmet visor */}
            <path d="M24 18 L40 18 L38 24 L26 24 Z" fill="#0a0a1a" />
            {/* Glowing eyes through visor */}
            <ellipse cx="28" cy="20" rx="2" ry="1.5" fill="#ff0000">
              <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="36" cy="20" rx="2" ry="1.5" fill="#ff0000">
              <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
            </ellipse>
            {/* Helmet crest */}
            <path d="M32 6 L32 2 L28 6" fill="#4a1a2a" />
            <path d="M32 6 L32 2 L36 6" fill="#4a1a2a" />
            {/* Shoulder pauldrons */}
            <ellipse cx="16" cy="30" rx="6" ry="5" fill="url(#darkArmor)" />
            <ellipse cx="48" cy="30" rx="6" ry="5" fill="url(#darkArmor)" />
            {/* Spikes on shoulders */}
            <path d="M14 26 L12 20" stroke="#2a2a3a" strokeWidth="2" strokeLinecap="round" />
            <path d="M50 26 L52 20" stroke="#2a2a3a" strokeWidth="2" strokeLinecap="round" />
            {/* Arms */}
            <path d="M12 34 Q8 44 10 54" fill="none" stroke="url(#darkArmor)" strokeWidth="6" strokeLinecap="round" />
            <path d="M52 34 Q56 44 54 54" fill="none" stroke="url(#darkArmor)" strokeWidth="6" strokeLinecap="round" />
            {/* Sword */}
            <rect x="56" y="30" width="3" height="28" fill="#6a6a7a" />
            <rect x="54" y="54" width="7" height="3" fill="#4a4a5a" />
            <path d="M57.5 30 L56 26 L59 26 Z" fill="#6a6a7a" />
          </svg>
        )

      case 12: // Vampire Queen
        return (
          <svg viewBox="0 0 64 64" className="w-14 h-14 md:w-16 md:h-16">
            <defs>
              <linearGradient id="vampireSkin" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e8d8d8" />
                <stop offset="100%" stopColor="#c8b8b8" />
              </linearGradient>
              <linearGradient id="vampireDress" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6a1a3a" />
                <stop offset="100%" stopColor="#3a0a1a" />
              </linearGradient>
              <linearGradient id="vampireHair" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2a1a2a" />
                <stop offset="100%" stopColor="#1a0a1a" />
              </linearGradient>
            </defs>
            {/* Flowing dress */}
            <path d="M20 32 Q12 50 8 62 L56 62 Q52 50 44 32 Z" fill="url(#vampireDress)" />
            {/* Dress details */}
            <path d="M20 40 Q32 44 44 40" fill="none" stroke="#8a2a4a" strokeWidth="1" />
            <path d="M16 50 Q32 54 48 50" fill="none" stroke="#8a2a4a" strokeWidth="1" />
            {/* Body */}
            <path d="M24 28 L22 38 L42 38 L40 28 Z" fill="url(#vampireDress)" />
            {/* Necklace */}
            <path d="M26 28 Q32 32 38 28" fill="none" stroke="#ffd700" strokeWidth="1" />
            <circle cx="32" cy="30" r="2" fill="#ff0000" />
            {/* Head */}
            <ellipse cx="32" cy="18" rx="10" ry="12" fill="url(#vampireSkin)" />
            {/* Hair */}
            <path d="M22 18 Q20 6 32 4 Q44 6 42 18" fill="url(#vampireHair)" />
            <path d="M20 18 Q18 28 16 36" fill="url(#vampireHair)" />
            <path d="M44 18 Q46 28 48 36" fill="url(#vampireHair)" />
            {/* Crown */}
            <path
              d="M24 6 L26 2 L28 6 L30 0 L32 6 L34 0 L36 6 L38 2 L40 6"
              fill="none"
              stroke="#ffd700"
              strokeWidth="1.5"
            />
            <circle cx="32" cy="2" r="1.5" fill="#ff0000" />
            {/* Eyes */}
            <ellipse cx="28" cy="16" rx="3" ry="2" fill="#ffffff" />
            <ellipse cx="36" cy="16" rx="3" ry="2" fill="#ffffff" />
            <ellipse cx="28" cy="16" rx="1.5" ry="2" fill="#ff0000">
              <animate attributeName="fill" values="#ff0000;#aa0000;#ff0000" dur="3s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="36" cy="16" rx="1.5" ry="2" fill="#ff0000">
              <animate attributeName="fill" values="#ff0000;#aa0000;#ff0000" dur="3s" repeatCount="indefinite" />
            </ellipse>
            {/* Eyebrows */}
            <path d="M24 13 Q28 12 30 14" fill="none" stroke="#2a1a2a" strokeWidth="0.5" />
            <path d="M40 13 Q36 12 34 14" fill="none" stroke="#2a1a2a" strokeWidth="0.5" />
            {/* Nose */}
            <path d="M32 18 L31 21 L33 21" fill="none" stroke="#c8a8a8" strokeWidth="0.5" />
            {/* Lips with fangs */}
            <path d="M28 24 Q32 26 36 24" fill="#aa3a4a" />
            <path d="M29 23 L30 26" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
            <path d="M35 23 L34 26" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
            {/* Arms */}
            <path
              d="M22 32 Q14 38 12 46"
              fill="none"
              stroke="url(#vampireSkin)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M42 32 Q50 38 52 46"
              fill="none"
              stroke="url(#vampireSkin)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Clawed hands */}
            <path d="M10 46 L8 50" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round" />
            <path d="M12 48 L12 52" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round" />
            <path d="M54 46 L56 50" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round" />
            <path d="M52 48 L52 52" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round" />
          </svg>
        )

      case 13: // Dragon Lord
        return (
          <svg viewBox="0 0 64 64" className={cn("w-14 h-14 md:w-16 md:h-16", animated && "animate-pulse-slow")}>
            <defs>
              <linearGradient id="dragonScale" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8a2a1a" />
                <stop offset="50%" stopColor="#5a1a0a" />
                <stop offset="100%" stopColor="#3a0a00" />
              </linearGradient>
              <linearGradient id="dragonBelly" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#daa520" />
                <stop offset="100%" stopColor="#8a6a10" />
              </linearGradient>
              <filter id="dragonGlow">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Wings */}
            <path d="M8 20 Q4 12 8 6 Q12 10 16 8 Q14 14 20 16 Q16 20 12 24 Z" fill="url(#dragonScale)" opacity="0.9" />
            <path
              d="M56 20 Q60 12 56 6 Q52 10 48 8 Q50 14 44 16 Q48 20 52 24 Z"
              fill="url(#dragonScale)"
              opacity="0.9"
            />
            {/* Body */}
            <ellipse cx="32" cy="42" rx="16" ry="14" fill="url(#dragonScale)" />
            {/* Belly scales */}
            <ellipse cx="32" cy="44" rx="10" ry="10" fill="url(#dragonBelly)" />
            <path d="M26 38 L38 38 M24 44 L40 44 M26 50 L38 50" stroke="#6a5a10" strokeWidth="0.5" />
            {/* Neck */}
            <path d="M28 30 Q30 24 32 20 Q34 24 36 30" fill="url(#dragonScale)" />
            {/* Head */}
            <ellipse cx="32" cy="16" rx="10" ry="8" fill="url(#dragonScale)" />
            {/* Snout */}
            <ellipse cx="32" cy="22" rx="6" ry="4" fill="url(#dragonScale)" />
            {/* Nostrils with smoke */}
            <circle cx="30" cy="22" r="1" fill="#1a0a00" />
            <circle cx="34" cy="22" r="1" fill="#1a0a00" />
            <path d="M29 20 Q28 18 30 16" fill="none" stroke="#666" strokeWidth="0.5" opacity="0.5">
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
            </path>
            {/* Eyes */}
            <ellipse cx="27" cy="14" rx="3" ry="2.5" fill="#ffaa00" filter="url(#dragonGlow)">
              <animate attributeName="fill" values="#ffaa00;#ff6600;#ffaa00" dur="2s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="37" cy="14" rx="3" ry="2.5" fill="#ffaa00" filter="url(#dragonGlow)">
              <animate attributeName="fill" values="#ffaa00;#ff6600;#ffaa00" dur="2s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="27" cy="14" rx="1" ry="2" fill="#1a0a00" />
            <ellipse cx="37" cy="14" rx="1" ry="2" fill="#1a0a00" />
            {/* Horns */}
            <path d="M22 10 Q18 4 22 2" fill="none" stroke="#4a3a2a" strokeWidth="3" strokeLinecap="round" />
            <path d="M42 10 Q46 4 42 2" fill="none" stroke="#4a3a2a" strokeWidth="3" strokeLinecap="round" />
            {/* Crown */}
            <path d="M26 8 L28 4 L30 8 L32 2 L34 8 L36 4 L38 8" fill="#ffd700" />
            <circle cx="32" cy="4" r="1.5" fill="#ff0000" />
            {/* Spikes down back */}
            <path d="M32 26 L30 22 L34 22 Z" fill="#6a1a0a" />
            <path d="M32 32 L30 28 L34 28 Z" fill="#6a1a0a" />
            {/* Arms/front legs */}
            <path d="M18 38 Q10 42 8 50" fill="none" stroke="url(#dragonScale)" strokeWidth="6" strokeLinecap="round" />
            <path
              d="M46 38 Q54 42 56 50"
              fill="none"
              stroke="url(#dragonScale)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Claws */}
            <path d="M6 50 L4 54" stroke="#2a2a2a" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 52 L8 56" stroke="#2a2a2a" strokeWidth="2" strokeLinecap="round" />
            <path d="M10 50 L12 54" stroke="#2a2a2a" strokeWidth="2" strokeLinecap="round" />
            <path d="M58 50 L60 54" stroke="#2a2a2a" strokeWidth="2" strokeLinecap="round" />
            <path d="M56 52 L56 56" stroke="#2a2a2a" strokeWidth="2" strokeLinecap="round" />
            <path d="M54 50 L52 54" stroke="#2a2a2a" strokeWidth="2" strokeLinecap="round" />
            {/* Tail */}
            <path
              d="M32 56 Q40 58 48 54 Q54 50 58 54"
              fill="none"
              stroke="url(#dragonScale)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path d="M58 52 L62 50 L60 56 Z" fill="#5a1a0a" />
            {/* Fire breath glow */}
            <circle cx="32" cy="26" r="4" fill="#ff6600" opacity="0.3" filter="url(#dragonGlow)">
              <animate attributeName="r" values="4;6;4" dur="1s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.5;0.3" dur="1s" repeatCount="indefinite" />
            </circle>
          </svg>
        )

      default:
        // Generic monster fallback
        return (
          <div
            className={cn(
              "relative w-16 h-16 md:w-20 md:h-20 rounded-lg",
              "bg-gradient-to-br from-slate-600 to-slate-800",
              "shadow-lg shadow-slate-500/30",
              animated && "monster-breath",
            )}
          >
            <div className="absolute top-3 left-2 w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/80" />
            <div className="absolute top-3 right-2 w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/80" />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-black rounded-b-lg" />
          </div>
        )
    }
  }

  return (
    <div className={cn("relative flex flex-col items-center justify-center", className)}>
      {renderMonster()}
      <div className="mt-1">
        <span
          className={cn(
            "text-[10px] font-bold px-1.5 py-0.5 rounded",
            tier === "weak" && "bg-slate-700 text-slate-300",
            tier === "medium" && "bg-red-900 text-red-300",
            tier === "strong" && "bg-purple-900 text-purple-300",
            tier === "boss" && "bg-gradient-to-r from-amber-700 to-red-700 text-amber-200",
          )}
        >
          {name}
        </span>
      </div>
    </div>
  )
}
