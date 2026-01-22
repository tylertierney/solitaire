/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type PropsWithChildren,
  type Reducer,
} from 'react'
import type { CardType, GameState } from '../models'
import { canMoveToFoundation, getDefaultGameState } from '../utils/utils'

// export type GameActionType = 'reset'

// export const gameActionMap: Record<string, GameActionType> = {
//   RESET: "reset",
// } as const

// export type GameActionType = typeof gameActionMap[keyof typeof gameActionMap]

type History = { moves: GameState[]; index: number }

export type Action =
  // | { type: 'submit'; word: string }
  | { type: 'revealStock' }
  | { type: 'moveToFoundation'; foundationIdx: number; card: CardType }
  | { type: 'refreshStockpile' }
  | { type: 'undo' }
  | { type: 'redo' }
  | { type: 'reset' }

export const HistoryContext = createContext<History>({
  moves: [getDefaultGameState()],
  index: 0,
})
export const DispatchContext = createContext<Dispatch<Action>>(() => ({}))

type GameReducer = Reducer<History, Action>

export function HistoryProvider({ children }: PropsWithChildren) {
  const gameReducer: GameReducer = (
    history: History,
    action: Action,
  ): History => {
    const { moves, index } = history
    const currState = moves.at(index) as GameState

    switch (action.type) {
      case 'revealStock': {
        const { stockpile } = currState
        const newState: GameState = {
          ...currState,
          stockpile: [
            [
              ...stockpile[0],
              { ...stockpile[1].at(-1), hidden: false } as CardType,
            ],
            [...stockpile[1].slice(0, stockpile[1].length - 1)],
          ],
        }

        return {
          moves: [...moves.slice(0, index + 1), newState],
          index: index + 1,
        }
      }
      case 'moveToFoundation': {
        const { foundationIdx, card } = action

        if (!canMoveToFoundation(currState.foundations[foundationIdx], card)) {
          return { moves, index }
        }

        const newTableau = [] as unknown as GameState['tableau']

        let i = 0
        while (i < currState.tableau.length) {
          let j = 0
          const tower: CardType[] = []
          while (j < currState.tableau[i].length) {
            const c = currState.tableau[i][j]
            if (c.id === card.id) {
              const prevCard = tower[j - 1]
              if (prevCard) {
                prevCard.hidden = false
              }
            } else {
              tower.push(c)
            }
            j++
          }
          newTableau.push(tower)
          i++
        }

        const newState: GameState = {
          foundations: currState.foundations.map((f, i) => {
            if (i === foundationIdx) {
              return [...f, card]
            }
            return f
          }) as GameState['foundations'],
          stockpile: currState.stockpile.map((s) =>
            s.filter((c) => c.id !== card.id),
          ) as GameState['stockpile'],
          tableau: newTableau,
        }
        return {
          moves: [...moves.slice(0, index + 1), newState],
          index: index + 1,
        }
      }
      case 'refreshStockpile': {
        const newState: GameState = {
          ...currState,
          stockpile: [
            [],
            currState.stockpile[0]
              .toReversed()
              .map((c) => ({ ...c, hidden: true })),
          ],
        }
        return {
          moves: [...moves.slice(0, index + 1), newState],
          index: index + 1,
        }
      }
      case 'undo': {
        if (moves.length <= 1 || index <= 0) return history
        return {
          ...history,
          index: index - 1,
        }
      }
      case 'redo': {
        if (moves.length <= 1 || index >= moves.length - 1) return history
        return {
          ...history,
          index: index + 1,
        }
      }
      case 'reset': {
        return { moves: [getDefaultGameState()], index: 0 }
      }
      default: {
        return history
      }
    }
  }

  const [history, dispatch] = useReducer(gameReducer, {
    moves: [getDefaultGameState()],
    index: 0,
  })

  return (
    <HistoryContext.Provider value={history}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </HistoryContext.Provider>
  )
}

export function useHistory() {
  return useContext(HistoryContext)
}

export function useDispatch() {
  return useContext(DispatchContext)
}
