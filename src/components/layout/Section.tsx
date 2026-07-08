import { useId, type ReactNode } from 'react'
import { cx } from '../../lib/cx'
import { VolcanoIcon } from '../icons/VolcanoIcon'
import styles from './Section.module.css'

interface SectionProps {
  title: string
  /** short subtitle shown next to the title. */
  sub?: string
  children: ReactNode
  className?: string
}

/** Semantic <section> with a cone-marked heading (§4 divider motif). */
export function Section({ title, sub, children, className }: SectionProps) {
  const hid = useId()
  return (
    <section className={cx(styles.section, className)} aria-labelledby={hid}>
      <div className={styles.head}>
        <h2 id={hid} className={styles.title}>
          <VolcanoIcon className={styles.icon} />
          {title}
        </h2>
        {sub ? <span className={styles.sub}>{sub}</span> : null}
      </div>
      {children}
    </section>
  )
}
