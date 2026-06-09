'use client'

import { ReactNode, useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './Portal.module.css'

type PortalProps = {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  title: string
}

export default function Portal({
  children,
  isOpen,
  onClose,
  title,
}: PortalProps) {
  const [mounted, setMounted] = useState(false)
  const titleId = useId()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  if (!mounted || !isOpen) {
    return null
  }

  return createPortal(
    <div
      aria-labelledby={titleId}
      aria-modal="true"
      className={`modal modal-open ${styles.modal}`}
      role="dialog"
    >
      <div className={`modal-box ${styles.box}`}>
        <div className={styles.header}>
          <h2 className={styles.title} id={titleId}>
            {title}
          </h2>
          <button
            aria-label="Close modal"
            className={`btn btn-ghost ${styles.closeButton}`}
            onClick={onClose}
            type="button"
          >
            x
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <button
        aria-label="Close modal backdrop"
        className="modal-backdrop"
        onClick={onClose}
        type="button"
      />
    </div>,
    document.body,
  )
}
