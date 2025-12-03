"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Trophy, Skull, RotateCcw, Home, Share2 } from "lucide-react"
import type { GameMode } from "@/app/page"

interface GameOverModalProps {
  isOpen: boolean
  victory: boolean
  score: number
  monstersSlain: number
  roomsCleared: number
  mode: GameMode
  onRestart: () => void
  onMainMenu: () => void
}

export function GameOverModal({
  isOpen,
  victory,
  score,
  monstersSlain,
  roomsCleared,
  mode,
  onRestart,
  onMainMenu,
}: GameOverModalProps) {
  const [playerName, setPlayerName] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmitScore = () => {
    if (!playerName.trim()) return

    const key = `scoundrel-leaderboard-${mode}`
    const existing = localStorage.getItem(key)
    const leaderboard = existing ? JSON.parse(existing) : []

    leaderboard.push({
      name: playerName.trim(),
      score,
      monstersSlain,
      roomsCleared,
      victory,
      date: new Date().toISOString(),
    })

    leaderboard.sort((a: { score: number }, b: { score: number }) => b.score - a.score)
    leaderboard.splice(100)

    localStorage.setItem(key, JSON.stringify(leaderboard))
    setSubmitted(true)
  }

  const handleShare = async () => {
    const text = `SCOUNDREL (${mode === "realistic" ? "Classic" : "Endless"} Mode)\n${victory ? "VICTORY!" : "Defeated"}\n\nScore: ${score}\nMonsters Slain: ${monstersSlain}\nRooms Cleared: ${roomsCleared}\n\nPlay at: ${window.location.href}`

    if (navigator.share) {
      try {
        await navigator.share({ text })
      } catch (e) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(text)
      alert("Results copied to clipboard!")
    }
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-card/95 backdrop-blur-lg border-border/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-3 text-2xl sm:text-3xl">
            {victory ? (
              <>
                <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-primary victory-pulse" />
                <span className="text-primary">VICTORY!</span>
                <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-primary victory-pulse" />
              </>
            ) : (
              <>
                <Skull className="w-8 h-8 sm:w-10 sm:h-10 text-destructive" />
                <span className="text-destructive">DEFEATED</span>
                <Skull className="w-8 h-8 sm:w-10 sm:h-10 text-destructive" />
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
            <div className="bg-gradient-to-b from-muted/50 to-muted/20 rounded-xl p-3 sm:p-4 border border-border/30">
              <div className="text-xl sm:text-2xl font-bold text-primary">{score}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Score</div>
            </div>
            <div className="bg-gradient-to-b from-muted/50 to-muted/20 rounded-xl p-3 sm:p-4 border border-border/30">
              <div className="text-xl sm:text-2xl font-bold text-foreground">{monstersSlain}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Slain</div>
            </div>
            <div className="bg-gradient-to-b from-muted/50 to-muted/20 rounded-xl p-3 sm:p-4 border border-border/30">
              <div className="text-xl sm:text-2xl font-bold text-foreground">{roomsCleared}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Rooms</div>
            </div>
          </div>

          {/* Submit Score */}
          {!submitted ? (
            <div className="space-y-3">
              <p className="text-sm text-center text-muted-foreground">Enter your name to save your score!</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Your name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  maxLength={20}
                  className="bg-input/50 border-border/50"
                  onKeyDown={(e) => e.key === "Enter" && handleSubmitScore()}
                />
                <Button onClick={handleSubmitScore} disabled={!playerName.trim()}>
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-center text-green-400">Score saved to leaderboard!</p>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button onClick={handleShare} variant="outline" className="gap-2 bg-card/50">
              <Share2 className="w-4 h-4" />
              Share Results
            </Button>
            <div className="flex gap-2">
              <Button onClick={onRestart} className="flex-1 gap-2">
                <RotateCcw className="w-4 h-4" />
                Play Again
              </Button>
              <Button onClick={onMainMenu} variant="outline" className="flex-1 gap-2 bg-card/50">
                <Home className="w-4 h-4" />
                Menu
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
