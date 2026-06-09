# Denis Gathondu — Portfolio

Personal portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Inter (body), JetBrains Mono (code)
- **Accent color**: Coral (#D85A30)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customisation

All your personal content lives in one file:

```
data/cv.ts
```

Edit that file to update your name, bio, experience, skills, certifications, and links. Every section on the site pulls from it — you never need to hunt through components.

## Project structure

```
├── app/
│   ├── globals.css       # Coral CSS variables + base styles
│   ├── layout.tsx        # Root layout + metadata
│   └── page.tsx          # Page assembly
├── components/
│   ├── Navbar.tsx        # Sticky nav with mobile menu
│   ├── Hero.tsx          # Hero + stats bar
│   ├── Work.tsx          # Experience timeline
│   ├── Skills.tsx        # Grouped skill tags
│   ├── About.tsx         # Bio + education + AI certs
│   ├── Contact.tsx       # Contact links + email CTA
│   └── Footer.tsx        # Simple footer
└── data/
    └── cv.ts             # ← Edit your content here
```

## Deployment

Deploy to Vercel in one command:

```bash
npx vercel
```

Or push to GitHub and connect to Vercel via the dashboard for automatic deployments.

## Adding a projects section

When you're ready to showcase specific projects, add a `projects` array to `data/cv.ts`:

```ts
projects: [
  {
    name: 'FieldEntry App',
    description: 'Survey aggregation tool for Rainforest Alliance certificate holders.',
    tech: ['React', 'FastAPI', 'KoBo'],
    url: 'https://...',
  },
]
```

Then create `components/Projects.tsx` and import it in `app/page.tsx`.
