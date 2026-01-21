import styles from './Deck.module.scss'
import type { CardType } from '../../models'
import Card from '../Card/Card'

type Props = {
  cards: CardType[]
  onClick?: (card: CardType) => void
}

export default function Deck({ cards = [], onClick }: Props) {
  return (
    <div className={`${styles.deck}`}>
      {cards.map(({ suit, value, hidden }, idx) => (
        <Card
          key={idx}
          suit={suit}
          hidden={hidden}
          value={value}
          onClick={onClick}
          className={styles.card}
          style={{
            top: 0.15 * idx + 'px',
          }}
        />
      ))}
    </div>
  )
}
