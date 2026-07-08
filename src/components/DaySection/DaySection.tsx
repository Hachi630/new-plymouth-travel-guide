import type { Day } from '../../types/itinerary'
import { Container } from '../layout/Container'
import { DriveLegCard } from '../DriveLegCard/DriveLegCard'
import { Timeline } from '../Timeline/Timeline'
import styles from './DaySection.module.css'

interface DaySectionProps {
  day: Day
  /** id used as the tabpanel; the active tab points here via aria-controls. */
  panelId: string
}

export function DaySection({ day, panelId }: DaySectionProps) {
  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={`tab-${day.id}`}
      tabIndex={0}
      className={styles.panel}
    >
      <Container>
        <p className={styles.date}>{day.date}</p>
        <p className={styles.theme}>{day.theme}</p>
        {day.driveNote ? <p className={styles.note}>{day.driveNote}</p> : null}
        {day.driveLeg ? <DriveLegCard leg={day.driveLeg} /> : null}
        <Timeline items={day.items} />
      </Container>
    </div>
  )
}
