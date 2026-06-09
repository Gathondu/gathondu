'use client'

import { useState, useEffect } from 'react'
import type { PortfolioData } from '@/lib/portfolio'
import styles from './Navbar.module.css'

type NavbarProps = {
  data: PortfolioData
}

export default function Navbar({ data }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
    >
      <nav className={styles.nav}>
        <a href="#" className={styles.brand}>
          {data.name.split(' ')[0]}{' '}
          <span className={styles.brandAccent}>
            {data.name.split(' ').slice(1).join(' ')}
          </span>
        </a>

        <ul className={styles.desktopMenu}>
          {data.nav_links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={styles.navLink}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${data.email}`}
              className={`btn btn-outline ${styles.hireButton}`}
            >
              {data.ui_copy.nav_hire_label}
            </a>
          </li>
        </ul>

        <button
          className={`btn btn-ghost ${styles.mobileToggle}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={data.ui_copy.mobile_nav_toggle_label}
        >
          <span className={styles.hamburger}>
            <span className={`${styles.bar} ${menuOpen ? styles.barTopOpen : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barMiddleOpen : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barBottomOpen : ''}`} />
          </span>
        </button>
      </nav>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {data.nav_links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${data.email}`}
            className={`btn btn-primary ${styles.mobileHireButton}`}
            onClick={() => setMenuOpen(false)}
          >
            {data.ui_copy.mobile_nav_hire_label} {data.ui_copy.cta_arrow}
          </a>
        </div>
      )}
    </header>
  )
}
