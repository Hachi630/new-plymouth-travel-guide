import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'
import styles from './Container.module.css'

/** Centered max-width column (640px), full-width on mobile with 16px inset. */
export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cx(styles.container, className)}>{children}</div>
}
