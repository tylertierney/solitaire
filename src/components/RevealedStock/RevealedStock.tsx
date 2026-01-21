import styles from './RevealedStock.module.scss'
import type { CardType } from '../../models'
import Card from '../Card/Card'

type Props = {
  cards: CardType[]
}

export default function RevealedStock({ cards = [] }: Props) {
  const max = Math.max(cards.length - 3, 0)

  const topThree = cards.slice(max).toReversed()

  return (
    <div className={styles.revealedStock}>
      {topThree.map(({ suit, value }, idx) => (
        <Card
          key={idx}
          suit={suit}
          value={value}
          hidden={false}
          style={{
            right: idx * 46 + '%',
            // zIndex: 3 - idx
          }}
          className={styles.card}
        />
      ))}
      {/* {cards.map(({ suit, value }) => (
        <p>{value}</p>
      ))} */}
    </div>
  )
}
