import styles from './Tower.module.scss'
import type { CardType } from '../../models'
import Card from '../Card/Card'
import type { DragState } from '../GamePage/GamePage'

type Props = {
  cards: CardType[]
  drag: DragState | null
  handlePointerDown: (
    e: React.PointerEvent<HTMLDivElement>,
    cardId: string,
  ) => void
  onClick?: (card: CardType) => void
}

export default function Tower({
  cards = [],
  drag,
  handlePointerDown,
  onClick,
}: Props) {
  if (!cards.length) return <div className={`${styles.tower}`}></div>

  const mostCards = cards.slice(0, cards.length - 1)
  const topCard = cards.at(-1) as CardType

  const isDragging = drag?.cardId === topCard.id

  return (
    <div className={`${styles.tower}`}>
      {mostCards.length &&
        mostCards.map(({ suit, value, hidden }, idx) => (
          <Card
            key={idx}
            suit={suit}
            hidden={hidden}
            value={value}
            onClick={(c) => onClick?.(c)}
            className={styles.card}
            style={{
              top: `calc(17% * ${idx})`,
            }}
          />
        ))}
      <Card
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
                top: `calc(17% * ${mostCards.length})`,
              }
        }
        suit={topCard.suit}
        value={topCard.value}
        hidden={topCard.hidden}
        onPointerDown={(e) => handlePointerDown(e, topCard.id)}
      />
    </div>
  )
}
