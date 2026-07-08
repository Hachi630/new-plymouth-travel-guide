import type { DriveLeg } from '../../types/itinerary'
import { buildMapUrl } from '../../lib/maps'
import { Card } from '../primitives/Card'
import { Pill } from '../primitives/Pill'
import styles from './DriveLegCard.module.css'

export function DriveLegCard({ leg }: { leg: DriveLeg }) {
  return (
    <Card
      as="section"
      className={styles.card}
      aria-label={`自驾:${leg.start.zh} 到 ${leg.end.zh}`}
    >
      <div className={styles.rail} aria-hidden="true">
        <span className={styles.dotStart} />
        <span className={styles.line} />
        <span className={styles.dotEnd} />
      </div>
      <div className={styles.body}>
        <p className={styles.route}>
          <span>{leg.start.zh}</span>
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
          <span>{leg.end.zh}</span>
        </p>
        <div className={styles.meta}>
          <Pill mono tone="tasman">
            {leg.driveTime}
          </Pill>
          {leg.route ? <span className={styles.sub}>{leg.route}</span> : null}
        </div>
        {leg.waypoints.length > 0 ? (
          <div className={styles.waypoints}>
            <span className={styles.wpLabel}>途经</span>
            {leg.waypoints.map((wp) => (
              <Pill key={wp.id} href={wp.map ? buildMapUrl(wp.map) : undefined}>
                {wp.name.zh}
              </Pill>
            ))}
          </div>
        ) : null}
        {leg.note ? <p className={styles.note}>{leg.note}</p> : null}
      </div>
    </Card>
  )
}
