/* ============================================================
   Domain types for the trip guide.
   Content (data/*.ts) is authored against these; components consume them.
   ============================================================ */

/** Chinese-primary, English-secondary place name. */
export interface BilingualName {
  zh: string
  en: string
}

/**
 * Cost / activity classification → drives the Tag colour.
 *  free  → Fern green   paid → Ember
 *  food  → warm neutral (美食)   other → grey outline
 */
export type CostType = 'free' | 'paid' | 'food' | 'other'

/** A map target: a free-text search query or explicit coordinates. */
export type MapQuery =
  | { kind: 'query'; q: string }
  | { kind: 'coords'; lat: number; lng: number; label?: string }

/** Entry in the image registry (data/images.ts). */
export interface PlaceImage {
  url: string
  alt: string
  /** Attribution shown as a caption (CC / Wikimedia / photographer). */
  credit?: string
  focal?: 'center' | 'top' | 'bottom'
}

/** A single itinerary stop on a day's timeline. */
export interface TimelineItem {
  id: string
  /** mono time-slot chip, e.g. "日落 ~17:15" / "清早 ~07:00". */
  timeSlot: string
  name: BilingualName
  /** one-line hook. */
  highlight: string
  /** walk / drive from the accommodation, e.g. "🚶 ~7 min · 🚗 ~2 min". */
  access?: string
  /** human string, e.g. "来回约 5h"; not computed. */
  duration?: string
  cost: CostType
  /** optional override for the cost tag label. */
  costLabel?: string
  /** free-text category label (grey outline tag). */
  category?: string
  /** expandable body — why it's worth it. */
  why?: string
  /** expandable body — practical tips. */
  tips?: string
  map?: MapQuery
  /** key into the image registry. */
  imageId?: string
  /** true → show an ember "晴天才去" hint. */
  conditional?: boolean
}

export interface Waypoint {
  id: string
  name: BilingualName
  map?: MapQuery
}

export interface DriveLeg {
  id: string
  start: BilingualName
  end: BilingualName
  /** mono, e.g. "约 360km / 5–5.5h". */
  driveTime: string
  /** sub-note, e.g. "SH3,经 Hamilton / Te Kuiti". */
  route?: string
  waypoints: Waypoint[]
  note?: string
}

export type DayId = 'day1' | 'day2' | 'day3'

export interface Day {
  id: DayId
  /** tab label, e.g. "Day1 路上·日落". */
  tabLabel: string
  /** short date, e.g. "周五 7/10". */
  date: string
  /** theme sentence shown at the top of the day. */
  theme: string
  /** driving / weather note under the theme. */
  driveNote?: string
  driveLeg?: DriveLeg
  items: TimelineItem[]
}

export interface Viewpoint {
  id: string
  name: BilingualName
  /** mono, e.g. "~10min". */
  driveTime: string
  /** best timing, e.g. "日出/日落". */
  bestTime: string
  note: string
  map?: MapQuery
  imageId?: string
  /** true → ember "晴天才去" tag. */
  onlyIfClear?: boolean
}

export type MountainViewing = 'good' | 'maybe' | 'no'
export type WeatherMood = 'normal' | 'muted' | 'mountainWindow'

export interface WeatherDay {
  id: 'fri' | 'sat' | 'sun'
  /** "周五". */
  label: string
  /** "7/10" (display). */
  date: string
  /** ISO date "2026-07-10" — used to match the live forecast. */
  iso: string
  /** one-line "该干嘛" shown in the bar (itinerary plan, not weather). */
  whatToDo: string
  mountain: MountainViewing
  mood: WeatherMood
  /** 概况 — headline for the expanded detail (live short forecast when available). */
  summary: string
  /** planning prose for the expanded detail. */
  detail: string
  /** live one-line forecast sentence (set at runtime from Open-Meteo). */
  forecast?: string
  hi?: string
  lo?: string
  rain?: string
  wind?: string
}

export interface BudgetRow {
  id: string
  item: string
  note: string
  /** e.g. "$80–95"; kept as string to allow ranges. */
  amount: string
  perPerson?: string
  /** emphasise the total row. */
  total?: boolean
}

export interface ChecklistItem {
  id: string
  label: string
}

export interface FoodItem {
  id: string
  name: BilingualName
  note: string
  /** which day + walk/drive from the accommodation. */
  access?: string
  map?: MapQuery
}

export interface SafetyItem {
  id: string
  text: string
}

export interface TripMeta {
  title: string
  subtitle: string
  travellers: number
  /** small print under the weather bar / footer. */
  weatherCheckedOn: string
}

export interface ToolsData {
  packing: ChecklistItem[]
  food: FoodItem[]
  budget: BudgetRow[]
  safety: SafetyItem[]
}

export interface TripData {
  meta: TripMeta
  weather: WeatherDay[]
  days: Day[]
  viewpoints: Viewpoint[]
  tools: ToolsData
}
