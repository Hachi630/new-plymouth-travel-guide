import { useRef, type KeyboardEvent } from 'react'
import type { DayId } from '../../types/itinerary'
import { cx } from '../../lib/cx'
import { VolcanoIcon } from '../icons/VolcanoIcon'
import { Container } from '../layout/Container'
import styles from './DayTabs.module.css'

export interface DayTab {
  id: DayId
  tabLabel: string
}

interface DayTabsProps {
  days: DayTab[]
  activeId: DayId
  onChange: (id: DayId) => void
  /** id of the tabpanel the tabs control. */
  panelId: string
}

export function DayTabs({ days, activeId, onChange, panelId }: DayTabsProps) {
  const refs = useRef<Partial<Record<DayId, HTMLButtonElement | null>>>({})

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const count = days.length
    let nextIndex: number | null = null
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (index + 1) % count
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (index - 1 + count) % count
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = count - 1
        break
      default:
        return
    }
    e.preventDefault()
    const next = days[nextIndex]
    if (!next) return
    onChange(next.id)
    refs.current[next.id]?.focus()
  }

  return (
    <div className={styles.sticky}>
      <Container>
        <div className={styles.tablist} role="tablist" aria-label="行程日期">
          {days.map((d, i) => {
            const selected = d.id === activeId
            return (
              <button
                key={d.id}
                ref={(el) => {
                  refs.current[d.id] = el
                }}
                type="button"
                role="tab"
                id={`tab-${d.id}`}
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                className={cx(styles.tab, selected && styles.selected)}
                onClick={() => onChange(d.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <VolcanoIcon className={styles.icon} />
                <span className={styles.label}>{d.tabLabel}</span>
              </button>
            )
          })}
        </div>
      </Container>
    </div>
  )
}
