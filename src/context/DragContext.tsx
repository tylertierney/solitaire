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
import type { CardType, DragState } from '../models'
import { getDropZoneFromEvent } from '../utils/utils'
import { useDispatch } from './HistoryContext'

type PendingDrag = {
  card: CardType
  startX: number
  startY: number
  offsetX: number
  offsetY: number
  rect: DOMRect
}

type DragContextType = {
  drag: DragState | null
  setDrag: Dispatch<SetStateAction<DragState | null>>
  handlePointerDown: (
    e: React.PointerEvent<HTMLDivElement>,
    card: CardType,
  ) => void
}

const DRAG_THRESHOLD = 3

export const DragContext = createContext<DragContextType>({
  drag: null,
  setDrag: () => ({}),
  handlePointerDown: () => ({}),
})

export function DragProvider({ children }: PropsWithChildren) {
  const [drag, setDrag] = useState<DragState | null>(null)
  const [pendingDrag, setPendingDrag] = useState<PendingDrag | null>(null)
  const dispatch = useDispatch()

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    card: CardType,
  ) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()

    setPendingDrag({
      card,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      rect,
    })
  }

  const handlePointerMove = (e: PointerEvent) => {
    // Promote pending -> real drag
    if (pendingDrag && !drag) {
      const dx = e.clientX - pendingDrag.startX
      const dy = e.clientY - pendingDrag.startY

      if (Math.hypot(dx, dy) > DRAG_THRESHOLD) {
        setDrag({
          card: pendingDrag.card,
          offsetX: pendingDrag.offsetX,
          offsetY: pendingDrag.offsetY,
          x: pendingDrag.rect.left,
          y: pendingDrag.rect.top,
          width: pendingDrag.rect.width,
          height: pendingDrag.rect.height,
        })
        setPendingDrag(null)
      }
      return
    }

    if (drag) {
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
  }

  const handlePointerUp = (e: PointerEvent) => {
    // If we never promoted → this was a click
    if (!drag) {
      setPendingDrag(null)
      return
    }

    const dropZone = getDropZoneFromEvent(e, drag)

    if (dropZone) {
      const foundationIdx = dropZone.dataset['foundation']
      const tableauIdx = dropZone.dataset['tableau']

      if (foundationIdx) {
        dispatch({
          type: 'moveToFoundation',
          card: drag.card as CardType,
          foundationIdx: parseInt(foundationIdx, 10),
        })
      }

      if (tableauIdx) {
        dispatch({
          type: 'moveToTableau',
          card: drag.card as CardType,
          targetTableauIdx: parseInt(tableauIdx, 10),
        })
      }
    }

    setDrag(null)
  }

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [pendingDrag, drag])

  return (
    <DragContext.Provider
      value={{
        drag,
        setDrag,
        handlePointerDown,
      }}
    >
      {children}
    </DragContext.Provider>
  )
}

export function useDrag() {
  return useContext(DragContext)
}
