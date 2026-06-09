import Skills from '@/components/Skills'
import { getPortfolio } from '@/lib/portfolio'

export default async function SkillsPage() {
  const portfolio = await getPortfolio()

  return (
    <main>
      <Skills data={portfolio} />
    </main>
  )
}
