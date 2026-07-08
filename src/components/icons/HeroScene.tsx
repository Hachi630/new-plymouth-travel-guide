/**
 * Signature illustration (design doc §4): symmetric snow-capped Taranaki cone +
 * sea horizon + an ember coastal-path curve. Decorative — the Hero carries the
 * real heading text, so this is aria-hidden. Colours are the design tokens.
 */
export function HeroScene({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 800 520"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EAF0EF" />
          <stop offset="62%" stopColor="#E4EBEA" />
          <stop offset="100%" stopColor="#F1DFD1" />
        </linearGradient>
        <linearGradient id="hero-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B5D66" />
          <stop offset="100%" stopColor="#08434A" />
        </linearGradient>
        <radialGradient id="hero-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DB6B3A" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#DB6B3A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* sky */}
      <rect x="0" y="0" width="800" height="520" fill="url(#hero-sky)" />
      {/* sunset glow behind the cone */}
      <circle cx="400" cy="300" r="230" fill="url(#hero-sun)" />

      {/* cone */}
      <path d="M400 118 L590 380 H210 Z" fill="#16201F" />
      {/* snow cap with a soft wavy base */}
      <path
        d="M400 118 L470 214 Q432 228 400 214 Q366 202 330 214 Z"
        fill="#FFFFFF"
      />

      {/* sea band + horizon */}
      <rect x="0" y="380" width="800" height="52" fill="url(#hero-sea)" />
      <line x1="0" y1="380" x2="800" y2="380" stroke="#08434A" strokeWidth="1.5" />

      {/* beach / foreground */}
      <rect x="0" y="432" width="800" height="88" fill="#E8EDEC" />
      <path
        d="M0 432 Q200 420 400 432 T800 432 V520 H0 Z"
        fill="#DCE6E4"
      />

      {/* ember coastal path curving through the foreground */}
      <path
        d="M92 516 C 240 486 322 468 424 474 C 526 480 626 470 716 440"
        fill="none"
        stroke="#DB6B3A"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M92 516 C 240 486 322 468 424 474 C 526 480 626 470 716 440"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="2 22"
        opacity="0.85"
      />

      {/* thin mist band across the cone */}
      <path
        d="M250 322 Q400 306 552 324"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.28"
      />
    </svg>
  )
}
