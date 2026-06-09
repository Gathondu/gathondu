import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Denis Gathondu — Tech Lead & Full-Stack Engineer',
  description:
    'Senior software engineer and tech lead with 9+ years building full-stack products across fintech, SaaS, and nonprofits. Python, React, cloud, LLMs.',
  openGraph: {
    title: 'Denis Gathondu — Tech Lead & Full-Stack Engineer',
    description: 'Senior software engineer and tech lead based in Nairobi.',
    type: 'website',
  },
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
