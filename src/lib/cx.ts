export type ClassValue = string | false | null | undefined

/** Join truthy class names. Avoids pulling in the `classnames` dependency. */
export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
