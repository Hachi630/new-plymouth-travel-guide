import { HeroScene } from '../icons/HeroScene'
import { Container } from '../layout/Container'
import styles from './Hero.module.css'

export function Hero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className={styles.hero}>
      <HeroScene className={styles.scene} />
      <Container className={styles.container}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Taranaki · Basalt Coast</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </Container>
    </header>
  )
}
