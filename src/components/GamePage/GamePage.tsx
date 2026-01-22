import type { CardType, GameState } from '../../models'
import styles from './GamePage.module.scss'
import Deck from '../Deck/Deck'
import Tower from '../Tower/Tower'
import RevealedStock from '../RevealedStock/RevealedStock'
import { useDispatch } from '../../context/HistoryContext'
import { useEffect, useState } from 'react'
import { getDropZoneFromEvent } from '../../utils/utils'

type Props = {
  gameState: GameState
  className?: string
}

export type DragState = {
  card: CardType | null
  offsetX: number
  offsetY: number
  x: number
  y: number
  width: number
  height: number
}

export default function GamePage({ gameState, className = '' }: Props) {
  const dispatch = useDispatch()

  const { foundations, stockpile, tableau } = gameState

  const blankSpaces = Array(7).fill(null)

  const [drag, setDrag] = useState<DragState | null>(null)

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

  console.log(gameState)

  return (
    <>
      <div className={`${styles.gamePage} ${className}`}>
        {foundations.map((cards, idx) => {
          return (
            <div
              key={idx}
              className={`${styles.cell} ${styles.foundationCell}`}
              data-foundation={idx}
              data-dropzone={true}
              style={{ border: 'none !important' }}
            >
              <span className={styles.foundationLabel}>A</span>
              <Deck
                cards={cards}
                drag={drag}
                handlePointerDown={handlePointerDown}
              />
            </div>
          )
        })}

        <div className={`${styles.cell} ${styles.blankCell}`}></div>

        <div className={`${styles.cell}`}>
          <RevealedStock
            drag={drag}
            handlePointerDown={handlePointerDown}
            cards={stockpile[0]}
          />
        </div>

        <div className={`${styles.cell} ${styles.stockpileCell}`}>
          <Deck
            onClick={() => dispatch({ type: 'revealStock' })}
            cards={stockpile[1]}
            drag={drag}
          />
          <span
            className={styles.refreshIcon}
            onClick={() => {
              if (!stockpile[1].length) {
                dispatch({ type: 'refreshStockpile' })
              }
            }}
          >
            refresh
          </span>
        </div>

        {tableau.map((cards, idx) => {
          return (
            <div key={idx} className={`${styles.cell} ${styles.tableauCell}`}>
              <Tower
                cards={cards}
                drag={drag}
                handlePointerDown={handlePointerDown}
              />
            </div>
          )
        })}

        {blankSpaces.map((_, idx) => (
          <div key={idx} className={`${styles.cell} ${styles.blankCell}`}></div>
        ))}
      </div>
    </>
  )
}
