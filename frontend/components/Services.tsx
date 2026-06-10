import type { PortfolioData } from '@/lib/portfolio'
import styles from './Services.module.css'

type ServicesProps = {
  data: PortfolioData
}

export default function Services({ data }: ServicesProps) {
  if (data.serviceItems.length === 0) {
    return null
  }

  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>
            {data.ui_copy.services_section_label}
          </span>
          <div className={styles.rule} />
        </div>

        <div className={styles.grid}>
          {data.serviceItems.map((item) => (
            <article key={item.title} className={styles.card}>
              <p className={styles.step}>{item.step}</p>
              <h2 className={styles.title}>{item.title}</h2>
              <p className={styles.summary}>{item.summary}</p>
              <p className={styles.outcome}>{item.outcome}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
