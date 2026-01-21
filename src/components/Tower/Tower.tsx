import styles from './Tower.module.scss'
import type { CardType } from '../../models'
import Card from '../Card/Card'

type Props = {
  cards: CardType[]
  onClick?: (card: CardType) => void
}

export default function Tower({ cards = [], onClick }: Props) {
  return (
    <div className={`${styles.tower}`}>
      {cards.map(({ suit, value, hidden }, idx) => (
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
    </div>
  )
}
