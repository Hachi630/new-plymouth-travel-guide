import type { BilingualName } from '../../types/itinerary'
import { cx } from '../../lib/cx'
import styles from './PlaceName.module.css'

interface PlaceNameProps {
  name: BilingualName
  className?: string
}

/** Bilingual title: Chinese primary + English secondary wrapped in lang="en". */
export function PlaceName({ name, className }: PlaceNameProps) {
  return (
    <span className={cx(styles.root, className)}>
      <span className={styles.zh}>{name.zh}</span>
      {name.en ? (
        <span className={styles.en} lang="en">
          {name.en}
        </span>
      ) : null}
    </span>
  )
}
