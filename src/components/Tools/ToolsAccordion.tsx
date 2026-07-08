import { useId, useState, type ReactNode } from 'react'
import type { ToolsData } from '../../types/itinerary'
import { Container } from '../layout/Container'
import { Section } from '../layout/Section'
import { Card } from '../primitives/Card'
import { Chevron } from '../primitives/Chevron'
import { Disclosure } from '../primitives/Disclosure'
import { Checklist } from './Checklist'
import { FoodList } from './FoodList'
import { BudgetTable } from './BudgetTable'
import { SafetyList } from './SafetyList'
import styles from './Tools.module.css'

function AccordionPanel({
  title,
  meta,
  open,
  onToggle,
  children,
}: {
  title: string
  meta?: string
  open: boolean
  onToggle: () => void
  children: ReactNode
}) {
  const id = useId()
  return (
    <Card as="section" padded={false} className={styles.panel}>
      <button
        type="button"
        className={styles.header}
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
      >
        <span className={styles.hTitle}>{title}</span>
        {meta ? <span className={styles.hMeta}>{meta}</span> : null}
        <Chevron open={open} className={styles.chev} />
      </button>
      <Disclosure id={id} open={open} className={styles.panelBody}>
        {children}
      </Disclosure>
    </Card>
  )
}

export function ToolsAccordion({ tools }: { tools: ToolsData }) {
  const [openKey, setOpenKey] = useState<string | null>('packing')
  const toggle = (k: string) => setOpenKey((cur) => (cur === k ? null : k))

  return (
    <Container>
      <Section title="工具箱" sub="打包 · 美食 · 预算 · 安全">
        <div className={styles.stack}>
          <AccordionPanel
            title="打包清单"
            meta={`${tools.packing.length} 项`}
            open={openKey === 'packing'}
            onToggle={() => toggle('packing')}
          >
            <Checklist items={tools.packing} />
          </AccordionPanel>

          <AccordionPanel
            title="必吃美食"
            open={openKey === 'food'}
            onToggle={() => toggle('food')}
          >
            <FoodList items={tools.food} />
          </AccordionPanel>

          <AccordionPanel
            title="预算估算"
            meta="4 人 · NZD"
            open={openKey === 'budget'}
            onToggle={() => toggle('budget')}
          >
            <BudgetTable rows={tools.budget} />
          </AccordionPanel>

          <AccordionPanel
            title="天气与安全"
            open={openKey === 'safety'}
            onToggle={() => toggle('safety')}
          >
            <SafetyList items={tools.safety} />
          </AccordionPanel>
        </div>
      </Section>
    </Container>
  )
}
