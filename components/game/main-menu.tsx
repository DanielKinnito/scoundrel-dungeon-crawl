"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Skull, Trophy, BookOpen, Flame, Infinity } from "lucide-react"
import { DungeonBackground } from "./dungeon-background"
import type { GameMode } from "@/app/page"

interface MainMenuProps {
  onStartGame: (mode: GameMode) => void
  onShowLeaderboard: () => void
  onShowHowTo: () => void
}

export function MainMenu({ onStartGame, onShowLeaderboard, onShowHowTo }: MainMenuProps) {
  const [hoveredMode, setHoveredMode] = useState<GameMode | null>(null)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <DungeonBackground />

      <div className="relative z-10 flex flex-col items-center">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12 relative">
          <div className="absolute -top-12 sm:-top-16 left-1/2 -translate-x-1/2">
            <div className="relative">
              <Skull className="w-16 h-16 sm:w-24 sm:h-24 text-primary float drop-shadow-2xl" />
              <div className="absolute inset-0 blur-xl bg-primary/30 rounded-full" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-wider text-foreground mb-2 drop-shadow-2xl">
            SCOUNDREL
          </h1>
          <div className="h-1 w-32 sm:w-48 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent mb-3" />
          <p className="text-muted-foreground text-base sm:text-lg tracking-widest uppercase">Solo Dungeon Crawl</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-6 sm:w-8 h-px bg-gradient-to-r from-transparent to-primary/60" />
            <span className="text-xs sm:text-sm text-muted-foreground italic">A game of cards and courage</span>
            <div className="w-6 sm:w-8 h-px bg-gradient-to-l from-transparent to-primary/60" />
          </div>
        </div>

        {/* Game Mode Selection */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl mb-8 px-4">
          <button
            onClick={() => onStartGame("realistic")}
            onMouseEnter={() => setHoveredMode("realistic")}
            onMouseLeave={() => setHoveredMode(null)}
            className={`group relative p-5 sm:p-6 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm ${
              hoveredMode === "realistic"
                ? "border-primary bg-primary/15 scale-[1.02]"
                : "border-border/50 bg-card/30 hover:border-primary/50"
            }`}
          >
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <div
                className={`p-3 sm:p-4 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 ${
                  hoveredMode === "realistic" ? "pulse-glow" : ""
                }`}
                style={hoveredMode === "realistic" ? { color: "var(--primary)" } : undefined}
              >
                <Flame className="w-8 h-8 sm:w-12 sm:h-12 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground">Classic Mode</h3>
              <p className="text-xs sm:text-sm text-muted-foreground text-center leading-relaxed">
                52 cards + 2 Merchants. Each card appears once. Conquer the dungeon to win!
              </p>
            </div>
            {hoveredMode === "realistic" && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-primary/15 to-transparent pointer-events-none" />
            )}
          </button>

          <button
            onClick={() => onStartGame("endless")}
            onMouseEnter={() => setHoveredMode("endless")}
            onMouseLeave={() => setHoveredMode(null)}
            className={`group relative p-5 sm:p-6 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm ${
              hoveredMode === "endless"
                ? "border-accent bg-accent/15 scale-[1.02]"
                : "border-border/50 bg-card/30 hover:border-accent/50"
            }`}
          >
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <div
                className={`p-3 sm:p-4 rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 ${
                  hoveredMode === "endless" ? "pulse-glow" : ""
                }`}
                style={hoveredMode === "endless" ? { color: "var(--accent)" } : undefined}
              >
                <Infinity className="w-8 h-8 sm:w-12 sm:h-12 text-accent" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground">Endless Mode</h3>
              <p className="text-xs sm:text-sm text-muted-foreground text-center leading-relaxed">
                Infinite cards. Survive as long as possible and chase the highest score!
              </p>
            </div>
            {hoveredMode === "endless" && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-accent/15 to-transparent pointer-events-none" />
            )}
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-4 w-full sm:w-auto">
          <Button
            variant="outline"
            size="lg"
            onClick={onShowLeaderboard}
            className="gap-2 border-border/50 hover:border-primary hover:bg-primary/10 bg-card/30 backdrop-blur-sm w-full sm:w-auto"
          >
            <Trophy className="w-5 h-5" />
            Leaderboard
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onShowHowTo}
            className="gap-2 border-border/50 hover:border-primary hover:bg-primary/10 bg-card/30 backdrop-blur-sm w-full sm:w-auto"
          >
            <BookOpen className="w-5 h-5" />
            How to Play
          </Button>
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 text-center text-xs text-muted-foreground/40">
          <p>Based on the card game by Zach Gage & Kurt Bieg</p>
        </div>
      </div>
    </div>
  )
}
