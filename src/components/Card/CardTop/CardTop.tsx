import type { HTMLAttributes } from 'react'
import styles from './CardTop.module.scss'
import { suitToIconMap, type CardValue, type Suit } from '../../../models'

interface Props extends HTMLAttributes<HTMLDivElement> {
  value: CardValue
  suit: Suit
}

export default function CardTop({
  value,
  suit,
  className = '',
  ...rest
}: Props) {
  return (
    <div className={`${styles.cardTop} ${className}`} {...rest}>
      <span className={styles.value}>{value}</span>
      <span className={styles.icon}>
        {suitToIconMap[suit]({
          style: { width: 'inherit', height: 'inherit' },
        })}
      </span>
    </div>
  )
}
