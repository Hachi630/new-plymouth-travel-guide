import type { TimelineItem } from '../../types/itinerary'
import { getImage } from '../../data/images'
import { cx } from '../../lib/cx'
import { useExpandable } from '../../hooks/useExpandable'
import { Card } from '../primitives/Card'
import { Pill } from '../primitives/Pill'
import { Tag } from '../primitives/Tag'
import { Chevron } from '../primitives/Chevron'
import { Disclosure } from '../primitives/Disclosure'
import { MapButton } from '../primitives/MapButton'
import { MediaImage } from '../primitives/MediaImage'
import { PlaceName } from '../primitives/PlaceName'
import styles from './Timeline.module.css'

function CostTag({ item }: { item: TimelineItem }) {
  switch (item.cost) {
    case 'free':
      return <Tag variant="free">免费</Tag>
    case 'paid':
      return <Tag variant="paid">{item.costLabel ?? '收费'}</Tag>
    case 'food':
      return <Tag variant="food">美食</Tag>
    default:
      return null
  }
}

export function TimelineCard({
  item,
  isLast,
}: {
  item: TimelineItem
  isLast: boolean
}) {
  const exp = useExpandable(false)
  const image = getImage(item.imageId)
  // photos for real sights (image or mappable place), but not logistics rows (cost 'other')
  const showMedia = Boolean(item.imageId) || (Boolean(item.map) && item.cost !== 'other')
  const hasBody = Boolean(item.why || item.tips || item.map)

  return (
    <li className={cx(styles.item, isLast && styles.last)}>
      <span className={styles.dot} aria-hidden="true" />
      <Card as="article" padded={false} className={styles.card}>
        <div className={styles.head}>
          <div className={styles.slotRow}>
            <Pill mono tone="tasman">
              {item.timeSlot}
            </Pill>
            {item.conditional ? <Tag variant="onlyIfClear">晴天才去</Tag> : null}
          </div>
          <PlaceName name={item.name} className={styles.title} />
          <p className={styles.highlight}>{item.highlight}</p>
          <div className={styles.meta}>
            {item.duration ? <span className={styles.dur}>{item.duration}</span> : null}
            <CostTag item={item} />
            {item.category ? <Tag variant="other">{item.category}</Tag> : null}
          </div>
          {item.access ? <p className={styles.access}>{item.access}</p> : null}
        </div>

        {showMedia ? (
          <MediaImage
            image={image}
            name={item.name}
            ratio={16 / 9}
            className={styles.media}
          />
        ) : null}

        {hasBody ? (
          <div className={styles.footer}>
            <button className={styles.toggle} {...exp.buttonProps}>
              <span>{exp.open ? '收起' : '详情'}</span>
              <Chevron open={exp.open} />
            </button>
            <Disclosure id={exp.regionId} open={exp.open} className={styles.body}>
              {item.why ? (
                <p className={styles.para}>
                  <span className={styles.lead}>值得</span>
                  {item.why}
                </p>
              ) : null}
              {item.tips ? (
                <p className={styles.para}>
                  <span className={styles.lead}>提示</span>
                  {item.tips}
                </p>
              ) : null}
              {item.map ? <MapButton map={item.map} className={styles.map} /> : null}
            </Disclosure>
          </div>
        ) : null}
      </Card>
    </li>
  )
}
