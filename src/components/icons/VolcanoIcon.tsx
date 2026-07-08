interface VolcanoIconProps {
  className?: string
  /** provide a title to expose the icon to assistive tech; otherwise decorative. */
  title?: string
}

/** Small symmetric cone glyph (currentColor). Reused in day tabs & image placeholders. */
export function VolcanoIcon({ className, title }: VolcanoIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {/* symmetric cone with a small summit crater dip */}
      <path
        d="M10.6 6.2 Q12 4.6 13.4 6.2 L21 20 H3 Z"
        fill="currentColor"
      />
    </svg>
  )
}
