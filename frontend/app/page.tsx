import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TrustStrip from "@/components/TrustStrip";
import { getPortfolio } from "@/lib/portfolio";

export default async function Home() {
  const portfolio = await getPortfolio();

  return (
    <main>
      <Hero data={portfolio} />
      <TrustStrip data={portfolio} />
      <Services data={portfolio} />
    </main>
  );
}
