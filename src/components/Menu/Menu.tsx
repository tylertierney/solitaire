import { useDispatch, useHistory } from '../../context/HistoryContext'
import { useTheme } from '../../context/ThemeContext'
import { CardFanIcon } from '../../svg/CardFanIcon'
import { moonIcon } from '../../svg/moon'
import { RefreshIcon } from '../../svg/RefreshIcon'
import { sunIcon } from '../../svg/sun'
import styles from './Menu.module.scss'

type Props = {
  onClose: () => void
}

export default function Menu({ onClose }: Props) {
  const { darkTheme, setDarkTheme } = useTheme()
  const { moves } = useHistory()
  const dispatch = useDispatch()

  return (
    <ul className={styles.ul}>
      <li className={`${styles.li} ${styles.moves}`}>
        <span>Moves:</span>
        <span>{moves.length - 1}</span>
      </li>
      <li className={`${styles.li}`}>
        <button
          className={`${styles.btn}`}
          onClick={() => setDarkTheme((prev) => !prev)}
        >
          <span>Toggle Theme</span>
          <span>{darkTheme ? sunIcon : moonIcon}</span>
        </button>
      </li>
      <li className={`${styles.li} ${styles.restart}`}>
        <button
          className={styles.btn}
          onClick={() => {
            dispatch({ type: 'restart' })
            onClose()
          }}
        >
          <span>Restart Current</span>
          <RefreshIcon
            width='28px'
            height='28px'
            stroke='white'
            strokeWidth={2.2}
          />
        </button>
      </li>
      <li className={`${styles.li} ${styles.newGame}`}>
        <button
          onClick={() => {
            dispatch({ type: 'newGame' })
            onClose()
          }}
          className={styles.btn}
        >
          <span>New Game</span>
          <CardFanIcon width='28px' height='28px' fill='white' />
        </button>
      </li>
    </ul>
  )
}
