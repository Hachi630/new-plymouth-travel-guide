import { useCallback, useId, useState } from 'react'

export interface Expandable {
  open: boolean
  toggle: () => void
  setOpen: (v: boolean) => void
  /** id to place on the collapsible region (Disclosure). */
  regionId: string
  /** ready-made props for the trigger <button> — keeps aria wiring correct & DRY. */
  buttonProps: {
    type: 'button'
    'aria-expanded': boolean
    'aria-controls': string
    onClick: () => void
  }
}

/** Local open/close state with a stable id for aria-controls wiring. */
export function useExpandable(initial = false): Expandable {
  const [open, setOpen] = useState(initial)
  const regionId = useId()
  const toggle = useCallback(() => setOpen((v) => !v), [])

  return {
    open,
    toggle,
    setOpen,
    regionId,
    buttonProps: {
      type: 'button',
      'aria-expanded': open,
      'aria-controls': regionId,
      onClick: toggle,
    },
  }
}
