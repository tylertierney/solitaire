import styles from './Deck.module.scss'
import type { CardType } from '../../models'
import Card from '../Card/Card'
import { type CSSProperties, type MouseEvent } from 'react'
import { useDrag } from '../../context/DragContext'
import { useDispatch } from '../../context/HistoryContext'

type Props = {
  cards: CardType[]
  allowDragFromTop?: boolean
  onClick?: (e: MouseEvent<HTMLDivElement>, card: CardType) => void
  style?: CSSProperties
}

export default function Deck({
  cards = [],
  allowDragFromTop = false,
  // onClick,
  style = {},
}: Props) {
  const { drag, handlePointerDown } = useDrag()
  const topCard = cards.at(-1) as CardType
  const isDragging = drag?.card?.id === topCard?.id
  const dispatch = useDispatch()

  return (
    <div className={`${styles.deck}`} style={style}>
      {cards.map((card, idx) => (
        <Card
          onPointerDown={(e) => {
            if (!allowDragFromTop) return
            handlePointerDown?.(e, topCard)
          }}
          key={idx}
          card={card}
          onClick={() => {
            if (allowDragFromTop) {
              dispatch({ type: 'clickCard', card })
            }
          }}
          className={styles.card}
          style={
            isDragging
              ? {
                  position: 'fixed',
                  left: drag.x,
                  top: drag.y,
                  zIndex: 10,
                  pointerEvents: 'none',
                  width: drag.width + 'px',
                  height: drag.height + 'px',
                }
              : {
                  top: 0.15 * idx + 'px',
                }
          }
        />
      ))}
    </div>
  )
}
