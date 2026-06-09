'use client'

import { useState, useEffect } from 'react'
import { data } from '@/data/cv'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['Work', 'Skills', 'About', 'Contact']

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
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className={styles.navLink}
              >
                {l}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${data.email}`}
              className={`btn btn-outline ${styles.hireButton}`}
            >
              Hire me
            </a>
          </li>
        </ul>

        <button
          className={`btn btn-ghost ${styles.mobileToggle}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
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
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {l}
            </a>
          ))}
          <a
            href={`mailto:${data.email}`}
            className={`btn btn-primary ${styles.mobileHireButton}`}
            onClick={() => setMenuOpen(false)}
          >
            Hire me →
          </a>
        </div>
      )}
    </header>
  )
}
