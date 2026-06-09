import type { Metadata } from 'next'
import { getPortfolio } from '@/lib/portfolio'
import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await getPortfolio()

  return {
    title: portfolio.seo_title,
    description: portfolio.seo_description,
    openGraph: {
      title: portfolio.open_graph_title,
      description: portfolio.open_graph_description,
      type: 'website',
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="gathondu">
      <body>{children}</body>
    </html>
  )
}
