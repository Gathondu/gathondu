import About from '@/components/About'
import { getPortfolio } from '@/lib/portfolio'

export default async function AboutPage() {
  const portfolio = await getPortfolio()

  return (
    <main>
      <About data={portfolio} />
    </main>
  )
}
