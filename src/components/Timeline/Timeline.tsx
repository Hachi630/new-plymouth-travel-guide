import type { TimelineItem } from '../../types/itinerary'
import { TimelineCard } from './TimelineCard'
import styles from './Timeline.module.css'

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className={styles.list}>
      {items.map((it, i) => (
        <TimelineCard key={it.id} item={it} isLast={i === items.length - 1} />
      ))}
    </ol>
  )
}
