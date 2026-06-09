import type { PortfolioData } from '@/lib/portfolio'
import styles from './Footer.module.css'

type FooterProps = {
  data: PortfolioData
}

export default function Footer({ data }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} {data.name} · Nairobi, Kenya
        </p>
        <div className={styles.links}>
          <a
            href={data.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub
          </a>
          <a
            href={data.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${data.email}`}
            className={styles.link}
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
