export type PortfolioData = {
  name: string;
  initials: string;
  role: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  available: boolean;
  headline: string;
  bio: string;
  seo_title: string;
  seo_description: string;
  open_graph_title: string;
  open_graph_description: string;
  nav_links: Array<{
    label: string;
    href: string;
  }>;
  ui_copy: Record<string, string>;
  trustItems: string[];
  serviceItems: Array<{
    step: string;
    title: string;
    summary: string;
    outcome: string;
  }>;
  featuredProjects: Array<{
    title: string;
    client: string;
    status: string;
    problem: string;
    role: string;
    stack: string[];
    outcome: string;
    href?: string;
  }>;
  resumeUrl: string;
  skill_heading: string;
  skill_copy: string;
  about_heading: string;
  about_copy: string[];
  contact_heading: string;
  contact_copy: string;
  contact_note: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
  skillGroups: Array<{
    label: string;
    skills: string[];
  }>;
  experience: Array<{
    role: string;
    company: string;
    location: string;
    period: string;
    bullets: string[];
  }>;
  education: {
    degree: string;
    institution: string;
    year: string;
    honors: string;
  };
  certifications: Array<{
    name: string;
    url: string;
    asset: string;
  }>;
};

export async function getPortfolio(): Promise<PortfolioData> {
  const url = process.env.PORTFOLIO_API_URL;

  if (!url) {
    throw new Error("PORTFOLIO_API_URL is required.");
  }

  const response = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Portfolio API responded with ${response.status}.`);
  }

  const data = (await response.json()) as PortfolioData;
  return proxyBackendAssets(data);
}

function proxyBackendAssets(data: PortfolioData): PortfolioData {
  const backendOrigin = process.env.PORTFOLIO_BACKEND_ORIGIN;

  if (!backendOrigin) {
    return data;
  }

  return {
    ...data,
    certifications: data.certifications.map((cert) => ({
      ...cert,
      asset: toProxyAssetUrl(cert.asset, backendOrigin),
    })),
  };
}

function toProxyAssetUrl(asset: string, backendOrigin: string): string {
  if (!asset) {
    return asset;
  }

  try {
    const assetUrl = new URL(asset);
    const origin = new URL(backendOrigin);

    if (assetUrl.origin !== origin.origin || !assetUrl.pathname.startsWith("/static/")) {
      return asset;
    }

    return `/api/backend-static${assetUrl.pathname}`;
  } catch {
    return asset;
  }
}
