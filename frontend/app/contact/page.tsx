import Contact from '@/components/Contact'
import { getPortfolio } from '@/lib/portfolio'

export default async function ContactPage() {
  const portfolio = await getPortfolio()

  return (
    <main>
      <Contact data={portfolio} />
    </main>
  )
}
