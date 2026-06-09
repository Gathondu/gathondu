import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Work from '@/components/Work'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { getPortfolio } from '@/lib/portfolio'

export default async function Home() {
  const portfolio = await getPortfolio()

  return (
    <>
      <Navbar data={portfolio} />
      <main>
        <Hero data={portfolio} />
        <Work data={portfolio} />
        <Skills data={portfolio} />
        <About data={portfolio} />
        <Contact data={portfolio} />
      </main>
      <Footer data={portfolio} />
    </>
  )
}
