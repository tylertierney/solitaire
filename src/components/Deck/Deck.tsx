import styles from './Deck.module.scss'
import type { CardType } from '../../models'
import Card from '../Card/Card'
import type { DragState } from '../GamePage/GamePage'

type Props = {
  cards: CardType[]
  drag: DragState | null
  handlePointerDown?: (
    e: React.PointerEvent<HTMLDivElement>,
    card: CardType,
  ) => void
  onClick?: (card: CardType) => void
}

export default function Deck({
  cards = [],
  drag,
  handlePointerDown,
  onClick,
}: Props) {
  const topCard = cards.at(-1) as CardType
  const isDragging = drag?.card?.id === topCard?.id

  return (
    <div className={`${styles.deck}`}>
      {cards.map(({ suit, value, hidden }, idx) => (
        <Card
          onPointerDown={(e) => handlePointerDown?.(e, topCard)}
          key={idx}
          suit={suit}
          hidden={hidden}
          value={value}
          onClick={onClick}
          className={styles.card}
          style={
            isDragging
              ? {
                  position: 'fixed',
                  left: drag.x,
                  top: drag.y,
                  zIndex: 1000,
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
