import type { ChecklistItem } from '../../types/itinerary'
import { cx } from '../../lib/cx'
import { useSessionChecklist } from '../../hooks/useSessionChecklist'
import styles from './Tools.module.css'

export function Checklist({ items }: { items: ChecklistItem[] }) {
  const { isChecked, toggle, checkedCount } = useSessionChecklist(
    'npt.packing.v1',
    items,
  )

  return (
    <div>
      <p className={styles.progress}>
        已备 {checkedCount} / {items.length}
      </p>
      <ul className={styles.checklist}>
        {items.map((it) => {
          const done = isChecked(it.id)
          return (
            <li key={it.id}>
              <label className={cx(styles.check, done && styles.checkDone)}>
                <input
                  type="checkbox"
                  className={styles.cb}
                  checked={done}
                  onChange={() => toggle(it.id)}
                />
                <span className={styles.checkText}>{it.label}</span>
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
