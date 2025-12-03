"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, Skull, Sparkles, Home, ArrowRight, Play } from "lucide-react"
import { PlayingCard } from "./playing-card"
import { HealthBar } from "./health-bar"
import { WeaponSlot } from "./weapon-slot"
import { GameOverModal } from "./game-over-modal"
import { ActionLog } from "./action-log"
import { RoomProgress } from "./room-progress"
import { DungeonBackground } from "./dungeon-background"
import {
  initializeGame,
  getRandomCard,
  isMonster,
  isPotion,
  isWeaponCard,
  isMerchant,
  calculateDamage,
  canUseWeapon,
  getWeaponSellValue,
  calculateScore,
  MONSTER_NAMES,
  WEAPON_NAMES,
  POTION_NAMES,
  type GameState,
  type Card,
} from "@/lib/game-logic"

interface GameScreenProps {
  mode: "realistic" | "endless"
  onBackToMenu: () => void
}

export function GameScreen({ mode, onBackToMenu }: GameScreenProps) {
  const [gameState, setGameState] = useState<GameState>(() => initializeGame(mode))
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [showGameOver, setShowGameOver] = useState(false)
  const [slashingCard, setSlashingCard] = useState<string | null>(null)

  const drawRoom = useCallback(
    (keepLeftover = false, leftoverToKeep?: Card | null) => {
      setGameState((prev) => {
        if (prev.gameOver) return prev

        const newDeck = [...prev.deck]
        const newRoom: Card[] = []

        if (keepLeftover && leftoverToKeep) {
          newRoom.push(leftoverToKeep)
        }

        const cardsNeeded = 4 - newRoom.length

        if (mode === "realistic") {
          for (let i = 0; i < cardsNeeded && newDeck.length > 0; i++) {
            const card = newDeck.pop()!
            card.isRevealed = true
            newRoom.push(card)
          }

          if (newDeck.length === 0 && newRoom.length === 0) {
            return {
              ...prev,
              deck: newDeck,
              room: newRoom,
              leftoverCard: null,
              gameOver: true,
              victory: true,
              lastAction: "VICTORY! You've conquered the dungeon!",
              score: calculateScore({ ...prev, victory: true }),
              awaitingLeftoverDecision: false,
            }
          }
        } else {
          for (let i = 0; i < cardsNeeded; i++) {
            newRoom.push(getRandomCard())
          }
        }

        return {
          ...prev,
          deck: newDeck,
          room: newRoom,
          leftoverCard: null,
          cardsResolved: keepLeftover && leftoverToKeep ? 1 : 0, // If we kept leftover, we've already resolved that card's "placement"
          roomsCleared:
            prev.room.length > 0 || prev.awaitingLeftoverDecision ? prev.roomsCleared + 1 : prev.roomsCleared,
          lastAction: "You venture deeper into the dungeon...",
          actionAnimation: null,
          awaitingLeftoverDecision: false,
        }
      })
    },
    [mode],
  )

  // Initialize first room
  useEffect(() => {
    if (gameState.room.length === 0 && !gameState.gameOver && !gameState.awaitingLeftoverDecision) {
      drawRoom(false)
    }
  }, [])

  // Helper to get card type name
  const getCardTypeName = (card: Card) => {
    if (isMonster(card)) return MONSTER_NAMES[card.value] || "Monster"
    if (isPotion(card)) return POTION_NAMES[card.value] || "Potion"
    if (isWeaponCard(card)) return WEAPON_NAMES[card.value] || "Weapon"
    if (isMerchant(card)) return "Merchant"
    return "Card"
  }

  // Handle card interaction
  const handleCardAction = (card: Card, useWeapon = false) => {
    setGameState((prev) => {
      if (prev.gameOver) return prev

      let newHealth = prev.health
      let newWeapon = prev.weapon
      let newMonstersSlain = prev.monstersSlain
      let lastAction = ""
      let actionAnimation: string | null = null
      let merchantAvailable = prev.merchantAvailable

      if (isMonster(card)) {
        const monsterName = MONSTER_NAMES[card.value] || "Monster"

        if (useWeapon && prev.weapon && canUseWeapon(prev.weapon, card.value)) {
          const damage = calculateDamage(card.value, prev.weapon)
          newHealth = Math.max(0, prev.health - damage)

          newWeapon = {
            ...prev.weapon,
            maxKillValue: card.value,
          }

          setSlashingCard(card.id)
          setTimeout(() => setSlashingCard(null), 600)

          lastAction =
            damage > 0
              ? `Your blade cuts through the ${monsterName}! Took ${damage} damage.`
              : `Perfect strike! The ${monsterName} falls without touching you!`
          actionAnimation = damage > 0 ? "damage" : "slay"
          newMonstersSlain++
        } else {
          newHealth = Math.max(0, prev.health - card.value)
          lastAction = `The ${monsterName} attacks! You take ${card.value} damage!`
          actionAnimation = "damage"
          newMonstersSlain++
        }
      } else if (isPotion(card)) {
        const potionName = POTION_NAMES[card.value] || "Potion"
        const healAmount = Math.min(card.value, prev.maxHealth - prev.health)
        newHealth = Math.min(prev.maxHealth, prev.health + card.value)
        lastAction =
          healAmount > 0
            ? `You drink the ${potionName}. Restored ${healAmount} HP!`
            : `The ${potionName} has no effect. Already at full health!`
        actionAnimation = healAmount > 0 ? "heal" : null
      } else if (isWeaponCard(card)) {
        const weaponName = WEAPON_NAMES[card.value] || "Weapon"
        newWeapon = {
          card,
          maxKillValue: 0,
        }
        lastAction = `You found a ${weaponName}! Power: ${card.value}`
        actionAnimation = "weapon"
      } else if (isMerchant(card)) {
        if (prev.weapon && merchantAvailable) {
          const sellValue = getWeaponSellValue(prev.weapon)
          const weaponName = WEAPON_NAMES[prev.weapon.card.value] || "weapon"
          newHealth = Math.min(prev.maxHealth, prev.health + sellValue)
          lastAction = `The mysterious merchant buys your ${weaponName} for ${sellValue} HP!`
          newWeapon = null
          merchantAvailable = false
          actionAnimation = "merchant"
        } else if (!merchantAvailable) {
          lastAction = `The merchant's shadow fades... They have already departed.`
        } else {
          lastAction = `A hooded merchant appears, but you have nothing to trade...`
        }
      }

      const newRoom = prev.room.filter((c) => c.id !== card.id)
      const cardsResolved = prev.cardsResolved + 1

      const gameOver = newHealth <= 0
      if (gameOver) {
        lastAction = "Your vision fades... The dungeon claims another soul."
        actionAnimation = "death"
      }

      const wasAwaitingDecision = prev.awaitingLeftoverDecision

      return {
        ...prev,
        room: newRoom,
        health: newHealth,
        weapon: newWeapon,
        monstersSlain: newMonstersSlain,
        cardsResolved,
        gameOver,
        lastAction,
        actionAnimation,
        merchantAvailable,
        leftoverCard: wasAwaitingDecision ? null : prev.leftoverCard, // Clear leftover if we just played it
        awaitingLeftoverDecision: false, // Always clear this after any action
        score: calculateScore({ ...prev, health: newHealth, monstersSlain: newMonstersSlain }),
      }
    })

    setSelectedCard(null)
  }

  useEffect(() => {
    if (
      gameState.cardsResolved >= 3 &&
      !gameState.gameOver &&
      gameState.room.length === 1 &&
      !gameState.awaitingLeftoverDecision
    ) {
      const leftoverCard = gameState.room[0]
      setGameState((prev) => ({
        ...prev,
        leftoverCard,
        awaitingLeftoverDecision: true,
        lastAction: `A ${getCardTypeName(leftoverCard)} remains. Play it or venture on?`,
      }))
    }
  }, [gameState])

  useEffect(() => {
    if (
      gameState.room.length === 0 &&
      !gameState.gameOver &&
      !gameState.awaitingLeftoverDecision &&
      gameState.cardsResolved > 0
    ) {
      drawRoom(false)
    }
  }, [gameState.room.length, gameState.gameOver, gameState.awaitingLeftoverDecision, gameState.cardsResolved, drawRoom])

  // Handle playing leftover card - simplified, just set the card as selected
  const handlePlayLeftover = () => {
    if (gameState.leftoverCard) {
      setSelectedCard(gameState.leftoverCard)
      setGameState((prev) => ({
        ...prev,
        room: [prev.leftoverCard!],
        // Keep awaitingLeftoverDecision true until action is taken
      }))
    }
  }

  const handleSkipLeftover = () => {
    const leftover = gameState.leftoverCard
    drawRoom(true, leftover) // Keep the leftover and add 3 new cards
  }

  // Show game over modal
  useEffect(() => {
    if (gameState.gameOver) {
      const timer = setTimeout(() => setShowGameOver(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [gameState.gameOver])

  const restartGame = () => {
    setGameState(initializeGame(mode))
    setShowGameOver(false)
    setSelectedCard(null)
    setTimeout(() => drawRoom(false), 100)
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <DungeonBackground />

      <div className="relative z-10 flex flex-col min-h-screen p-3 sm:p-4 max-w-5xl mx-auto w-full">
        {/* Header */}
        <header className="flex items-center justify-between mb-4 sm:mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackToMenu}
            className="gap-2 text-muted-foreground hover:text-foreground hover:bg-card/50"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Menu</span>
          </Button>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground bg-card/30 px-3 py-1.5 rounded-full border border-border/50">
            <span className="uppercase tracking-wider font-bold">{mode === "realistic" ? "Classic" : "Endless"}</span>
            <span className="text-primary">|</span>
            <span>Room {gameState.roomsCleared + 1}</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={restartGame}
            className="gap-2 text-muted-foreground hover:text-foreground hover:bg-card/50"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Restart</span>
          </Button>
        </header>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <HealthBar current={gameState.health} max={gameState.maxHealth} animation={gameState.actionAnimation} />
          <WeaponSlot weapon={gameState.weapon} />
          <div className="flex items-center gap-3 bg-card/40 backdrop-blur rounded-xl p-3 border border-border/50">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
              <Skull className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Slain</div>
              <div className="text-xl font-bold text-foreground">{gameState.monstersSlain}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-card/40 backdrop-blur rounded-xl p-3 border border-border/50">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Score</div>
              <div className="text-xl font-bold text-foreground">{gameState.score}</div>
            </div>
          </div>
        </div>

        <RoomProgress cardsResolved={gameState.cardsResolved} cardsRemaining={gameState.room.length} />
        <ActionLog message={gameState.lastAction} animation={gameState.actionAnimation} />

        {/* Room Cards or Leftover Decision */}
        <div className="flex-1 flex items-center justify-center py-4 sm:py-8">
          {gameState.awaitingLeftoverDecision && gameState.leftoverCard && !selectedCard ? (
            <div className="flex flex-col items-center gap-6">
              <PlayingCard card={gameState.leftoverCard} isSelected={false} onClick={() => {}} isLeftover />
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handlePlayLeftover} size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                  <Play className="w-5 h-5" />
                  Play This Card
                </Button>
                <Button
                  onClick={handleSkipLeftover}
                  size="lg"
                  variant="outline"
                  className="gap-2 bg-card/50 hover:bg-card/80"
                >
                  <ArrowRight className="w-5 h-5" />
                  Keep & Draw 3 New
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {gameState.room.map((card, index) => (
                <PlayingCard
                  key={card.id}
                  card={card}
                  isSelected={selectedCard?.id === card.id}
                  onClick={() => setSelectedCard(selectedCard?.id === card.id ? null : card)}
                  delay={index * 120}
                  isSlashing={slashingCard === card.id}
                  isLeftover={gameState.leftoverCard?.id === card.id}
                />
              ))}
            </div>
          )}
        </div>

        {/* Action Panel */}
        {selectedCard && !gameState.gameOver && (
          <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border/50 p-4 z-20">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-3">
                {isMonster(selectedCard) && (
                  <>
                    <Button
                      onClick={() => handleCardAction(selectedCard, false)}
                      variant="destructive"
                      size="lg"
                      className="gap-2"
                    >
                      <Skull className="w-5 h-5" />
                      Flee ({selectedCard.value} dmg)
                    </Button>
                    {gameState.weapon && canUseWeapon(gameState.weapon, selectedCard.value) && (
                      <Button
                        onClick={() => handleCardAction(selectedCard, true)}
                        size="lg"
                        className="gap-2 bg-amber-600 hover:bg-amber-700 text-white"
                      >
                        <span className="text-xl">⚔</span>
                        Strike ({calculateDamage(selectedCard.value, gameState.weapon)} dmg)
                      </Button>
                    )}
                    {gameState.weapon && !canUseWeapon(gameState.weapon, selectedCard.value) && (
                      <span className="text-sm text-red-400 px-3">
                        Weapon too bloodied (max: {gameState.weapon.maxKillValue})
                      </span>
                    )}
                  </>
                )}
                {isPotion(selectedCard) && (
                  <Button
                    onClick={() => handleCardAction(selectedCard)}
                    size="lg"
                    className="gap-2 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <span className="text-xl">🧪</span>
                    Drink (+{Math.min(selectedCard.value, gameState.maxHealth - gameState.health)} HP)
                  </Button>
                )}
                {isWeaponCard(selectedCard) && (
                  <Button
                    onClick={() => handleCardAction(selectedCard)}
                    size="lg"
                    className="gap-2 bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    <span className="text-xl">⚔</span>
                    {gameState.weapon ? "Replace" : "Equip"} (Power {selectedCard.value})
                  </Button>
                )}
                {isMerchant(selectedCard) && (
                  <>
                    {gameState.weapon && gameState.merchantAvailable ? (
                      <Button
                        onClick={() => handleCardAction(selectedCard)}
                        size="lg"
                        className="gap-2 bg-purple-600 hover:bg-purple-700 text-white merchant-sparkle"
                      >
                        <Sparkles className="w-5 h-5" />
                        Trade (+{getWeaponSellValue(gameState.weapon)} HP)
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleCardAction(selectedCard)}
                        size="lg"
                        variant="outline"
                        className="gap-2 bg-card/50"
                      >
                        <Sparkles className="w-5 h-5" />
                        {gameState.merchantAvailable ? "No Weapon" : "Merchant Gone"}
                      </Button>
                    )}
                  </>
                )}
                <Button variant="ghost" size="lg" onClick={() => setSelectedCard(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Deck Counter (Realistic Mode) */}
        {mode === "realistic" && (
          <div className="fixed bottom-4 right-4 bg-card/80 backdrop-blur rounded-xl px-4 py-2 border border-border/50 z-10">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Deck</div>
            <div className="text-xl font-bold text-foreground">{gameState.deck.length}</div>
          </div>
        )}

        <GameOverModal
          isOpen={showGameOver}
          victory={gameState.victory}
          score={gameState.score}
          monstersSlain={gameState.monstersSlain}
          roomsCleared={gameState.roomsCleared}
          mode={mode}
          onRestart={restartGame}
          onMainMenu={onBackToMenu}
        />
      </div>
    </div>
  )
}
