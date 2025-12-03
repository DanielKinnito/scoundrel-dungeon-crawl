"use client"

import { cn } from "@/lib/utils"
import { type Weapon, getWeaponTier, WEAPON_NAMES } from "@/lib/game-logic"
import { WeaponIllustration } from "./illustrations/weapon-illustration"

interface WeaponSlotProps {
  weapon: Weapon | null
  onSell?: () => void
}

export function WeaponSlot({ weapon }: WeaponSlotProps) {
  const tier = weapon ? getWeaponTier(weapon.card.value) : null

  return (
    <div
      className={cn(
        "relative rounded-xl p-3 border-2 transition-all duration-300 overflow-hidden",
        "bg-gradient-to-b from-card/80 to-card/40",
        weapon ? "border-amber-500/40" : "border-border/50",
        weapon && tier === "legendary" && "legendary-weapon border-amber-400/60",
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-12 h-14 md:w-14 md:h-16 rounded-lg flex items-center justify-center",
            weapon ? "bg-amber-500/10" : "bg-muted/50",
          )}
        >
          {weapon ? (
            <WeaponIllustration value={weapon.card.value} bloodStained={weapon.maxKillValue > 0} className="scale-75" />
          ) : (
            <div className="text-2xl text-muted-foreground opacity-30">?</div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Weapon</div>
          {weapon ? (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-sm font-bold",
                    tier === "common" && "text-slate-300",
                    tier === "uncommon" && "text-emerald-400",
                    tier === "rare" && "text-purple-400",
                    tier === "legendary" && "text-amber-400",
                  )}
                >
                  {WEAPON_NAMES[weapon.card.value]}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-amber-400">PWR {weapon.card.value}</span>
                {weapon.maxKillValue > 0 && (
                  <span className="flex items-center gap-1 text-red-400">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    Max: {weapon.maxKillValue}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No weapon</div>
          )}
        </div>
      </div>

      {/* Blood stain overlay */}
      {weapon && weapon.maxKillValue > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-red-600/40 to-transparent" />
      )}
    </div>
  )
}
