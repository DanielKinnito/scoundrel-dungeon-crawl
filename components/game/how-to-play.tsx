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
              <span className="text-2xl">🚪</span> The Dungeon Room
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              You enter a room with <span className="text-primary font-bold">4 cards</span>. You must deal with at least{" "}
              <span className="text-primary font-bold">3 of them</span> before you can move on. The last card remaining is called the{" "}
              <span className="text-amber-400 font-bold">Leftover</span>.
            </p>
          </section>

          <section className="bg-amber-500/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-amber-500/30">
            <h2 className="text-lg font-bold text-amber-400 mb-2 flex items-center gap-2">
              <ArrowRight className="w-5 h-5" /> The Leftover Choice
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
              When only one card is left, you have a critical decision:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="font-bold text-foreground min-w-[80px]">Play It:</span>
                <span>Resolve the card now (fight monster, drink potion, etc.). Then enter a fresh room with 4 new cards.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-foreground min-w-[80px]">Keep It:</span>
                <span>Don't play it. The card <span className="text-amber-400">stays with you</span> and moves to the next room, where 3 new cards will join it.</span>
              </li>
            </ul>
            <p className="text-xs text-muted-foreground/60 mt-3 italic">
              Strategy Tip: Keep dangerous monsters for later when you might find a weapon, or save potions for when you're hurt!
            </p>
          </section>

          {/* Blood-Staining */}
          <section className="bg-red-500/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-red-500/30">
            <h2 className="text-lg font-bold text-red-400 mb-2 flex items-center gap-2">
              <Droplet className="w-5 h-5" /> Weapon Durability
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Weapons don't break, but they get dull. When you kill a monster, your weapon becomes{" "}
              <span className="text-red-400 font-bold">blood-stained</span>.
            </p>
            <div className="mt-3 p-3 bg-card/30 rounded-lg border border-border/30">
              <p className="text-sm text-foreground font-medium mb-1">The Rule:</p>
              <p className="text-xs text-muted-foreground">
                You can only kill monsters that are <span className="text-primary font-bold">weaker or equal</span> to the last monster you killed with that weapon.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-foreground font-bold">Example:</span> If you kill a <span className="text-foreground">Level 7</span> monster, your weapon can now only kill monsters Level 7 or lower. If you then kill a <span className="text-foreground">Level 3</span>, it can only kill Level 3 or lower!
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
