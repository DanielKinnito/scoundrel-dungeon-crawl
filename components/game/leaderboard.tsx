"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trophy, Crown, Medal, Flame, Infinity, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { DungeonBackground } from "./dungeon-background"
import type { GameMode } from "@/app/page"

interface LeaderboardEntry {
  name: string
  score: number
  monstersSlain: number
  roomsCleared: number
  victory: boolean
  date: string
}

interface LeaderboardProps {
  onBack: () => void
}

export function Leaderboard({ onBack }: LeaderboardProps) {
  const [mode, setMode] = useState<GameMode>("realistic")
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    const key = `scoundrel-leaderboard-${mode}`
    const stored = localStorage.getItem(key)
    if (stored) {
      setEntries(JSON.parse(stored))
    } else {
      setEntries([])
    }
  }, [mode])

  const clearLeaderboard = () => {
    if (confirm(`Clear all ${mode === "realistic" ? "Classic" : "Endless"} mode scores?`)) {
      localStorage.removeItem(`scoundrel-leaderboard-${mode}`)
      setEntries([])
    }
  }

  const getRankIcon = (rank: number) => {
    if (rank === 0) return <Crown className="w-5 h-5 text-amber-400 drop-shadow-lg" />
    if (rank === 1) return <Medal className="w-5 h-5 text-slate-300 drop-shadow-lg" />
    if (rank === 2) return <Medal className="w-5 h-5 text-amber-600 drop-shadow-lg" />
    return <span className="text-muted-foreground w-5 text-center font-bold">{rank + 1}</span>
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <DungeonBackground />

      <div className="relative z-10 flex flex-col p-4 max-w-2xl mx-auto w-full min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between mb-6 sm:mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2 text-muted-foreground hover:text-foreground hover:bg-card/50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-primary drop-shadow-lg" />
            <h1 className="text-xl sm:text-3xl font-bold text-foreground">Leaderboard</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={clearLeaderboard}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </header>

        {/* Mode Toggle */}
        <div className="flex gap-2 sm:gap-3 mb-6">
          <Button
            variant={mode === "realistic" ? "default" : "outline"}
            onClick={() => setMode("realistic")}
            className={cn("flex-1 gap-2", mode !== "realistic" && "bg-card/40 border-border/50 hover:bg-card/60")}
          >
            <Flame className="w-4 h-4" />
            <span className="hidden sm:inline">Classic</span>
          </Button>
          <Button
            variant={mode === "endless" ? "default" : "outline"}
            onClick={() => setMode("endless")}
            className={cn("flex-1 gap-2", mode !== "endless" && "bg-card/40 border-border/50 hover:bg-card/60")}
          >
            <Infinity className="w-4 h-4" />
            <span className="hidden sm:inline">Endless</span>
          </Button>
        </div>

        {/* Leaderboard List */}
        <div className="flex-1 space-y-2 sm:space-y-3 pb-8 overflow-y-auto">
          {entries.length === 0 ? (
            <div className="text-center py-12 sm:py-16 bg-card/20 rounded-xl border border-border/30 backdrop-blur-sm">
              <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
              <p className="text-lg text-muted-foreground">No scores yet!</p>
              <p className="text-sm text-muted-foreground/50 mt-1">Play a game to get on the board.</p>
            </div>
          ) : (
            entries.map((entry, index) => (
              <div
                key={`${entry.name}-${entry.date}`}
                className={cn(
                  "flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border transition-all backdrop-blur-sm",
                  index === 0
                    ? "bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-amber-500/15 border-amber-500/40 shadow-lg shadow-amber-500/10"
                    : index === 1
                      ? "bg-gradient-to-r from-slate-400/10 via-slate-300/5 to-slate-400/10 border-slate-400/30"
                      : index === 2
                        ? "bg-gradient-to-r from-amber-700/10 via-amber-600/5 to-amber-700/10 border-amber-700/30"
                        : "bg-card/30 border-border/40 hover:border-primary/30 hover:bg-card/40",
                )}
              >
                <div className="w-8 flex justify-center">{getRankIcon(index)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-foreground truncate">{entry.name}</span>
                    {entry.victory && (
                      <span className="text-[10px] sm:text-xs bg-primary/20 text-primary px-1.5 sm:px-2 py-0.5 rounded-full font-bold">
                        VICTORY
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {entry.monstersSlain} slain | {entry.roomsCleared} rooms
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg sm:text-xl font-bold text-primary">{entry.score.toLocaleString()}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
