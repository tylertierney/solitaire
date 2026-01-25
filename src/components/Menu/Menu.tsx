import { useDispatch, useHistory } from '../../context/HistoryContext'
import { useTheme } from '../../context/ThemeContext'
import { CardFanIcon } from '../../svg/CardFanIcon'
import styles from './Menu.module.scss'

type Props = {
  onNewGame: () => void
}

export default function Menu({ onNewGame }: Props) {
  const { darkTheme, setDarkTheme } = useTheme()
  const { moves } = useHistory()
  const dispatch = useDispatch()

  return (
    <ul className={styles.ul}>
      <li className={`${styles.li} ${styles.moves}`}>
        <span>Moves:</span>
        <span>{moves.length}</span>
      </li>
      <li className={`${styles.li}`}>
        <span>Toggle theme</span>
        <button onClick={() => setDarkTheme((prev) => !prev)}>
          {darkTheme ? 'light' : 'dark'}
        </button>
      </li>
      <li className={`${styles.li} ${styles.newGame}`}>
        <button
          onClick={() => {
            dispatch({ type: 'reset' })
            onNewGame()
          }}
          className={styles.btn}
        >
          <span>New Game?</span>
          <CardFanIcon width='28px' height='28px' fill='white' />
        </button>
      </li>
    </ul>
  )
}
