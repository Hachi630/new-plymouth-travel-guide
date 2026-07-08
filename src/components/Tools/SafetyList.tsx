import type { SafetyItem } from '../../types/itinerary'
import styles from './Tools.module.css'

export function SafetyList({ items }: { items: SafetyItem[] }) {
  return (
    <ul className={styles.safetyList}>
      {items.map((s) => (
        <li key={s.id} className={styles.safetyRow}>
          {s.text}
        </li>
      ))}
    </ul>
  )
}
