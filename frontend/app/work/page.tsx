import FeaturedProjects from '@/components/FeaturedProjects'
import Work from '@/components/Work'
import { getPortfolio } from '@/lib/portfolio'

export default async function WorkPage() {
  const portfolio = await getPortfolio()

  return (
    <main>
      <FeaturedProjects data={portfolio} />
      <Work data={portfolio} />
    </main>
  )
}
