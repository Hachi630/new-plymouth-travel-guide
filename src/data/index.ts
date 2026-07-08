import type { TripData } from '../types/itinerary'
import { meta } from './trip'
import { weather } from './weather'
import { days } from './days'
import { viewpoints } from './viewpoints'
import { packing, food, budget, safety } from './tools'

/** Single import surface for components. */
export const trip: TripData = {
  meta,
  weather,
  days,
  viewpoints,
  tools: { packing, food, budget, safety },
}

export { getImage } from './images'
