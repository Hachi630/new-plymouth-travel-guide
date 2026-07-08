import type { Viewpoint } from '../../types/itinerary'
import { Container } from '../layout/Container'
import { Section } from '../layout/Section'
import { ViewpointCard } from './ViewpointCard'
import styles from './Viewpoints.module.css'

export function ViewpointsSection({ viewpoints }: { viewpoints: Viewpoint[] }) {
  return (
    <Container>
      <Section title="看山机位" sub="晴窗灵活取用 · 按离城远近">
        <p className={styles.intro}>
          除周日 Mangorei 外,以下路边机位可在周五日落 / 周六雨停间隙机动取用;近城两处留给周五日落。
        </p>
        <ul className={styles.list}>
          {viewpoints.map((vp) => (
            <li key={vp.id}>
              <ViewpointCard viewpoint={vp} />
            </li>
          ))}
        </ul>
      </Section>
    </Container>
  )
}
