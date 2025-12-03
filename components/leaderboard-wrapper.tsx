"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft } from "lucide-react"

interface LeaderboardWrapperProps {
    children: React.ReactNode
    onBack: () => void
}

export function LeaderboardWrapper({ children, onBack }: LeaderboardWrapperProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 animate-in fade-in duration-500">
            <div className="w-full max-w-md bg-black/80 border-2 border-amber-900/50 rounded-lg p-6 shadow-2xl backdrop-blur-sm relative">
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 left-4 text-amber-500 hover:text-amber-400 hover:bg-amber-950/30"
                    onClick={onBack}
                >
                    <ArrowLeft className="h-6 w-6" />
                </Button>

                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold font-serif text-amber-500 tracking-wider">HALL OF FAME</h2>
                    <div className="h-1 w-32 bg-gradient-to-r from-transparent via-amber-700 to-transparent mx-auto mt-2" />
                </div>

                <ScrollArea className="h-[400px] w-full rounded-md border border-amber-900/30 bg-black/40 p-4">
                    {children}
                </ScrollArea>
            </div>
        </div>
    )
}
