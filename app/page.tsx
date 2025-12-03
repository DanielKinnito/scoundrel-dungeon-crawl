import { Leaderboard } from "@/components/leaderboard"
import { GameContainer } from "@/components/game-container"

export const dynamic = "force-dynamic"

export default async function Home() {
  return (
    <main className="min-h-screen dungeon-bg stone-texture overflow-hidden">
      {/* Ambient torch effects */}
      <div className="fixed top-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl torch-flicker pointer-events-none" />
      <div
        className="fixed top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl torch-flicker pointer-events-none"
        style={{ animationDelay: "0.15s" }}
      />
      <div
        className="fixed bottom-0 left-1/4 w-24 h-24 bg-amber-600/5 rounded-full blur-2xl torch-flicker pointer-events-none"
        style={{ animationDelay: "0.3s" }}
      />
      <div
        className="fixed bottom-0 right-1/4 w-24 h-24 bg-amber-600/5 rounded-full blur-2xl torch-flicker pointer-events-none"
        style={{ animationDelay: "0.45s" }}
      />

      <GameContainer leaderboard={<Leaderboard />} />
    </main>
  )
}
