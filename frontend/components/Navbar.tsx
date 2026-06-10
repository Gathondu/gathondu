"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { PortfolioData } from "@/lib/portfolio";
import styles from "./Navbar.module.css";

type NavbarProps = {
  data: PortfolioData;
};

type ThemePreference = "light" | "dark";

const THEME_STORAGE_KEY = "portfolio-theme";
const THEME_ATTRIBUTE: Record<ThemePreference, string> = {
  light: "gathondu",
  dark: "gathondu-dark",
};
const FAVICON_BY_THEME: Record<ThemePreference, string> = {
  light: "/favicon-light.png",
  dark: "/favicon-dark.png",
};

function applyThemeFavicon(theme: ThemePreference) {
  const favicon =
    document.getElementById("theme-favicon") ??
    document.querySelector('link[rel="icon"]');

  favicon?.setAttribute("href", FAVICON_BY_THEME[theme]);
}

export default function Navbar({ data }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<ThemePreference>("light");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const currentTheme =
      document.documentElement.dataset.theme === THEME_ATTRIBUTE.dark
        ? "dark"
        : "light";

    setTheme(currentTheme);
    applyThemeFavicon(currentTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = THEME_ATTRIBUTE[nextTheme];
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyThemeFavicon(nextTheme);
    setTheme(nextTheme);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.brand}>
          {data.name.split(" ")[0]}{" "}
          <span className={styles.brandAccent}>
            {data.name.split(" ").slice(-1).join(" ")}
          </span>
        </Link>

        <ul className={styles.desktopMenu}>
          {data.nav_links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              className={styles.themeToggle}
              onClick={toggleTheme}
              title={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              type="button"
            >
              <span
                className={`${styles.themeIcon} ${theme === "dark" ? styles.themeIconDark : ""}`}
              />
            </button>
          </li>
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
            <span
              className={`${styles.bar} ${menuOpen ? styles.barTopOpen : ""}`}
            />
            <span
              className={`${styles.bar} ${menuOpen ? styles.barMiddleOpen : ""}`}
            />
            <span
              className={`${styles.bar} ${menuOpen ? styles.barBottomOpen : ""}`}
            />
          </span>
        </button>
      </nav>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {data.nav_links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            className={styles.mobileThemeToggle}
            onClick={toggleTheme}
            title={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            type="button"
          >
            <span
              className={`${styles.themeIcon} ${theme === "dark" ? styles.themeIconDark : ""}`}
            />
          </button>
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
  );
}
