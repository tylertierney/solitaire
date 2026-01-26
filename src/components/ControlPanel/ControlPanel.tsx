import { useState } from 'react'
import { useDispatch, useHistory } from '../../context/HistoryContext'
import { CardFanIcon } from '../../svg/CardFanIcon'
import { RedoIcon } from '../../svg/RedoIcon'
import { UndoIcon } from '../../svg/UndoIcon'
import styles from './ControlPanel.module.scss'
import Modal from '../Modal/Modal'
import Menu from '../Menu/Menu'

export default function ControlPanel() {
  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()
  const { moves, index } = useHistory()

  return (
    <>
      <div className={styles.controlPanel}>
        <button
          className={styles.btn}
          onClick={() => {
            setModalOpen(true)
          }}
        >
          <CardFanIcon fill='white' width='36px' height='36px' />
        </button>
        <button
          className={styles.btn}
          onClick={() => dispatch({ type: 'undo' })}
          disabled={index <= 0}
        >
          <UndoIcon height='36px' width='36px' strokeWidth={2} />
        </button>
        <button
          className={styles.btn}
          onClick={() => dispatch({ type: 'redo' })}
          disabled={index >= moves.length - 1}
        >
          <RedoIcon height='36px' width='36px' strokeWidth={2} />
        </button>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <Menu onClose={() => setModalOpen(false)} />
      </Modal>
    </>
  )
}
