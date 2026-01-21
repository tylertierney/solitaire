import type { GameState } from '../../models'
import styles from './GamePage.module.scss'
import Deck from '../Deck/Deck'
import Tower from '../Tower/Tower'
import RevealedStock from '../RevealedStock/RevealedStock'
import { useDispatch } from '../../context/GameContext'
import { useEffect, useState } from 'react'

type Props = {
  gameState: GameState
  className?: string
}

type DragState = {
  cardId: string | null
  offsetX: number
  offsetY: number
  x: number
  y: number
}

export default function GamePage({ gameState, className = '' }: Props) {
  const dispatch = useDispatch()

  const { foundations, stockpile, tableau } = gameState

  const blankSpaces = Array(7).fill(null)

  const [drag, setDrag] = useState<DragState | null>(null)

  const handlePointerDown = (e: React.PointerEvent, cardId: string) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()

    setDrag({
      cardId,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      x: rect.left,
      y: rect.top,
    })

    e.currentTarget.setPointerCapture(e.pointerId)
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

  const handlePointerUp = () => {
    if (drag) {
      // 🔥 DO YOUR "DROP" LOGIC HERE
      console.log('Dropped card:', drag.cardId, drag.x, drag.y)
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
    <>
      <div className={`${styles.gamePage} ${className}`}>
        {foundations.map((_, idx) => {
          return (
            <div
              key={idx}
              className={`${styles.cell} ${styles.foundationCell}`}
            >
              <span className={styles.foundationLabel}>A</span>
            </div>
          )
        })}

        <div className={`${styles.cell} ${styles.blankCell}`}></div>

        <div className={`${styles.cell} ${styles.stockpileCell}`}>
          <RevealedStock cards={stockpile[0]} />
        </div>

        <div className={`${styles.cell} ${styles.stockpileCell}`}>
          <Deck
            onClick={() => dispatch({ type: 'revealStock' })}
            cards={stockpile[1]}
          />
        </div>

        {tableau.map((cards, idx) => {
          return (
            <div key={idx} className={`${styles.cell} ${styles.tableauCell}`}>
              <Tower cards={cards} />
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
