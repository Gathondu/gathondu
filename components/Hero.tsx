import { data } from '@/data/cv'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.eyebrow}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>
            {data.available ? 'Available for contracts' : 'Currently unavailable'}
          </span>
        </div>

        <h1 className={styles.headline}>
          {data.headline.split('\n').map((line, i) => (
            <span key={i}>
              {i === 1 ? (
                <>
                  that{' '}
                  <em className={styles.accent}>
                    actually ships.
                  </em>
                </>
              ) : (
                line
              )}
              {i === 0 && <br />}
            </span>
          ))}
        </h1>

        <p className={styles.bio}>
          {data.bio}
        </p>

        <div className={styles.actions}>
          <a
            href="#work"
            className={`btn btn-primary ${styles.button}`}
          >
            View my work
          </a>
          <a
            href={`mailto:${data.email}`}
            className={`btn btn-outline ${styles.button} ${styles.secondaryButton}`}
          >
            Get in touch
          </a>
          <a
            href={data.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-ghost ${styles.button} ${styles.ghostButton}`}
          >
            GitHub ↗
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
