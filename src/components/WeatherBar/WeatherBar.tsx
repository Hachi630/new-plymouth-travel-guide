import { useId, useState } from 'react'
import type { MountainViewing, WeatherDay } from '../../types/itinerary'
import { cx } from '../../lib/cx'
import { useLiveWeather } from '../../hooks/useLiveWeather'
import { Chevron } from '../primitives/Chevron'
import { Disclosure } from '../primitives/Disclosure'
import { Container } from '../layout/Container'
import styles from './WeatherBar.module.css'

/** New Plymouth — the forecast point for the whole weekend. */
const NEW_PLYMOUTH = { lat: -39.0556, lng: 174.0752 }

const mountainMeta: Record<MountainViewing, { text: string; cls: string }> = {
  good: { text: '看山佳', cls: 'mGood' },
  maybe: { text: '可搏', cls: 'mMaybe' },
  no: { text: '不宜', cls: 'mNo' },
}

function WeatherDetail({ day }: { day: WeatherDay }) {
  return (
    <div className={styles.detail}>
      <p className={styles.summary}>{day.summary}</p>
      {day.forecast ? <p className={styles.forecast}>{day.forecast}</p> : null}
      <p className={styles.detailText}>{day.detail}</p>
      {(day.hi || day.lo || day.rain || day.wind) && (
        <ul className={styles.stats}>
          {day.hi ? <li>最高 {day.hi}</li> : null}
          {day.lo ? <li>最低 {day.lo}</li> : null}
          {day.rain ? <li>降雨 {day.rain}</li> : null}
          {day.wind ? <li>风 {day.wind}</li> : null}
        </ul>
      )}
    </div>
  )
}

export function WeatherBar({
  days: baseDays,
  checkedOn,
}: {
  days: WeatherDay[]
  checkedOn: string
}) {
  const live = useLiveWeather(baseDays, NEW_PLYMOUTH.lat, NEW_PLYMOUTH.lng)
  const days = live.days
  const [openId, setOpenId] = useState<WeatherDay['id'] | null>(null)
  const panelId = useId()
  const headingId = useId()
  const active = days.find((d) => d.id === openId)

  const statusNote =
    live.status === 'loading'
      ? '读取实时预报中…'
      : live.status === 'live'
        ? `实时预报 Open-Meteo · 更新 ${live.updatedAt} · 复查 MetService / NIWA`
        : `排期数据(查于 ${checkedOn})· 复查 MetService / NIWA`

  const dotCls =
    live.status === 'live'
      ? styles.dotLive
      : live.status === 'loading'
        ? styles.dotLoading
        : styles.dotFallback

  return (
    <section className={styles.wrap} aria-labelledby={headingId}>
      <Container>
        <div className={styles.head}>
          <h2 id={headingId} className={styles.title}>
            本周末天气窗口
          </h2>
          <span className={styles.status} role="status">
            <span className={cx(styles.dot, dotCls)} aria-hidden="true" />
            {statusNote}
          </span>
        </div>

        <div className={styles.grid} role="group" aria-label="本周末三天天气,点击查看详情">
          {days.map((d) => {
            const m = mountainMeta[d.mountain]
            const isOpen = openId === d.id
            return (
              <button
                key={d.id}
                type="button"
                className={cx(styles.cell, styles[d.mood], isOpen && styles.open)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId((o) => (o === d.id ? null : d.id))}
              >
                <span className={styles.dayRow}>
                  <span className={styles.day}>{d.label}</span>
                  <span className={styles.date}>{d.date}</span>
                </span>
                <span className={cx(styles.mtn, styles[m.cls])}>{m.text}</span>
                <span className={styles.todo}>{d.whatToDo}</span>
                <Chevron open={isOpen} className={styles.chev} />
              </button>
            )
          })}
        </div>

        <Disclosure id={panelId} open={Boolean(active)}>
          {active ? <WeatherDetail day={active} /> : null}
        </Disclosure>
      </Container>
    </section>
  )
}
