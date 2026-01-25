import { useDispatch } from '../../context/HistoryContext'
import { CardFanIcon } from '../../svg/CardFanIcon'
import { RedoIcon } from '../../svg/RedoIcon'
import { UndoIcon } from '../../svg/UndoIcon'
import styles from './ControlPanel.module.scss'

export default function ControlPanel() {
  const dispatch = useDispatch()

  return (
    <div className={styles.controlPanel}>
      <button
        className={styles.btn}
        onClick={() => dispatch({ type: 'reset' })}
      >
        {/* <RefreshIcon height='36px' width='36px' strokeWidth={2} /> */}
        <CardFanIcon fill='white' width='36px' height='36px' />
      </button>
      <button className={styles.btn} onClick={() => dispatch({ type: 'undo' })}>
        <UndoIcon height='36px' width='36px' strokeWidth={2} />
      </button>
      <button className={styles.btn} onClick={() => dispatch({ type: 'redo' })}>
        <RedoIcon height='36px' width='36px' strokeWidth={2} />
      </button>
    </div>
  )
}
