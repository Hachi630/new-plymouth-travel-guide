import type { HTMLAttributes } from 'react'
import { cx } from '../../lib/cx'
import styles from './Card.module.css'

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'section' | 'li'
  padded?: boolean
}

/** Base surface: cloud bg, 14px radius, soft shadow. Single definition of the card look. */
export function Card({
  as: Tag = 'div',
  padded = true,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Tag className={cx(styles.card, padded && styles.padded, className)} {...rest}>
      {children}
    </Tag>
  )
}
