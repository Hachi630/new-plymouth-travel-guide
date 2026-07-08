import { useEffect, useState } from 'react'
import type { WeatherDay } from '../types/itinerary'
import {
  fetchForecast,
  moodFromForecast,
  viewingFromForecast,
  wmoText,
} from '../lib/forecast'

export type LiveStatus = 'loading' | 'live' | 'fallback'

export interface LiveWeather {
  status: LiveStatus
  /** static base days, with live fields merged where a matching date exists. */
  days: WeatherDay[]
  /** local time the forecast was fetched, e.g. "07-08 14:30". */
  updatedAt?: string
}

function fmtTime(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

/**
 * Fetch the live forecast once on mount and merge it over the static schedule.
 * The static data renders immediately (no blank state) and remains the fallback
 * if the request fails or the trip dates fall outside the forecast window.
 */
export function useLiveWeather(
  base: WeatherDay[],
  lat: number,
  lng: number,
): LiveWeather {
  const [state, setState] = useState<LiveWeather>({
    status: 'loading',
    days: base,
  })

  useEffect(() => {
    const ctrl = new AbortController()

    fetchForecast(lat, lng, ctrl.signal)
      .then((forecasts) => {
        const byIso = new Map(forecasts.map((f) => [f.iso, f]))
        const round = (n: number) => Math.round(n)
        let matched = 0

        const days = base.map((day) => {
          const f = byIso.get(day.iso)
          if (!f) return day
          matched++
          const viewing = viewingFromForecast(f)
          const desc = wmoText(f.code)
          const hint =
            viewing === 'good'
              ? '能见度佳,适合看山。'
              : viewing === 'no'
                ? '看山条件差,以室内 / 机动为主。'
                : '看山看运气,盯紧晴窗。'
          return {
            ...day,
            mountain: viewing,
            mood: moodFromForecast(f, viewing),
            summary: `${desc} · 最高 ${round(f.tMax)}° / 最低 ${round(f.tMin)}°`,
            forecast:
              `${desc},降雨概率 ${round(f.precipProb)}%` +
              (f.precipSum >= 0.5 ? `(约 ${f.precipSum}mm)` : '') +
              `,最大风速 ${round(f.wind)} km/h。${hint}`,
            hi: `${round(f.tMax)}°`,
            lo: `${round(f.tMin)}°`,
            rain: `${round(f.precipProb)}%`,
            wind: `${round(f.wind)} km/h`,
          }
        })

        if (matched === 0) {
          setState({ status: 'fallback', days: base })
        } else {
          setState({ status: 'live', days, updatedAt: fmtTime(new Date()) })
        }
      })
      .catch(() => {
        if (ctrl.signal.aborted) return
        setState({ status: 'fallback', days: base })
      })

    return () => ctrl.abort()
  }, [base, lat, lng])

  return state
}
