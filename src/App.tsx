import { useId, useState } from 'react'
import type { DayId } from './types/itinerary'
import { trip } from './data'
import { Hero } from './components/Hero/Hero'
import { WeatherBar } from './components/WeatherBar/WeatherBar'
import { DayTabs } from './components/DayTabs/DayTabs'
import { DaySection } from './components/DaySection/DaySection'
import { ViewpointsSection } from './components/Viewpoints/ViewpointsSection'
import { ToolsAccordion } from './components/Tools/ToolsAccordion'
import { Footer } from './components/Footer/Footer'
import styles from './App.module.css'

export default function App() {
  const [activeDay, setActiveDay] = useState<DayId>('day1')
  const panelId = useId()
  const active = trip.days.find((d) => d.id === activeDay) ?? trip.days[0]

  return (
    <>
      <Hero title={trip.meta.title} subtitle={trip.meta.subtitle} />
      <main className={styles.main}>
        <WeatherBar days={trip.weather} checkedOn={trip.meta.weatherCheckedOn} />
        <DayTabs
          days={trip.days.map((d) => ({ id: d.id, tabLabel: d.tabLabel }))}
          activeId={activeDay}
          onChange={setActiveDay}
          panelId={panelId}
        />
        {active ? (
          <DaySection key={active.id} day={active} panelId={panelId} />
        ) : null}
        <ViewpointsSection viewpoints={trip.viewpoints} />
        <ToolsAccordion tools={trip.tools} />
      </main>
      <Footer checkedOn={trip.meta.weatherCheckedOn} />
    </>
  )
}
