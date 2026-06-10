import type { PortfolioData } from '@/lib/portfolio'
import styles from './TrustStrip.module.css'

type TrustStripProps = {
  data: PortfolioData
}

export default function TrustStrip({ data }: TrustStripProps) {
  if (data.trustItems.length === 0) {
    return null
  }

  return (
    <section className={styles.section} aria-labelledby="trust-heading">
      <div className={styles.container}>
        <h2 id="trust-heading" className={styles.label}>
          {data.ui_copy.trust_section_label}
        </h2>
        <div className={styles.items}>
          {data.trustItems.map((item) => (
            <span key={item} className={styles.item}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
