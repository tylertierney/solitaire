import ControlPanel from './components/ControlPanel/ControlPanel'
import GamePage from './components/GamePage/GamePage'
import { useHistory } from './context/HistoryContext'

export default function App() {
  const { moves, index } = useHistory()

  return (
    <>
      <GamePage gameState={moves[index]} />

      <ControlPanel />
    </>
  )
}
