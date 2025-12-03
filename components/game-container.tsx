"use client"

import { useState } from "react"
import { GameScreen } from "@/components/game/game-screen"
import { MainMenu } from "@/components/game/main-menu"
import { HowToPlay } from "@/components/game/how-to-play"
import { LeaderboardWrapper } from "@/components/leaderboard-wrapper"
import { AuthButtons } from "@/components/auth-buttons"
import { Button } from "@/components/ui/button"

export type GameMode = "realistic" | "endless"
export type Screen = "menu" | "game" | "leaderboard" | "howto" | "auth"

interface GameContainerProps {
    leaderboard: React.ReactNode
}

export function GameContainer({ leaderboard }: GameContainerProps) {
    const [screen, setScreen] = useState<Screen>("menu")
    const [gameMode, setGameMode] = useState<GameMode>("realistic")

    const startGame = (mode: GameMode) => {
        setGameMode(mode)
        setScreen("game")
    }

    return (
        <>
            <div className="absolute top-4 right-4 z-50">
                <Button variant="outline" onClick={() => setScreen("auth")} className="bg-black/50 text-amber-500 border-amber-900/50 hover:bg-amber-950/30">
                    Login / Sign Up
                </Button>
            </div>

            {screen === "menu" && (
                <MainMenu
                    onStartGame={startGame}
                    onShowLeaderboard={() => setScreen("leaderboard")}
                    onShowHowTo={() => setScreen("howto")}
                />
            )}
            {screen === "game" && <GameScreen mode={gameMode} onBackToMenu={() => setScreen("menu")} />}
            {screen === "leaderboard" && (
                <LeaderboardWrapper onBack={() => setScreen("menu")}>
                    {leaderboard}
                </LeaderboardWrapper>
            )}
            {screen === "howto" && <HowToPlay onBack={() => setScreen("menu")} />}
            {screen === "auth" && (
                <div className="flex flex-col items-center justify-center min-h-screen p-4 animate-in fade-in duration-500 bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-md relative">
                        <Button
                            variant="ghost"
                            className="absolute -top-12 left-0 text-amber-500"
                            onClick={() => setScreen("menu")}
                        >
                            Back to Menu
                        </Button>
                        <AuthButtons />
                    </div>
                </div>
            )}
        </>
    )
}
