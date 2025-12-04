"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DungeonBackground } from "@/components/game/dungeon-background"

interface LeaderboardWrapperProps {
    children?: React.ReactNode
    realistic: React.ReactNode
    endless: React.ReactNode
    onBack: () => void
}

export function LeaderboardWrapper({ realistic, endless, onBack }: LeaderboardWrapperProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <DungeonBackground />

            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
                <div className="flex items-center justify-between w-full mb-8">
                    <Button
                        variant="ghost"
                        onClick={onBack}
                        className="gap-2 text-amber-500 hover:text-amber-400 hover:bg-amber-950/30"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Menu
                    </Button>
                    <h1 className="text-3xl font-bold text-amber-500 tracking-widest drop-shadow-lg">HALL OF FAME</h1>
                    <div className="w-24" /> {/* Spacer for centering */}
                </div>

                <Tabs defaultValue="realistic" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-black/40 border border-amber-900/30">
                        <TabsTrigger value="realistic" className="data-[state=active]:bg-amber-900/40 data-[state=active]:text-amber-500">Classic Mode</TabsTrigger>
                        <TabsTrigger value="endless" className="data-[state=active]:bg-amber-900/40 data-[state=active]:text-amber-500">Endless Mode</TabsTrigger>
                    </TabsList>
                    <TabsContent value="realistic" className="mt-6">
                        <div className="bg-black/60 backdrop-blur-md border border-amber-900/30 rounded-xl p-6 shadow-2xl min-h-[400px]">
                            {realistic}
                        </div>
                    </TabsContent>
                    <TabsContent value="endless" className="mt-6">
                        <div className="bg-black/60 backdrop-blur-md border border-amber-900/30 rounded-xl p-6 shadow-2xl min-h-[400px]">
                            {endless}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
