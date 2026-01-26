import styles from './RevealedStock.module.scss'
import type { CardType } from '../../models'
import Card from '../Card/Card'
import { useDrag } from '../../context/DragContext'
import { useDispatch } from '../../context/HistoryContext'

type Props = {
  cards: CardType[]
}

export default function RevealedStock({ cards = [] }: Props) {
  const { drag, handlePointerDown } = useDrag()
  const dispatch = useDispatch()

  if (!cards.length) return null

  const topCard = cards.at(-1) as CardType
  const isDragging = drag?.card?.id === topCard.id

  const secondCard = cards.at(-2)
  const thirdCard = cards.at(-3)

  return (
    <div className={styles.revealedStock}>
      {thirdCard && (
        <Card
          card={thirdCard}
          className={styles.card}
          style={{
            right: '92%',
            zIndex: 0,
          }}
        />
      )}
      {secondCard && (
        <Card
          card={secondCard}
          className={styles.card}
          style={{
            right: '46%',
            zIndex: 1,
          }}
        />
      )}
      <Card
        card={topCard}
        className={styles.card}
        onPointerDown={(e) => handlePointerDown(e, topCard)}
        onClick={() => {
          dispatch({ type: 'clickCard', card: topCard })
        }}
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
