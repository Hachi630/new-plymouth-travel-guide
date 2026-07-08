import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'
import styles from './Pill.module.css'

interface PillProps {
  children: ReactNode
  mono?: boolean
  tone?: 'tasman' | 'neutral' | 'ember' | 'fern'
  /** when set, the pill renders as a link opening in a new tab. */
  href?: string
  className?: string
}

/** Rounded 999px chip. Polymorphic: a link when `href` is set, otherwise a span. */
export function Pill({ children, mono, tone = 'neutral', href, className }: PillProps) {
  const cls = cx(styles.pill, mono && styles.mono, styles[tone], className)
  if (href) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return <span className={cls}>{children}</span>
}
