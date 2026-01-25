import { useDispatch } from '../../context/HistoryContext'
import type { GameState } from '../../models'
import { RefreshIcon } from '../../svg/RefreshIcon'
import Deck from '../Deck/Deck'
import RevealedStock from '../RevealedStock/RevealedStock'
import Tower from '../Tower/Tower'
import styles from './GamePage.module.scss'

type Props = {
  gameState: GameState
  className?: string
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

        <div
          onClick={() => {
            if (stockpile[1].length) {
              dispatch({ type: 'revealStock' })
            } else {
              dispatch({ type: 'refreshStockpile' })
            }
          }}
          className={`${styles.cell} ${styles.stockpileCell}`}
        >
          <span className={styles.refreshIcon}>
            <RefreshIcon
              width='56px'
              height='56px'
              stroke='#999'
              strokeWidth={1.8}
            />
          </span>
          {stockpile[1].length ? (
            <Deck cards={stockpile[1]} style={{ zIndex: 1 }} />
          ) : null}
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
          <div
            data-tableau={idx}
            data-dropzone={true}
            key={idx}
            className={`${styles.cell} ${styles.blankCell}`}
          ></div>
        ))}
      </div>
    </>
  )
}
