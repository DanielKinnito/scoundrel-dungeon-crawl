"use client"

import { useEffect, useState } from "react"

export function DungeonBackground() {
  const [embers, setEmbers] = useState<
    Array<{ id: number; left: number; delay: number; duration: number; size: number }>
  >([])
  const [dustParticles, setDustParticles] = useState<Array<{ id: number; left: number; top: number; delay: number }>>(
    [],
  )

  useEffect(() => {
    const newEmbers = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3,
      size: 1 + Math.random() * 2,
    }))
    setEmbers(newEmbers)

    const newDust = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 10,
    }))
    setDustParticles(newDust)
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Multi-layer dungeon gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0812] via-[#12101a] to-[#0a0608]" />

      {/* Stone wall texture overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23222' x='0' y='0' width='25' height='20' rx='2'/%3E%3Crect fill='%23282828' x='25' y='0' width='30' height='20' rx='2'/%3E%3Crect fill='%23252525' x='55' y='0' width='25' height='20' rx='2'/%3E%3Crect fill='%23202020' x='80' y='0' width='20' height='20' rx='2'/%3E%3Crect fill='%23262626' x='0' y='20' width='20' height='25' rx='2'/%3E%3Crect fill='%232a2a2a' x='20' y='20' width='25' height='25' rx='2'/%3E%3Crect fill='%23232323' x='45' y='20' width='30' height='25' rx='2'/%3E%3Crect fill='%23272727' x='75' y='20' width='25' height='25' rx='2'/%3E%3Crect fill='%23252525' x='0' y='45' width='30' height='20' rx='2'/%3E%3Crect fill='%23222' x='30' y='45' width='20' height='20' rx='2'/%3E%3Crect fill='%23282828' x='50' y='45' width='25' height='20' rx='2'/%3E%3Crect fill='%23242424' x='75' y='45' width='25' height='20' rx='2'/%3E%3Crect fill='%23262626' x='0' y='65' width='25' height='35' rx='2'/%3E%3Crect fill='%23232323' x='25' y='65' width='30' height='35' rx='2'/%3E%3Crect fill='%23292929' x='55' y='65' width='20' height='35' rx='2'/%3E%3Crect fill='%23212121' x='75' y='65' width='25' height='35' rx='2'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Dripping water effect */}
      <div
        className="absolute top-0 left-[15%] w-px h-32 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent animate-drip"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute top-0 left-[45%] w-px h-24 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent animate-drip"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-0 right-[25%] w-px h-28 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent animate-drip"
        style={{ animationDelay: "4s" }}
      />

      {/* Fog layers */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 animate-fog-1"
          style={{
            background: "radial-gradient(ellipse at 20% 80%, rgba(60, 50, 70, 0.4) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0 animate-fog-2"
          style={{
            background: "radial-gradient(ellipse at 80% 60%, rgba(50, 50, 60, 0.3) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0 animate-fog-3"
          style={{
            background: "radial-gradient(ellipse at 50% 90%, rgba(40, 40, 50, 0.4) 0%, transparent 40%)",
          }}
        />
      </div>

      {/* Enhanced torch - left */}
      <div className="absolute top-16 left-4 sm:left-8">
        <div className="relative">
          {/* Torch bracket */}
          <div className="absolute -left-2 top-2 w-4 h-8 bg-gradient-to-b from-gray-600 to-gray-800 rounded-sm" />
          {/* Torch body */}
          <div className="w-3 h-10 bg-gradient-to-t from-amber-900 via-amber-800 to-amber-700 rounded-t-sm" />
          {/* Flame layers */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-8 h-12 animate-torch-flame">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-8 bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-300 rounded-full blur-sm" />
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-6 bg-gradient-to-t from-orange-400 via-yellow-300 to-white rounded-full" />
          </div>
          {/* Light glow */}
          <div
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-2xl animate-torch-glow"
            style={{
              background:
                "radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(245, 158, 11, 0.2) 40%, transparent 70%)",
            }}
          />
        </div>
      </div>

      {/* Enhanced torch - right */}
      <div className="absolute top-16 right-4 sm:right-8">
        <div className="relative">
          <div className="absolute -right-2 top-2 w-4 h-8 bg-gradient-to-b from-gray-600 to-gray-800 rounded-sm" />
          <div className="w-3 h-10 bg-gradient-to-t from-amber-900 via-amber-800 to-amber-700 rounded-t-sm" />
          <div
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-8 h-12 animate-torch-flame"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-8 bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-300 rounded-full blur-sm" />
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-6 bg-gradient-to-t from-orange-400 via-yellow-300 to-white rounded-full" />
          </div>
          <div
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-2xl animate-torch-glow"
            style={{
              background:
                "radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(245, 158, 11, 0.2) 40%, transparent 70%)",
              animationDelay: "0.15s",
            }}
          />
        </div>
      </div>

      {/* Floating embers */}
      {embers.map((ember) => (
        <div
          key={ember.id}
          className="absolute rounded-full animate-ember-float"
          style={{
            left: `${ember.left}%`,
            bottom: "5%",
            width: `${ember.size}px`,
            height: `${ember.size}px`,
            background: `radial-gradient(circle, rgba(255, 180, 50, 0.9) 0%, rgba(255, 100, 20, 0.6) 50%, transparent 100%)`,
            animationDelay: `${ember.delay}s`,
            animationDuration: `${ember.duration}s`,
            boxShadow: "0 0 4px rgba(255, 150, 50, 0.8)",
          }}
        />
      ))}

      {/* Dust particles */}
      {dustParticles.map((dust) => (
        <div
          key={dust.id}
          className="absolute w-1 h-1 bg-gray-400/20 rounded-full animate-dust-float"
          style={{
            left: `${dust.left}%`,
            top: `${dust.top}%`,
            animationDelay: `${dust.delay}s`,
          }}
        />
      ))}

      {/* Chains - left */}
      <div className="absolute top-0 left-[12%] hidden lg:block">
        <div className="animate-chain-swing" style={{ transformOrigin: "top" }}>
          <svg width="20" height="120" viewBox="0 0 20 120">
            {[...Array(8)].map((_, i) => (
              <ellipse key={i} cx="10" cy={8 + i * 14} rx="6" ry="8" fill="none" stroke="#4a4a4a" strokeWidth="3" />
            ))}
          </svg>
        </div>
      </div>

      {/* Chains - right */}
      <div className="absolute top-0 right-[12%] hidden lg:block">
        <div className="animate-chain-swing" style={{ transformOrigin: "top", animationDelay: "1.5s" }}>
          <svg width="20" height="100" viewBox="0 0 20 100">
            {[...Array(6)].map((_, i) => (
              <ellipse key={i} cx="10" cy={8 + i * 14} rx="6" ry="8" fill="none" stroke="#4a4a4a" strokeWidth="3" />
            ))}
          </svg>
        </div>
      </div>

      {/* Cobwebs */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-20 hidden md:block">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M0 0 Q50 30 100 0" fill="none" stroke="#888" strokeWidth="0.5" />
          <path d="M0 0 Q30 50 0 100" fill="none" stroke="#888" strokeWidth="0.5" />
          <path d="M0 0 L60 60" fill="none" stroke="#888" strokeWidth="0.5" />
          <path d="M0 0 L40 70" fill="none" stroke="#888" strokeWidth="0.5" />
          <path d="M0 0 L70 40" fill="none" stroke="#888" strokeWidth="0.5" />
          <path d="M20 10 Q35 25 10 20" fill="none" stroke="#888" strokeWidth="0.3" />
          <path d="M40 20 Q55 45 20 40" fill="none" stroke="#888" strokeWidth="0.3" />
        </svg>
      </div>

      {/* Cobweb - right */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-20 hidden md:block transform scale-x-[-1]">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M0 0 Q50 30 100 0" fill="none" stroke="#888" strokeWidth="0.5" />
          <path d="M0 0 Q30 50 0 100" fill="none" stroke="#888" strokeWidth="0.5" />
          <path d="M0 0 L60 60" fill="none" stroke="#888" strokeWidth="0.5" />
          <path d="M0 0 L40 70" fill="none" stroke="#888" strokeWidth="0.5" />
          <path d="M0 0 L70 40" fill="none" stroke="#888" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Skull decorations */}
      <div className="absolute bottom-[20%] left-[3%] opacity-15 hidden lg:block animate-skull-bob">
        <svg viewBox="0 0 40 50" className="w-10 h-12">
          <ellipse cx="20" cy="18" rx="16" ry="18" fill="#d4d4b8" />
          <ellipse cx="12" cy="16" rx="5" ry="6" fill="#1a1a1a" />
          <ellipse cx="28" cy="16" rx="5" ry="6" fill="#1a1a1a" />
          <path d="M20 24 L18 30 L22 30 Z" fill="#2a2a2a" />
          <rect x="12" y="32" width="16" height="6" fill="#d4d4b8" rx="1" />
          <line x1="16" y1="32" x2="16" y2="38" stroke="#aaa" strokeWidth="0.5" />
          <line x1="20" y1="32" x2="20" y2="38" stroke="#aaa" strokeWidth="0.5" />
          <line x1="24" y1="32" x2="24" y2="38" stroke="#aaa" strokeWidth="0.5" />
        </svg>
      </div>

      <div
        className="absolute bottom-[30%] right-[5%] opacity-10 hidden lg:block animate-skull-bob"
        style={{ animationDelay: "2s" }}
      >
        <svg viewBox="0 0 40 50" className="w-8 h-10">
          <ellipse cx="20" cy="18" rx="16" ry="18" fill="#d4d4b8" />
          <ellipse cx="12" cy="16" rx="5" ry="6" fill="#1a1a1a" />
          <ellipse cx="28" cy="16" rx="5" ry="6" fill="#1a1a1a" />
          <path d="M20 24 L18 30 L22 30 Z" fill="#2a2a2a" />
          <rect x="12" y="32" width="16" height="6" fill="#d4d4b8" rx="1" />
        </svg>
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Bottom darkness */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
        }}
      />

      {/* Top shadow */}
      <div
        className="absolute top-0 left-0 right-0 h-24"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
        }}
      />
    </div>
  )
}
