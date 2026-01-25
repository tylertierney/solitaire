/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from 'react'
import type { DragState } from '../components/GamePage/GamePage'
import type { CardType } from '../models'
import { useDispatch } from './HistoryContext'
import { getDropZoneFromEvent } from '../utils/utils'

type DragContextType = {
  drag: DragState | null
  setDrag: Dispatch<SetStateAction<DragState | null>>
  handlePointerDown: (
    e: React.PointerEvent<HTMLDivElement>,
    card: CardType,
  ) => void
  handlePointerMove: (e: PointerEvent) => void
}

export const DragContext = createContext<DragContextType>({
  drag: null,
  setDrag: () => ({}),
  handlePointerDown: () => ({}),
  handlePointerMove: () => ({}),
})

export function DragProvider({ children }: PropsWithChildren) {
  const [drag, setDrag] = useState<DragState | null>(null)
  const dispatch = useDispatch()

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    card: CardType,
  ) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()

    setDrag({
      card,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    })
  }

  const handlePointerMove = (e: PointerEvent) => {
    setDrag((prev) =>
      prev
        ? {
            ...prev,
            x: e.clientX - prev.offsetX,
            y: e.clientY - prev.offsetY,
          }
        : null,
    )
  }

  const handlePointerUp = (e: PointerEvent) => {
    if (drag) {
      console.log(drag)
      const dropZone = getDropZoneFromEvent(e)

      if (!dropZone) {
        setDrag(null)
        return
      }

      const foundationDataEl = dropZone.dataset['foundation']

      if (foundationDataEl) {
        const foundationIdx = parseInt(foundationDataEl, 10)
        dispatch({
          type: 'moveToFoundation',
          card: drag.card as CardType,
          foundationIdx,
        })
      }

      const tableauDataEl = dropZone.dataset['tableau']

      if (tableauDataEl) {
        const targetTableauIdx = parseInt(tableauDataEl, 10)
        dispatch({
          type: 'moveToTableau',
          targetTableauIdx,
          card: drag.card as CardType,
        })
      }
    }
    setDrag(null)
  }

  useEffect(() => {
    if (!drag) return

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [drag])

  return (
    <DragContext.Provider
      value={{
        drag,
        setDrag,
        handlePointerDown,
        handlePointerMove,
      }}
    >
      {children}
    </DragContext.Provider>
  )
}

export function useDrag() {
  return useContext(DragContext)
}
