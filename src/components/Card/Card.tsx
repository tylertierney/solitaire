import styles from './Card.module.scss'
import {
  type CSSProperties,
  type HTMLAttributes,
  type PropsWithChildren,
  type RefObject,
} from 'react'
import {
  suitToIconMap,
  type CardType,
  type CardValue,
  type Suit,
} from '../../models'

type Props = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onClick' | 'onPointerDown'
> & {
  suit: Suit
  value: CardValue
  hidden: boolean
  ref?: RefObject<HTMLDivElement | null>
  onClick?: (card: CardType) => void
  onPointerDown?: (e: React.PointerEvent<HTMLDivElement>) => void
  style?: CSSProperties
  className?: string
}

export default function Card({
  suit,
  value,
  hidden,
  ref,
  onClick,
  onPointerDown,
  style = {},
  className,
  children,
  ...rest
}: PropsWithChildren<Props>) {
  const icon = suitToIconMap[suit]({})

  return (
    <div
      ref={ref}
      className={`${className} ${styles.card} ${hidden ? styles.hidden : ''}`}
      style={style}
      {...rest}
      onPointerDown={(e) => {
        onPointerDown?.(e)
      }}
      onGotPointerCapture={(e) => {
        const target = e.target as HTMLDivElement
        target.releasePointerCapture(e.pointerId)
      }}
      onClick={() => onClick?.({ suit, value } as CardType)}
    >
      <div className={styles.inner}>
        <div className={`${styles.front} ${styles[suit]}`}>
          <div className={styles.top}>
            <span className={styles.value}>{value}</span>
            <span className={styles.value}>{value}</span>
            <span className={styles.icon}>
              {suitToIconMap[suit]({
                style: { width: 'inherit', height: 'inherit' },
              })}
            </span>
          </div>
          <div className={styles.middle}>
            {icon}
            {children}
          </div>
          <div className={styles.bottom}>
            <span className={styles.value}>{value}</span>
            <span className={styles.value}>{value}</span>
          </div>
        </div>
        <div className={styles.back}>
          <div className={styles.pattern}></div>
        </div>
      </div>
    </div>
  )
}
