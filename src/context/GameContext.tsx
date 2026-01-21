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
import { getDefaultGameState } from '../utils/utils'

// export type GameActionType = 'reset'

// export const gameActionMap: Record<string, GameActionType> = {
//   RESET: "reset",
// } as const

// export type GameActionType = typeof gameActionMap[keyof typeof gameActionMap]

type History = { moves: GameState[]; index: number }

export type Action =
  // | { type: 'submit'; word: string }
  | { type: 'revealStock' }
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
    switch (action.type) {
      case 'revealStock': {
        const { moves, index } = history
        const prev = moves.at(index) as GameState

        const { stockpile } = prev
        const newState: GameState = {
          ...prev,
          stockpile: [
            [...stockpile[0], stockpile[1].at(-1) as CardType],
            [...stockpile[1].slice(0, stockpile[1].length - 1)],
          ],
        }

        return {
          moves: [...moves.slice(0, index + 1), newState],
          index: index + 1,
        }
      }
      case 'undo': {
        const { moves, index } = history
        if (moves.length <= 1 || index <= 0) return history
        return {
          ...history,
          index: index - 1,
        }
      }
      case 'redo': {
        const { moves, index } = history
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
