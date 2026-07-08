import { useState } from 'react'
import type { BilingualName, PlaceImage } from '../../types/itinerary'
import { cx } from '../../lib/cx'
import { VolcanoIcon } from '../icons/VolcanoIcon'
import styles from './MediaImage.module.css'

interface MediaImageProps {
  image?: PlaceImage
  /** used for alt fallback and the placeholder label. */
  name: BilingualName
  /** width / height aspect ratio; reserves space to avoid layout shift. */
  ratio?: number
  loading?: 'lazy' | 'eager'
  className?: string
}

/**
 * Remote photo with a graceful on-brand fallback: if there's no URL, or it
 * fails to load, an on-brand gradient placeholder with the place name is shown.
 */
export function MediaImage({
  image,
  name,
  ratio = 16 / 9,
  loading = 'lazy',
  className,
}: MediaImageProps) {
  const [failed, setFailed] = useState(false)
  const url = failed ? undefined : image?.url
  const alt = image?.alt ?? `${name.zh}（${name.en}）`

  return (
    <figure className={cx(styles.frame, className)} style={{ aspectRatio: `${ratio}` }}>
      {url ? (
        <img
          className={styles.img}
          src={url}
          alt={alt}
          loading={loading}
          decoding="async"
          style={{ objectPosition: image?.focal ?? 'center' }}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className={styles.placeholder} role="img" aria-label={alt}>
          <VolcanoIcon className={styles.placeholderIcon} />
          <span className={styles.placeholderZh}>{name.zh}</span>
          {name.en ? (
            <span className={styles.placeholderEn} lang="en">
              {name.en}
            </span>
          ) : null}
        </div>
      )}
      {url && image?.credit ? (
        <figcaption className={styles.caption}>{image.credit}</figcaption>
      ) : null}
    </figure>
  )
}
