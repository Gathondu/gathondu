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
          © {new Date().getFullYear()} {data.name} · {data.location}
        </p>
        <div className={styles.links}>
          <a
            href={data.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {data.ui_copy.footer_github_label}
          </a>
          <a
            href={data.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {data.ui_copy.footer_linkedin_label}
          </a>
          <a
            href={`mailto:${data.email}`}
            className={styles.link}
          >
            {data.ui_copy.footer_email_label}
          </a>
        </div>
      </div>
    </footer>
  )
}
