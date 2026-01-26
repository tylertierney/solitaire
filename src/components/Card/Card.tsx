import styles from './Card.module.scss'
import {
  type CSSProperties,
  type HTMLAttributes,
  type MouseEvent,
  type PropsWithChildren,
  type RefObject,
} from 'react'
import { suitToIconMap, type CardType } from '../../models'
import CardTop from './CardTop/CardTop'

type Props = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onClick' | 'onPointerDown'
> & {
  card: CardType
  ref?: RefObject<HTMLDivElement | null>
  onClick?: (e: MouseEvent<HTMLDivElement>, card: CardType) => void
  onPointerDown?: (e: React.PointerEvent<HTMLDivElement>) => void
  style?: CSSProperties
  className?: string
}

export default function Card({
  card,
  ref,
  onClick,
  onPointerDown,
  style = {},
  className,
  children,
  ...rest
}: PropsWithChildren<Props>) {
  const { suit, value, hidden } = card
  const icon = suitToIconMap[suit]({ style: { height: '100%', width: '100%' } })

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
      onClick={(e) => {
        onClick?.(e, card)
      }}
    >
      <div className={styles.inner}>
        <div className={`${styles.front} ${styles[suit]}`}>
          <div className={styles.top}>
            <CardTop suit={suit} value={value} />
          </div>
          <div className={styles.middle}>
            {icon}
            {children}
          </div>
          <CardTop
            value={value}
            suit={suit}
            style={{ flexDirection: 'row-reverse' }}
            className={styles.bottom}
          />
        </div>
        <div className={styles.back}>
          <div className={styles.pattern}></div>
        </div>
      </div>
    </div>
  )
}
