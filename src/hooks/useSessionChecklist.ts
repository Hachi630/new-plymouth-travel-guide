import { useCallback, useEffect, useState } from 'react'
import type { ChecklistItem } from '../types/itinerary'

function read(key: string): Set<string> {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return new Set()
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed.filter((x): x is string => typeof x === 'string'))
  } catch {
    return new Set()
  }
}

export interface ChecklistState {
  isChecked: (id: string) => boolean
  toggle: (id: string) => void
  reset: () => void
  checkedCount: number
}

/**
 * Checklist checked-state persisted to sessionStorage (§ "本会话内保留").
 * Falls back to pure in-memory state if storage is unavailable (private mode).
 */
export function useSessionChecklist(
  storageKey: string,
  items: ChecklistItem[],
): ChecklistState {
  const [checked, setChecked] = useState<Set<string>>(() => read(storageKey))

  useEffect(() => {
    try {
      const valid = new Set(items.map((i) => i.id))
      const toStore = [...checked].filter((id) => valid.has(id))
      sessionStorage.setItem(storageKey, JSON.stringify(toStore))
    } catch {
      /* storage unavailable — keep working in memory only */
    }
  }, [checked, items, storageKey])

  const isChecked = useCallback((id: string) => checked.has(id), [checked])

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const reset = useCallback(() => setChecked(new Set()), [])

  return { isChecked, toggle, reset, checkedCount: checked.size }
}
