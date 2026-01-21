import styles from './App.module.scss'
import GamePage from './components/GamePage/GamePage'
import { useDispatch, useHistory } from './context/GameContext'

export default function App() {
  const { moves, index } = useHistory()
  const dispatch = useDispatch()

  return (
    <>
      <GamePage gameState={moves[index]} />

      <div className={styles.footer}>
        <button onClick={() => dispatch({ type: 'undo' })}>undoooo</button>
        <button onClick={() => dispatch({ type: 'redo' })}>redo</button>
      </div>
    </>
  )
}
