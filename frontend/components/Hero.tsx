import Link from 'next/link'
import type { PortfolioData } from '@/lib/portfolio'
import styles from './Hero.module.css'

type HeroProps = {
  data: PortfolioData
}

export default function Hero({ data }: HeroProps) {
  const headlineLines = data.headline.split('\n')
  const accentLine = headlineLines.at(-1)

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.eyebrow}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>
            {data.available
              ? data.ui_copy.available_status
              : data.ui_copy.unavailable_status}
          </span>
        </div>

        <h1 className={styles.headline}>
          {headlineLines.map((line, i) => (
            <span key={i}>
              {i === headlineLines.length - 1 ? (
                <em className={styles.accent}>{accentLine}</em>
              ) : (
                line
              )}
              {i < headlineLines.length - 1 && <br />}
            </span>
          ))}
        </h1>

        <p className={styles.bio}>
          {data.bio}
        </p>

        <div className={styles.actions}>
          <Link
            href="/work"
            className={`btn btn-primary ${styles.button}`}
          >
            {data.ui_copy.hero_primary_action}
          </Link>
          <a
            href={`mailto:${data.email}`}
            className={`btn btn-outline ${styles.button} ${styles.secondaryButton}`}
          >
            {data.ui_copy.hero_secondary_action}
          </a>
          <a
            href={data.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-ghost ${styles.button} ${styles.ghostButton}`}
          >
            {data.ui_copy.hero_github_action} {data.ui_copy.external_link_suffix}
          </a>
        </div>

        <div className={styles.statsGrid}>
          {data.stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <div className={styles.statValue}>
                {s.value}
              </div>
              <div className={styles.statLabel}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
