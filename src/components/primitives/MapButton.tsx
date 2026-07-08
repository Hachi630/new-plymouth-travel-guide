import type { MapQuery } from '../../types/itinerary'
import { buildMapUrl } from '../../lib/maps'
import { cx } from '../../lib/cx'
import styles from './MapButton.module.css'

interface MapButtonProps {
  map: MapQuery
  label?: string
  className?: string
}

/** [打开地图] — a link (it navigates) styled as a button, opening a new tab. */
export function MapButton({ map, label = '打开地图', className }: MapButtonProps) {
  return (
    <a
      className={cx(styles.btn, className)}
      href={buildMapUrl(map)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        className={styles.pin}
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M12 21s7-5.686 7-11a7 7 0 1 0-14 0c0 5.314 7 11 7 11Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2.4" fill="currentColor" />
      </svg>
      <span>{label}</span>
      <span className="visually-hidden">（在新标签打开）</span>
    </a>
  )
}
