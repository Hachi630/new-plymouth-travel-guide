import type { FoodItem } from '../../types/itinerary'
import { MapButton } from '../primitives/MapButton'
import { PlaceName } from '../primitives/PlaceName'
import styles from './Tools.module.css'

export function FoodList({ items }: { items: FoodItem[] }) {
  return (
    <ul className={styles.foodList}>
      {items.map((f) => (
        <li key={f.id} className={styles.foodRow}>
          <div className={styles.foodInfo}>
            <PlaceName name={f.name} />
            <p className={styles.foodNote}>{f.note}</p>
          </div>
          {f.map ? (
            <MapButton map={f.map} label="导航" className={styles.foodMap} />
          ) : null}
        </li>
      ))}
    </ul>
  )
}
