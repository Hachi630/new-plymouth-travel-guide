import type { BudgetRow } from '../../types/itinerary'
import { cx } from '../../lib/cx'
import styles from './Tools.module.css'

export function BudgetTable({ rows }: { rows: BudgetRow[] }) {
  return (
    <div className={styles.tableScroll}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">项目</th>
            <th scope="col">说明</th>
            <th scope="col">金额</th>
            <th scope="col">人均</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className={cx(r.total && styles.totalRow)}>
              <th scope="row">{r.item}</th>
              <td className={styles.tdNote}>{r.note}</td>
              <td className={styles.num}>{r.amount}</td>
              <td className={styles.num}>{r.perPerson ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
