import {
  cardValues,
  suits,
  type CardType,
  type DragState,
  type GameState,
} from '../models'

export function shuffleArray<T>(arr: T[]): T[] {
  let i = 0
  while (i < arr.length) {
    const randIndex = ~~(Math.random() * arr.length)
    ;[arr[i], arr[randIndex]] = [arr[randIndex], arr[i]]
    i++
  }

  return arr
}

export function generateDeck(): CardType[] {
  return shuffleArray(
    suits
      .map((suit) =>
        cardValues.map((value) => ({
          id: `${suit}${value}` as CardType['id'],
          value,
          suit,
          hidden: true,
        })),
      )
      .flat(),
  )
}

export function getDefaultGameState(): GameState {
  const deck = generateDeck().map((c) => ({ ...c, hidden: true }))

  const tableau: GameState['tableau'] = [[], [], [], [], [], [], []]

  const towerHeights = Array(tableau.length)
    .fill(null)
    .map((_, idx) => idx + 1)

  let i = 0
  while (i < towerHeights.length) {
    let j = 0
    while (j < towerHeights[i]) {
      const card = deck.pop() as CardType
      tableau[i].push({
        ...card,
        hidden: j === towerHeights[i] - 1 ? false : true,
      })
      j++
    }
    i++
  }

  return {
    foundations: [[], [], [], []],
    stockpile: [[], deck],
    tableau,
  }
}

export function randBoolean(): boolean {
  return [true, false][~~(Math.random() * 2)]
}

const traverseUpThroughDomForDropzoneAttr = (
  el: HTMLDivElement | null,
): HTMLDivElement | null => {
  while (el) {
    if (el.dataset.dropzone) {
      return el
    }
    el = el.parentElement as HTMLDivElement
  }
  return null
}

export function getDropZoneFromEvent(
  e: PointerEvent | React.PointerEvent,
  drag: DragState,
): HTMLDivElement | null {
  const coordsOnCard = [
    [e.clientX, e.clientY],

    //top
    [drag.x + 0.5 * drag.width, drag.y],
    //right
    [drag.x + drag.width, drag.y + 0.5 * drag.height],
    //bottom
    [drag.x + 0.5 * drag.width, drag.y + drag.height],
    //left
    [drag.x, drag.y + 0.5 * drag.height],
  ]

  for (const [x, y] of coordsOnCard) {
    const el = document.elementFromPoint(x, y) as HTMLDivElement | null

    const res = traverseUpThroughDomForDropzoneAttr(el)
    if (res) return res
  }

  return null
}

export function canMoveToFoundation(
  foundation: CardType[],
  card: CardType,
): boolean {
  if (!foundation.length) {
    if (card.value === 'A') return true
    return false
  }

  const top = foundation.at(-1) as CardType

  if (top.suit !== card.suit) return false

  if (cardValues.indexOf(top.value) !== cardValues.indexOf(card.value) - 1)
    return false

  return true
}

export const getCardColor = (card: CardType): 'red' | 'black' => {
  const map: Record<CardType['suit'], 'red' | 'black'> = {
    diamond: 'red',
    heart: 'red',
    spade: 'black',
    club: 'black',
  }

  return map[card.suit]
}

export const cardIsBlack = (card: CardType) => {
  return card.suit === 'spade' || card.suit === 'club'
}

export function canMoveToTableau(
  topCardFromTarget: CardType | undefined,
  card: CardType,
): boolean {
  if (!topCardFromTarget) {
    return card.value === 'K'
  }

  if (getCardColor(topCardFromTarget) === getCardColor(card)) {
    return false
  }

  return (
    cardValues.indexOf(topCardFromTarget.value) ===
    cardValues.indexOf(card.value) + 1
  )
}

export const cloneGameState = (prev: GameState): GameState => {
  return {
    foundations: [
      ...prev.foundations.map((arr) => [...arr.map((c) => ({ ...c }))]),
    ] as GameState['foundations'],
    stockpile: [
      ...prev.stockpile.map((arr) => [...arr.map((c) => ({ ...c }))]),
    ] as GameState['stockpile'],
    tableau: [
      ...prev.tableau.map((arr) => [...arr.map((c) => ({ ...c }))]),
    ] as GameState['tableau'],
  }
}
