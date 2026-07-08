import type { MountainViewing, WeatherMood } from '../types/itinerary'

/** One day of the Open-Meteo daily forecast, normalised. */
export interface DailyForecast {
  iso: string
  code: number
  tMax: number
  tMin: number
  precipSum: number
  precipProb: number
  wind: number
}

interface OpenMeteoDaily {
  time: string[]
  weather_code: number[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  precipitation_sum: number[]
  precipitation_probability_max: number[]
  wind_speed_10m_max: number[]
}

/** WMO weather interpretation codes → Chinese label. */
const WMO: Record<number, string> = {
  0: '晴',
  1: '大致晴朗',
  2: '局部多云',
  3: '阴',
  45: '雾',
  48: '雾凇',
  51: '小毛毛雨',
  53: '毛毛雨',
  55: '浓毛毛雨',
  56: '冻毛毛雨',
  57: '浓冻毛毛雨',
  61: '小雨',
  63: '中雨',
  65: '大雨',
  66: '冻雨',
  67: '强冻雨',
  71: '小雪',
  73: '中雪',
  75: '大雪',
  77: '雪粒',
  80: '阵雨',
  81: '强阵雨',
  82: '暴雨',
  85: '阵雪',
  86: '强阵雪',
  95: '雷暴',
  96: '雷暴伴冰雹',
  99: '强雷暴伴冰雹',
}

export function wmoText(code: number): string {
  return WMO[code] ?? '多云'
}

/** Heuristic mountain-viewing verdict from a day's forecast. */
export function viewingFromForecast(f: DailyForecast): MountainViewing {
  if (f.code >= 61 || f.precipProb >= 60 || f.precipSum >= 5) return 'no'
  if (f.code <= 1 && f.precipProb <= 25 && f.wind <= 35) return 'good'
  return 'maybe'
}

export function moodFromForecast(
  f: DailyForecast,
  viewing: MountainViewing,
): WeatherMood {
  if (viewing === 'good') return 'mountainWindow'
  if (f.code >= 51 || f.precipProb >= 60) return 'muted'
  return 'normal'
}

/**
 * Fetch a 16-day daily forecast from Open-Meteo (free, no key, CORS-enabled).
 * Cross-check with MetService / NIWA before departure — see the page note.
 */
export async function fetchForecast(
  lat: number,
  lng: number,
  signal?: AbortSignal,
): Promise<DailyForecast[]> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max' +
    '&timezone=Pacific%2FAuckland&forecast_days=16'

  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`Open-Meteo ${res.status}`)

  const json = (await res.json()) as { daily?: OpenMeteoDaily }
  const d = json.daily
  if (!d || !Array.isArray(d.time)) throw new Error('Open-Meteo: no daily data')

  return d.time.map((iso, i) => ({
    iso,
    code: d.weather_code[i] ?? 0,
    tMax: d.temperature_2m_max[i] ?? 0,
    tMin: d.temperature_2m_min[i] ?? 0,
    precipSum: d.precipitation_sum[i] ?? 0,
    precipProb: d.precipitation_probability_max[i] ?? 0,
    wind: d.wind_speed_10m_max[i] ?? 0,
  }))
}
