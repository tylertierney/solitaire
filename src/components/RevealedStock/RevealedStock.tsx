import styles from './RevealedStock.module.scss'
import type { CardType } from '../../models'
import Card from '../Card/Card'
import { useDrag } from '../../context/DragContext'

type Props = {
  cards: CardType[]
}

export default function RevealedStock({ cards = [] }: Props) {
  const { drag, handlePointerDown } = useDrag()
  if (!cards.length) return null

  const topCard = cards.at(-1) as CardType
  const isDragging = drag?.card?.id === topCard.id

  const secondCard = cards.at(-2)
  const thirdCard = cards.at(-3)

  return (
    <div className={styles.revealedStock}>
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
                zIndex: 10,
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
