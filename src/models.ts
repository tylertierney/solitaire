import { Heart, Diamond, Club, Spade } from './svg/suits'

export const suits = ['heart', 'spade', 'club', 'diamond'] as const

export type Suit = (typeof suits)[number]

export const suitToIconMap: Record<
  Suit,
  typeof Spade | typeof Diamond | typeof Heart | typeof Club
> = {
  spade: Spade,
  diamond: Diamond,
  heart: Heart,
  club: Club,
}

export const cardValues = [
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  'J',
  'Q',
  'K',
  'A',
] as const

export type CardValue = (typeof cardValues)[number]

export type CardType = {
  id: string
  suit: 'heart' | 'spade' | 'club' | 'diamond'
  value: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'J' | 'Q' | 'K' | 'A'
  hidden: boolean
}

export type GameState = {
  foundations: [CardType[], CardType[], CardType[], CardType[]]
  stockpile: [CardType[], CardType[]]
  tableau: [
    CardType[],
    CardType[],
    CardType[],
    CardType[],
    CardType[],
    CardType[],
    CardType[],
  ]
}
