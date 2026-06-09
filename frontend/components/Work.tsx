import type { PortfolioData } from '@/lib/portfolio'
import styles from './Work.module.css'

type WorkProps = {
  data: PortfolioData
}

export default function Work({ data }: WorkProps) {
  return (
    <section id="work" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>
            {data.ui_copy.work_section_label}
          </span>
          <div className={styles.rule} />
        </div>

        <div>
          {data.experience.map((job, i) => (
            <div
              key={i}
              className={styles.job}
            >
              <div>
                <p className={styles.company}>{job.company}</p>
                <p className={styles.period}>{job.period}</p>
                <p className={styles.location}>{job.location}</p>
              </div>

              <div>
                <h3 className={styles.role}>
                  {job.role}
                </h3>
                <ul className={styles.bullets}>
                  {job.bullets.map((b, j) => (
                    <li key={j} className={styles.bullet}>
                      <span className={styles.bulletDot} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
