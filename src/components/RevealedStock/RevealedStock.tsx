import styles from './RevealedStock.module.scss'
import type { CardType } from '../../models'
import Card from '../Card/Card'
import type { DragState } from '../GamePage/GamePage'

type Props = {
  cards: CardType[]
  drag: DragState | null
  handlePointerDown: (
    e: React.PointerEvent<HTMLDivElement>,
    card: CardType,
  ) => void
}

export default function RevealedStock({
  cards = [],
  drag,
  handlePointerDown,
}: Props) {
  if (!cards.length) return null

  // const max = Math.max(cards.length - 3, 0)
  // const topThree = cards.slice(max).toReversed()
  const topCard = cards.at(-1) as CardType
  const isDragging = drag?.card?.id === topCard.id

  const secondCard = cards.at(-2)
  const thirdCard = cards.at(-3)

  return (
    <div className={styles.revealedStock}>
      {/* {topThree.slice(1, 3).map(({ suit, value }, idx) => (
        <Card
          key={idx}
          suit={suit}
          value={value}
          hidden={false}
          style={{
            right: idx + 1 * 46 + '%',
          }}
          className={styles.card}
        />
      ))} */}
      {thirdCard && (
        <Card
          suit={thirdCard.suit}
          value={thirdCard.value}
          hidden={false}
          className={styles.card}
          style={{
            right: '92%',
            zIndex: 0,
          }}
        />
      )}
      {secondCard && (
        <Card
          suit={secondCard.suit}
          value={secondCard.value}
          hidden={false}
          className={styles.card}
          style={{
            right: '46%',
            zIndex: 1,
          }}
        />
      )}
      <Card
        suit={topCard.suit}
        value={topCard.value}
        hidden={false}
        className={styles.card}
        onPointerDown={(e) => handlePointerDown(e, topCard)}
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
                zIndex: 2,
              }
        }
      />
    </div>
  )
}
