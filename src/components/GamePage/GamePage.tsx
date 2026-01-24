import { useDispatch } from '../../context/HistoryContext'
import type { CardType, GameState } from '../../models'
import Deck from '../Deck/Deck'
import RevealedStock from '../RevealedStock/RevealedStock'
import Tower from '../Tower/Tower'
import styles from './GamePage.module.scss'

type Props = {
  gameState: GameState
  className?: string
}

export type DragState = {
  card: CardType | null
  offsetX: number
  offsetY: number
  x: number
  y: number
  width: number
  height: number
}

export default function GamePage({ gameState, className = '' }: Props) {
  const dispatch = useDispatch()

  const { foundations, stockpile, tableau } = gameState

  const blankSpaces = Array(7).fill(null)

  return (
    <>
      <div className={`${styles.gamePage} ${className}`}>
        {foundations.map((cards, idx) => {
          return (
            <div
              key={idx}
              className={`${styles.cell} ${styles.foundationCell}`}
              data-foundation={idx}
              data-dropzone={true}
              style={{ border: 'none !important' }}
            >
              <span className={styles.foundationLabel}>A</span>
              <Deck cards={cards} allowDragFromTop={true} />
            </div>
          )
        })}

        <div className={`${styles.cell} ${styles.blankCell}`}></div>

        <div className={`${styles.cell}`}>
          <RevealedStock cards={stockpile[0]} />
        </div>

        <div className={`${styles.cell} ${styles.stockpileCell}`}>
          {stockpile[1].length ? (
            <Deck
              onClick={() => dispatch({ type: 'revealStock' })}
              cards={stockpile[1]}
              style={{ zIndex: 1 }}
            />
          ) : null}
          <span
            className={styles.refreshIcon}
            onClick={() => {
              if (!stockpile[1].length) {
                dispatch({ type: 'refreshStockpile' })
              }
            }}
          >
            refresh
          </span>
        </div>

        {tableau.map((cards, idx) => {
          return (
            <div
              key={idx}
              className={`${styles.cell} ${styles.tableauCell}`}
              data-tableau={idx}
              data-dropzone={true}
            >
              <Tower cards={cards} />
            </div>
          )
        })}

        {blankSpaces.map((_, idx) => (
          <div key={idx} className={`${styles.cell} ${styles.blankCell}`}></div>
        ))}
      </div>
    </>
  )
}
