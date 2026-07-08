import type { Viewpoint } from '../../types/itinerary'
import { getImage } from '../../data/images'
import { Card } from '../primitives/Card'
import { Pill } from '../primitives/Pill'
import { Tag } from '../primitives/Tag'
import { MapButton } from '../primitives/MapButton'
import { MediaImage } from '../primitives/MediaImage'
import { PlaceName } from '../primitives/PlaceName'
import styles from './Viewpoints.module.css'

export function ViewpointCard({ viewpoint: vp }: { viewpoint: Viewpoint }) {
  return (
    <Card as="article" padded={false} className={styles.card}>
      <MediaImage
        image={getImage(vp.imageId)}
        name={vp.name}
        ratio={4 / 3}
        className={styles.media}
      />
      <div className={styles.body}>
        {vp.onlyIfClear ? <Tag variant="onlyIfClear">晴天才去</Tag> : null}
        <PlaceName name={vp.name} />
        <div className={styles.meta}>
          <Pill mono tone="tasman">
            {vp.driveTime}
          </Pill>
          <span className={styles.best}>{vp.bestTime}</span>
        </div>
        <p className={styles.note}>{vp.note}</p>
        {vp.map ? (
          <MapButton map={vp.map} label="导航" className={styles.map} />
        ) : null}
      </div>
    </Card>
  )
}
