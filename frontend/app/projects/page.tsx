import FeaturedProjects from "@/components/FeaturedProjects";
import { getPortfolio } from "@/lib/portfolio";

export default async function ProjectsPage() {
  const portfolio = await getPortfolio();

  return (
    <main>
      <FeaturedProjects data={portfolio} />
    </main>
  );
}
