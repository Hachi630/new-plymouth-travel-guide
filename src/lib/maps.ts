import type { MapQuery } from '../types/itinerary'

/** Terse constructors so the data layer reads cleanly. */
export const q = (query: string): MapQuery => ({ kind: 'query', q: query })
export const coords = (lat: number, lng: number, label?: string): MapQuery => ({
  kind: 'coords',
  lat,
  lng,
  label,
})

/**
 * Build a Google Maps URL using the documented, stable Maps URL scheme.
 * Text queries and "lat,lng" are both URL-encoded.
 */
export function buildMapUrl(target: MapQuery): string {
  const base = 'https://www.google.com/maps/search/?api=1&query='
  if (target.kind === 'coords') {
    return base + encodeURIComponent(`${target.lat},${target.lng}`)
  }
  return base + encodeURIComponent(target.q)
}
