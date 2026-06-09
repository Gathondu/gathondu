import { data as fallbackPortfolio } from "@/data/cv";

export type PortfolioData = typeof fallbackPortfolio & {
  about_heading?: string;
  about_copy?: string[];
  contact_heading?: string;
  contact_copy?: string;
  contact_note?: string;
};

export async function getPortfolio(): Promise<PortfolioData> {
  const url = process.env.PORTFOLIO_API_URL;

  if (!url) {
    return fallbackPortfolio;
  }

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return fallbackPortfolio;
    }

    return {
      ...fallbackPortfolio,
      ...(await response.json()),
    };
  } catch {
    return fallbackPortfolio;
  }
}
