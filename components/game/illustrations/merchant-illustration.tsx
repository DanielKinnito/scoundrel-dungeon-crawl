"use client"

import { cn } from "@/lib/utils"

interface MerchantIllustrationProps {
  className?: string
  animated?: boolean
}

export function MerchantIllustration({ className, animated = true }: MerchantIllustrationProps) {
  return (
    <div className={cn("relative flex flex-col items-center justify-center", className)}>
      <div className={cn("relative", animated && "merchant-float")}>
        <svg viewBox="0 0 64 80" className="w-14 h-18 md:w-16 md:h-20">
          <defs>
            <linearGradient id="merchantCloak" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#581c87" />
              <stop offset="50%" stopColor="#3b0764" />
              <stop offset="100%" stopColor="#1e0533" />
            </linearGradient>
            <linearGradient id="merchantInner" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4c1d95" />
              <stop offset="100%" stopColor="#2e1065" />
            </linearGradient>
            <filter id="merchantGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e879f9" />
              <stop offset="100%" stopColor="#a855f7" />
            </radialGradient>
          </defs>

          {/* Mysterious aura */}
          {animated && (
            <ellipse
              cx="32"
              cy="45"
              rx="28"
              ry="35"
              fill="url(#merchantCloak)"
              opacity="0.2"
              filter="url(#merchantGlow)"
            >
              <animate attributeName="opacity" values="0.2;0.4;0.2" dur="3s" repeatCount="indefinite" />
            </ellipse>
          )}

          {/* Hood - detailed shape */}
          <path d="M16 25 Q16 8 32 6 Q48 8 48 25 L48 38 Q40 42 32 42 Q24 42 16 38 Z" fill="url(#merchantCloak)" />

          {/* Hood inner shadow */}
          <path d="M20 28 Q20 16 32 14 Q44 16 44 28 L44 36 Q38 38 32 38 Q26 38 20 36 Z" fill="#0a0412" />

          {/* Mysterious face shadow */}
          <ellipse cx="32" cy="30" rx="10" ry="8" fill="#050208" />

          {/* Glowing eyes */}
          <ellipse cx="27" cy="28" rx="3" ry="2" fill="url(#eyeGlow)" filter="url(#merchantGlow)">
            {animated && <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />}
          </ellipse>
          <ellipse cx="37" cy="28" rx="3" ry="2" fill="url(#eyeGlow)" filter="url(#merchantGlow)">
            {animated && (
              <animate
                attributeName="opacity"
                values="1;0.5;1"
                dur="2s"
                repeatCount="indefinite"
                animationDelay="0.5s"
              />
            )}
          </ellipse>

          {/* Eye pupils */}
          <ellipse cx="27" cy="28" rx="1" ry="1.5" fill="#fff" />
          <ellipse cx="37" cy="28" rx="1" ry="1.5" fill="#fff" />

          {/* Cloak body */}
          <path d="M14 38 Q10 55 14 75 L50 75 Q54 55 50 38 Q40 44 32 44 Q24 44 14 38" fill="url(#merchantCloak)" />

          {/* Cloak inner */}
          <path d="M18 42 Q16 55 18 72 L46 72 Q48 55 46 42 Q38 46 32 46 Q26 46 18 42" fill="url(#merchantInner)" />

          {/* Mysterious runes on cloak */}
          <g opacity="0.6">
            <path d="M24 55 L26 50 L28 55 L26 52" fill="none" stroke="#a855f7" strokeWidth="1">
              {animated && (
                <animate attributeName="stroke-opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
              )}
            </path>
            <path d="M36 55 L38 50 L40 55 L38 52" fill="none" stroke="#a855f7" strokeWidth="1">
              {animated && (
                <animate attributeName="stroke-opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
              )}
            </path>
            <circle cx="32" cy="58" r="3" fill="none" stroke="#a855f7" strokeWidth="1">
              {animated && <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" />}
            </circle>
          </g>

          {/* Hands holding something mystical */}
          <ellipse cx="26" cy="62" rx="4" ry="3" fill="#4c1d95" />
          <ellipse cx="38" cy="62" rx="4" ry="3" fill="#4c1d95" />

          {/* Magical orb between hands */}
          <circle cx="32" cy="64" r="5" fill="#c084fc" filter="url(#merchantGlow)">
            {animated && (
              <>
                <animate attributeName="r" values="5;6;5" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="fill" values="#c084fc;#e879f9;#c084fc" dur="2s" repeatCount="indefinite" />
              </>
            )}
          </circle>
          <circle cx="32" cy="64" r="2" fill="#faf5ff" />

          {/* Floating coins */}
          {animated && (
            <>
              <circle cx="12" cy="30" r="4" fill="#fbbf24" filter="url(#merchantGlow)">
                <animate attributeName="cy" values="30;22;30" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" />
              </circle>
              <ellipse cx="12" cy="30" rx="2" ry="3" fill="#f59e0b">
                <animate attributeName="cy" values="30;22;30" dur="2s" repeatCount="indefinite" />
              </ellipse>

              <circle cx="52" cy="35" r="3" fill="#fbbf24" filter="url(#merchantGlow)">
                <animate attributeName="cy" values="35;28;35" dur="2.3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="2.3s" repeatCount="indefinite" />
              </circle>

              <circle cx="8" cy="50" r="2.5" fill="#fbbf24" filter="url(#merchantGlow)">
                <animate attributeName="cy" values="50;44;50" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0.3;0.7" dur="1.8s" repeatCount="indefinite" />
              </circle>

              <circle cx="56" cy="48" r="3" fill="#fbbf24" filter="url(#merchantGlow)">
                <animate attributeName="cy" values="48;40;48" dur="2.1s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2.1s" repeatCount="indefinite" />
              </circle>
            </>
          )}

          {/* Sparkle effects */}
          {animated && (
            <>
              <path d="M18 20 L20 18 L18 16 L16 18 Z" fill="#e879f9">
                <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" />
              </path>
              <path d="M46 22 L48 20 L46 18 L44 20 Z" fill="#e879f9">
                <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
              </path>
            </>
          )}
        </svg>

        {/* Additional magical aura */}
        {animated && (
          <div
            className="absolute -inset-4 rounded-full blur-xl opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)",
            }}
          />
        )}
      </div>

      {/* Label */}
      <div className="mt-1">
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gradient-to-r from-purple-800 to-purple-900 text-purple-300">
          Merchant
        </span>
      </div>
    </div>
  )
}
