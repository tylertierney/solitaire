import { cardValues, suits, type CardType, type GameState } from '../models'

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
          id: suit + value,
          value,
          suit,
          hidden: randBoolean(),
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

export function getDropZoneFromEvent(
  e: PointerEvent | React.PointerEvent,
): HTMLDivElement | null {
  let el = document.elementFromPoint(
    e.clientX,
    e.clientY,
  ) as HTMLDivElement | null

  while (el) {
    if (el.dataset.dropzone) {
      return el
    }
    el = el.parentElement as HTMLDivElement
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
