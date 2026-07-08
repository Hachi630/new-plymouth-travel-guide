import { cx } from '../../lib/cx'
import styles from './Chevron.module.css'

/** Down chevron that rotates 180° when open (§7). Decorative. */
export function Chevron({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg
      className={cx(styles.icon, open && styles.open, className)}
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
