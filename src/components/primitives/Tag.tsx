import type { ReactNode } from 'react'
import type { CostType } from '../../types/itinerary'
import { cx } from '../../lib/cx'
import styles from './Tag.module.css'

type TagVariant = CostType | 'onlyIfClear'

interface TagProps {
  variant: TagVariant
  children: ReactNode
  className?: string
}

/** The single place cost-type → colour is defined (§6 legend + 美食 + 晴天才去). */
export function Tag({ variant, children, className }: TagProps) {
  return (
    <span className={cx(styles.tag, styles[variant], className)}>{children}</span>
  )
}
