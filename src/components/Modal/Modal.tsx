import styles from './Modal.module.scss'
import type { FC, MouseEvent, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import { useEffect, useRef } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const Modal: FC<PropsWithChildren<Props>> = ({ isOpen, onClose, children }) => {
  const backdropRef = useRef<HTMLDivElement>(null)

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Close when clicking outside
  const onBackdropClick = (e: MouseEvent) => {
    if (e.target === backdropRef.current) {
      onClose()
    }
  }

  if (!isOpen) return null

  return createPortal(
    <div
      className={styles.backdrop}
      ref={backdropRef}
      onClick={onBackdropClick}
      aria-modal='true'
      role='dialog'
    >
      <div className={styles.modal}>{children}</div>
    </div>,
    document.body,
  )
}

export default Modal
