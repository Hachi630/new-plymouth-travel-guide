import { Container } from '../layout/Container'
import styles from './Footer.module.css'

export function Footer({ checkedOn }: { checkedOn: string }) {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div>
            <h2 className={styles.h}>游客中心</h2>
            <p className={styles.p}>
              Puke Ariki i-SITE / North Taranaki 游客中心 —— 拿地图,问山况、路况、潮汐。
            </p>
          </div>
          <div>
            <h2 className={styles.h}>停车</h2>
            <p className={styles.p}>
              市区多付费 / 限时;景点与海滨多免费。北 Egmont 因施工车位有限(至 2026/12)。
            </p>
          </div>
          <div>
            <h2 className={styles.h}>步道 & 山况</h2>
            <p className={styles.p}>出行前查 DOC + NIWA;冬季山况多变,量力而行、随时可折返。</p>
          </div>
        </div>

        <div className={styles.emergency}>
          <span className={styles.emLabel}>应急电话</span>
          <a href="tel:111" className={styles.tel}>
            111
          </a>
        </div>

        <p className={styles.fine}>
          汇率 / 油价 / 天气均为 {checkedOn} 查得,出行前请复核。
        </p>
      </Container>
    </footer>
  )
}
