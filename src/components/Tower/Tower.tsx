import { useRef } from 'react'
import { useDrag } from '../../context/DragContext'
import type { CardType } from '../../models'
import Card from '../Card/Card'
import styles from './Tower.module.scss'
import { useDispatch } from '../../context/HistoryContext'

type Props = {
  cards: CardType[]
  index?: number
  dragIndex?: number
}

export default function Tower({ cards, index = 0, dragIndex = 0 }: Props) {
  const { drag, handlePointerDown } = useDrag()
  const cardRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useDispatch()

  if (!cards.length) return null

  const bottomCard = cards.at(0) as CardType
  const restOfCards = cards.slice(1)

  if (drag?.card?.id === bottomCard.id) {
    dragIndex = 1
  }

  return (
    <div
      className={`${styles.tower}`}
      style={
        dragIndex && drag
          ? {
              position: 'fixed',
              left: drag.x,
              top: drag.y + (dragIndex - 1) * 30 + 'px',
              zIndex: 10,
              pointerEvents: 'none',
              width: drag.width + 'px',
              height: drag.height + 'px',
            }
          : {
              position: index === 0 ? 'relative' : 'absolute',
              top: index === 0 ? 0 : '30px',
            }
      }
      onPointerDown={(e) => {
        if (bottomCard.hidden) return
        handlePointerDown?.(e, bottomCard)
        e.stopPropagation()
      }}
      onGotPointerCapture={(e) => {
        const target = e.target as HTMLDivElement
        target.releasePointerCapture(e.pointerId)
      }}
    >
      <Card
        ref={cardRef}
        className={styles.card}
        card={bottomCard}
        onClick={(_, card) => {
          dispatch({ type: 'clickCard', card })
        }}
      />
      <Tower
        cards={restOfCards}
        index={index + 1}
        dragIndex={dragIndex ? dragIndex + 1 : 0}
      />
    </div>
  )
}
