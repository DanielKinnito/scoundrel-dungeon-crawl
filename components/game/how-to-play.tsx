"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, Shield, Swords, Sparkles, Droplet, CircleDot, ArrowRight } from "lucide-react"
import { DungeonBackground } from "./dungeon-background"
import { MonsterIllustration } from "./illustrations/monster-illustration"
import { PotionIllustration } from "./illustrations/potion-illustration"
import { WeaponIllustration } from "./illustrations/weapon-illustration"
import { MerchantIllustration } from "./illustrations/merchant-illustration"

interface HowToPlayProps {
  onBack: () => void
}

export function HowToPlay({ onBack }: HowToPlayProps) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <DungeonBackground />

      <div className="relative z-10 flex flex-col p-4 max-w-2xl mx-auto w-full">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6 sm:mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2 text-muted-foreground hover:text-foreground hover:bg-card/50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
          <h1 className="text-xl sm:text-3xl font-bold text-foreground">How to Play</h1>
        </header>

        {/* Rules */}
        <div className="flex-1 space-y-4 sm:space-y-6 pb-8 overflow-y-auto">
          {/* Objective */}
          <section className="bg-card/40 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-border/40">
            <h2 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
              <span className="text-2xl">🎯</span> Objective
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Survive the dungeon! In <span className="text-primary font-bold">Classic Mode</span>, clear all 54 cards
              to achieve victory. In <span className="text-accent font-bold">Endless Mode</span>, survive as long as
              possible and chase the highest score.
            </p>
          </section>

          {/* Card Types */}
          <section className="bg-card/40 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-border/40">
            <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <span className="text-2xl">🃏</span> Card Types
            </h2>
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center gap-4">
                <div className="shrink-0">
                  <PotionIllustration value={5} animated={false} className="scale-75" />
                </div>
                <div>
                  <h3 className="font-bold text-red-400 flex items-center gap-2">
                    <Heart className="w-4 h-4" /> Hearts - Potions
                  </h3>
                  <p className="text-sm text-muted-foreground">Heal HP equal to the card value. Max health is 20.</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="shrink-0">
                  <WeaponIllustration value={8} animated={false} className="scale-75" />
                </div>
                <div>
                  <h3 className="font-bold text-amber-400 flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Diamonds - Weapons
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Equip weapons to reduce damage from monsters. Higher value = more powerful!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="shrink-0">
                  <MonsterIllustration value={7} animated={false} className="scale-75" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-300 flex items-center gap-2">
                    <Swords className="w-4 h-4" /> Clubs & Spades - Monsters
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Fight or flee! Take damage equal to monster value (minus weapon power if used).
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="shrink-0">
                  <MerchantIllustration animated={false} className="scale-75" />
                </div>
                <div>
                  <h3 className="font-bold text-purple-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Jokers - Merchants
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Trade your weapon for HP! Fresh weapons give full value; bloodied weapons give less.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Room Rules */}
          <section className="bg-card/40 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-border/40">
            <h2 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
              <span className="text-2xl">🚪</span> Rooms
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Each room reveals <span className="text-primary font-bold">4 cards</span>. You must resolve{" "}
              <span className="text-primary font-bold">3 cards</span> before advancing. The 4th card becomes a{" "}
              <span className="text-amber-400 font-bold">leftover</span>.
            </p>
          </section>

          <section className="bg-amber-500/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-amber-500/30">
            <h2 className="text-lg font-bold text-amber-400 mb-2 flex items-center gap-2">
              <ArrowRight className="w-5 h-5" /> Leftover Card Choice
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              When one card remains, you have a choice: <span className="text-amber-400 font-bold">Play it</span> and
              resolve it immediately, or <span className="text-amber-400 font-bold">Continue</span> to the next room
              where 3 new cards will be drawn (the leftover is discarded).
            </p>
          </section>

          {/* Blood-Staining */}
          <section className="bg-red-500/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-red-500/30">
            <h2 className="text-lg font-bold text-red-400 mb-2 flex items-center gap-2">
              <Droplet className="w-5 h-5" /> Blood-Staining
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              When you slay a monster with a weapon, it becomes{" "}
              <span className="text-red-400 font-bold">blood-stained</span>. A bloodied weapon can only defeat monsters
              of <span className="text-primary font-bold">equal or lesser</span> power than the last monster killed.
            </p>
            <div className="mt-3 p-3 bg-card/30 rounded-lg border border-border/30">
              <p className="text-xs text-muted-foreground">
                <span className="text-foreground font-bold">Example:</span> Kill a power-7 monster → weapon now maxes at
                7. Kill a power-3 next → weapon now maxes at 3.
              </p>
            </div>
          </section>

          {/* Tips */}
          <section className="bg-primary/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-primary/30">
            <h2 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
              <span className="text-2xl">💡</span> Tips
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CircleDot className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Save potions for emergencies - you cannot exceed 20 HP.</span>
              </li>
              <li className="flex items-start gap-2">
                <CircleDot className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Use weapons on high-value monsters first, then work down.</span>
              </li>
              <li className="flex items-start gap-2">
                <CircleDot className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Sometimes taking damage is better than wasting a good weapon.</span>
              </li>
              <li className="flex items-start gap-2">
                <CircleDot className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Merchants are rare - trade wisely!</span>
              </li>
              <li className="flex items-start gap-2">
                <CircleDot className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Think carefully about leftover cards - sometimes skipping is smarter.</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
