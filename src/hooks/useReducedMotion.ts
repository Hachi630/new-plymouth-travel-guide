import { useMediaQuery } from './useMediaQuery'

/** True when the user has requested reduced motion (§7). */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
