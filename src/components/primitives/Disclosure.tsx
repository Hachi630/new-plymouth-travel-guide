import { useEffect, useRef, type ReactNode } from 'react'
import { cx } from '../../lib/cx'
import styles from './Disclosure.module.css'

interface DisclosureProps {
  /** must match the trigger button's aria-controls. */
  id: string
  open: boolean
  children: ReactNode
  /** applied to the inner content wrapper (e.g. padding). */
  className?: string
}

/**
 * Accessible collapsible region animated via grid-template-rows 0fr→1fr (§7).
 * Kept mounted for the animation, so when closed it is marked inert + aria-hidden
 * to keep collapsed content out of the tab order and off the a11y tree.
 */
export function Disclosure({ id, open, children, className }: DisclosureProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // `inert` isn't in React 18's JSX types — set it imperatively.
    if (open) el.removeAttribute('inert')
    else el.setAttribute('inert', '')
  }, [open])

  return (
    <div
      ref={ref}
      id={id}
      className={cx(styles.region, open && styles.open)}
      aria-hidden={!open}
    >
      <div className={styles.inner}>
        <div className={className}>{children}</div>
      </div>
    </div>
  )
}
