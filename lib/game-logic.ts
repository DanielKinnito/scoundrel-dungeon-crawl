export type Suit = "hearts" | "diamonds" | "clubs" | "spades" | "joker"
export type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 0

export interface Card {
  id: string
  suit: Suit
  value: CardValue
  isRevealed: boolean
}

export interface Weapon {
  card: Card
  maxKillValue: number
}

export interface GameState {
  deck: Card[]
  room: Card[]
  leftoverCard: Card | null
  health: number
  maxHealth: number
  weapon: Weapon | null
  monstersSlain: number
  roomsCleared: number
  cardsResolved: number
  gameOver: boolean
  victory: boolean
  lastAction: string
  actionAnimation: string | null
  merchantAvailable: boolean
  score: number
  awaitingLeftoverDecision: boolean
}

export const CARD_VALUES: Record<CardValue, string> = {
  0: "M",
  1: "A",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "10",
  11: "J",
  12: "Q",
  13: "K",
}

export const SUIT_SYMBOLS: Record<Suit, string> = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
  joker: "★",
}

export const SUIT_COLORS: Record<Suit, string> = {
  hearts: "text-red-500",
  diamonds: "text-amber-400",
  clubs: "text-slate-300",
  spades: "text-slate-400",
  joker: "text-purple-400",
}

export const MONSTER_NAMES: Record<number, string> = {
  1: "Rat",
  2: "Bat",
  3: "Spider",
  4: "Skeleton",
  5: "Zombie",
  6: "Ghoul",
  7: "Wraith",
  8: "Orc",
  9: "Troll",
  10: "Ogre",
  11: "Dark Knight",
  12: "Vampire Queen",
  13: "Dragon Lord",
}

export const WEAPON_NAMES: Record<number, string> = {
  1: "Rusty Dagger",
  2: "Short Sword",
  3: "Battle Axe",
  4: "Warhammer",
  5: "Longsword",
  6: "Claymore",
  7: "Enchanted Blade",
  8: "Demon Slayer",
  9: "Dragon Tooth",
  10: "Excalibur",
  11: "Soul Reaper",
  12: "Chaos Blade",
  13: "Godslayer",
}

export const POTION_NAMES: Record<number, string> = {
  1: "Minor Salve",
  2: "Healing Herbs",
  3: "Health Tonic",
  4: "Healing Potion",
  5: "Strong Elixir",
  6: "Life Essence",
  7: "Greater Potion",
  8: "Royal Medicine",
  9: "Ancient Remedy",
  10: "Dragon Blood",
  11: "Phoenix Tears",
  12: "Divine Nectar",
  13: "Elixir of Life",
}

export function createDeck(includeJokers = true): Card[] {
  const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"]
  const values: CardValue[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  const deck: Card[] = []

  for (const suit of suits) {
    for (const value of values) {
      deck.push({
        id: `${suit}-${value}`,
        suit,
        value,
        isRevealed: false,
      })
    }
  }

  if (includeJokers) {
    deck.push({ id: "joker-1", suit: "joker", value: 0, isRevealed: false })
    deck.push({ id: "joker-2", suit: "joker", value: 0, isRevealed: false })
  }

  return shuffleDeck(deck)
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function getRandomCard(): Card {
  const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades", "joker"]
  const randomSuit = suits[Math.floor(Math.random() * suits.length)]

  if (randomSuit === "joker") {
    if (Math.random() < 0.04) {
      return {
        id: `joker-${Date.now()}`,
        suit: "joker",
        value: 0,
        isRevealed: true,
      }
    }
    const nonJokerSuits: Suit[] = ["hearts", "diamonds", "clubs", "spades"]
    const suit = nonJokerSuits[Math.floor(Math.random() * 4)]
    const value = (Math.floor(Math.random() * 13) + 1) as CardValue
    return {
      id: `${suit}-${value}-${Date.now()}`,
      suit,
      value,
      isRevealed: true,
    }
  }

  const value = (Math.floor(Math.random() * 13) + 1) as CardValue
  return {
    id: `${randomSuit}-${value}-${Date.now()}`,
    suit: randomSuit,
    value,
    isRevealed: true,
  }
}

export function isMonster(card: Card): boolean {
  return card.suit === "clubs" || card.suit === "spades"
}

export function isPotion(card: Card): boolean {
  return card.suit === "hearts"
}

export function isWeaponCard(card: Card): boolean {
  return card.suit === "diamonds"
}

export function isMerchant(card: Card): boolean {
  return card.suit === "joker"
}

export function calculateDamage(monsterValue: number, weapon: Weapon | null): number {
  if (!weapon) return monsterValue
  if (weapon.maxKillValue > 0 && monsterValue > weapon.maxKillValue) {
    return monsterValue
  }
  return Math.max(0, monsterValue - weapon.card.value)
}

export function canUseWeapon(weapon: Weapon | null, monsterValue: number): boolean {
  if (!weapon) return false
  if (weapon.maxKillValue === 0) return true
  return monsterValue <= weapon.maxKillValue
}

export function getWeaponSellValue(weapon: Weapon): number {
  if (weapon.maxKillValue === 0) {
    return weapon.card.value
  }
  return weapon.maxKillValue
}

export function initializeGame(mode: "realistic" | "endless"): GameState {
  const deck = mode === "realistic" ? createDeck(true) : []

  return {
    deck,
    room: [],
    leftoverCard: null,
    health: 20,
    maxHealth: 20,
    weapon: null,
    monstersSlain: 0,
    roomsCleared: 0,
    cardsResolved: 0,
    gameOver: false,
    victory: false,
    lastAction: "You descend into the dungeon...",
    actionAnimation: null,
    merchantAvailable: true,
    score: 0,
    awaitingLeftoverDecision: false,
  }
}

export function calculateScore(state: GameState): number {
  const baseScore = state.monstersSlain * 10
  const healthBonus = state.health * 5
  const roomBonus = state.roomsCleared * 25
  const victoryBonus = state.victory ? 500 : 0

  return baseScore + healthBonus + roomBonus + victoryBonus
}

export function getMonsterTier(value: number): "weak" | "medium" | "strong" | "boss" {
  if (value <= 4) return "weak"
  if (value <= 8) return "medium"
  if (value <= 10) return "strong"
  return "boss"
}

export function getWeaponTier(value: number): "common" | "uncommon" | "rare" | "legendary" {
  if (value <= 4) return "common"
  if (value <= 8) return "uncommon"
  if (value <= 10) return "rare"
  return "legendary"
}

export function getPotionTier(value: number): "minor" | "medium" | "major" | "legendary" {
  if (value <= 4) return "minor"
  if (value <= 8) return "medium"
  if (value <= 10) return "major"
  return "legendary"
}
