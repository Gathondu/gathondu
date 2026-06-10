import type { Metadata } from 'next'
import { Fraunces, Geist } from 'next/font/google'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { getPortfolio } from '@/lib/portfolio'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await getPortfolio()

  return {
    title: portfolio.seo_title,
    description: portfolio.seo_description,
    icons: {
      icon: '/favicon.png',
    },
    openGraph: {
      title: portfolio.open_graph_title,
      description: portfolio.open_graph_description,
      type: 'website',
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const portfolio = await getPortfolio()
  const themeScript = `
    (() => {
      try {
        const storedTheme = localStorage.getItem('portfolio-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = storedTheme ?? (prefersDark ? 'dark' : 'light');
        document.documentElement.dataset.theme = theme === 'dark' ? 'gathondu-dark' : 'gathondu';
      } catch {
        document.documentElement.dataset.theme = 'gathondu-dark';
      }
    })();
  `

  return (
    <html
      lang="en"
      data-theme="gathondu"
      className={`${geistSans.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Navbar data={portfolio} />
        {children}
        <Footer data={portfolio} />
      </body>
    </html>
  )
}
