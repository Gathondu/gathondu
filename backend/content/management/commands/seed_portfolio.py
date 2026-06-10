from content.models import (
    Asset,
    Certification,
    Education,
    Experience,
    Profile,
    Project,
    SkillGroup,
    Stat,
)
from django.conf import settings
from django.core.files import File
from django.core.management.base import BaseCommand


DEFAULT_PROJECTS = [
    {
        "title": "FieldEntry Survey Aggregation",
        "client": "Rainforest Alliance",
        "status": "Delivered",
        "problem": "Certificate holders needed a clearer way to aggregate survey data from registered small farms.",
        "role": "Independent consultant owning product architecture and implementation.",
        "tools": ["React", "FastAPI", "Electron", "KoBo", "Python"],
        "outcome": "Delivered an end-to-end data tool within 3 months, improving survey aggregation and reporting workflows.",
        "description": "A desktop data workflow for aggregating field survey submissions from registered small farms into clearer reporting views.",
        "architecture": "Electron packaged app with a React interface, FastAPI backend services, Python processing, and KoBo survey data integration.",
    },
    {
        "title": "Greenhouse Gas Desktop Tool",
        "client": "Rainforest Alliance",
        "status": "Delivered",
        "problem": "Teams needed a desktop workflow for greenhouse gas calculations across multiple farms.",
        "role": "Designed the frontend, backend API, and integration path for farm-level calculation data.",
        "tools": ["Electron", "React", "FastAPI", "Cool Farm API"],
        "outcome": "Connected KoBo survey data to calculation APIs and packaged the workflow into a usable desktop app.",
        "description": "A desktop application that connected farm survey records to greenhouse gas calculation workflows.",
        "architecture": "Electron shell, React frontend, FastAPI integration layer, KoBo data ingestion, and Cool Farm API calculation handoff.",
    },
    {
        "title": "AI-assisted Lexicon Platform",
        "client": "Teknobyte",
        "status": "Delivered",
        "problem": "Language data workflows needed stronger quality controls and more efficient review tooling.",
        "role": "Engineering lead building administrative tools and applying LLMs to proof-checking workflows.",
        "tools": ["React", "Python", "LLMs", "Data tooling"],
        "outcome": "Reduced data corruption and supported smarter review flows with AI-assisted suggestions.",
        "description": "An administrative language-data platform with LLM-assisted proof checking and review support.",
        "architecture": "React administrative interfaces backed by Python services and LLM-assisted data quality workflows.",
    },
    {
        "title": "Kaziro",
        "client": "Personal product",
        "status": "MVP build",
        "problem": "Job seekers lose time finding relevant roles, evaluating fit, researching companies, and tailoring application documents by hand.",
        "role": "Designed and built the agentic product architecture, backend workers, SvelteKit frontend, and deployment path.",
        "tools": ["FastAPI", "LangGraph", "Celery", "Redis", "PostgreSQL", "pgvector", "Supabase", "SvelteKit", "Tailwind", "DaisyUI", "Docker", "Caddy", "Vercel"],
        "outcome": "Created a multi-tenant job application automation platform that can discover jobs, score fit, research employers, and generate tailored CV and cover letter drafts.",
        "description": "Kaziro is an AI-powered SaaS product for automating the job application lifecycle from discovery to tailored application materials.",
        "architecture": "SvelteKit frontend, FastAPI gateway, Celery scheduler and workers, Redis broker, LangGraph agent pipeline, PostgreSQL with pgvector, Supabase auth/storage, and server/Vercel deployment.",
        "source_url": "https://github.com/Gathondu/kaziro",
    },
    {
        "title": "Meridian",
        "client": "Personal product",
        "status": "In progress",
        "problem": "Teams need a controlled way to inspect MCP capabilities through a web interface without exposing unsafe tool execution over HTTP.",
        "role": "Built the SvelteKit and FastAPI monorepo shape, API boundaries, and AWS-oriented deployment architecture.",
        "tools": ["SvelteKit", "FastAPI", "Terraform", "Docker", "Lambda container image", "ECR", "S3", "CloudFront"],
        "outcome": "Created an inspection-focused app with read-only MCP endpoints and a clear path to static frontend plus Lambda-backed API deployment.",
        "description": "Meridian is a SvelteKit and FastAPI application focused on MCP inspection workflows and cloud deployment readiness.",
        "architecture": "Static SvelteKit frontend, FastAPI backend, read-only MCP inspection endpoints, Terraform-managed AWS infrastructure, Lambda container backend, and S3/CloudFront frontend hosting.",
        "source_url": "https://github.com/Gathondu/meridian",
    },
    {
        "title": "SautiRelay",
        "client": "Personal product",
        "status": "Planned MVP",
        "problem": "Community reporting flows need privacy-first capture, consent-aware location handling, structured reports, and escalation routing.",
        "role": "Defined the local-first architecture, OpenAPI boundary, frontend workflow, backend validation, and AWS deployment direction.",
        "tools": ["Svelte 5", "FastAPI", "OpenAPI", "Generated TypeScript client", "Terraform", "AWS planning"],
        "outcome": "Established a product and engineering foundation for anonymous reporting, report structuring, and responder handoff workflows.",
        "description": "SautiRelay is a privacy-first community reporting and escalation platform designed for African civic and safety contexts.",
        "architecture": "Svelte UI communicates through a generated TypeScript client against an OpenAPI-aligned FastAPI backend that owns validation, privacy-preserving normalization, and route recommendation.",
        "source_url": "https://github.com/Gathondu/sautirelay",
    },
    {
        "title": "Haven Circle",
        "client": "Personal product",
        "status": "Scaffolded",
        "problem": "Solo luxury real estate operators need a polished listing platform with private admin workflows and media-rich property management.",
        "role": "Scaffolded the full-stack product architecture, admin authentication path, data model foundation, and demo listing workflows.",
        "tools": ["SvelteKit", "Tailwind", "FastAPI", "SQLAlchemy async", "PostgreSQL", "JWT", "Cloudinary"],
        "outcome": "Created a SvelteKit and FastAPI base with JWT-protected admin flows, PostgreSQL persistence, and Cloudinary-backed media seeding.",
        "description": "Haven Circle is a luxury solo real estate web platform with public listing experiences and protected admin workflows.",
        "architecture": "SvelteKit frontend, FastAPI API, async SQLAlchemy persistence, PostgreSQL database, JWT admin authentication, and optional Cloudinary media storage for listing galleries.",
        "source_url": "https://github.com/Gathondu/haven-circle",
    },
    {
        "title": "Estfrank",
        "client": "Estfrank Digitec",
        "status": "Delivered",
        "problem": "The company needed a branded corporate ICT site that communicated service domains, partners, clients, industries, and contact pathways.",
        "role": "Built the static SvelteKit site, branded content system, reusable sections, and deployment-ready static output.",
        "tools": ["SvelteKit", "Svelte 5", "TypeScript", "adapter-static", "CSS Modules", "cPanel static hosting"],
        "outcome": "Delivered a polished ICT services website with responsive content sections, brand assets, and static hosting support.",
        "description": "Estfrank is a corporate website for Estfrank Digitec, an ICT, software, cloud, security, and telecommunications services company.",
        "architecture": "Static SvelteKit application with content modules, reusable service/project components, custom branding assets, and prerendered pages for cPanel-style hosting.",
        "source_url": "https://github.com/Gathondu/estfranc",
    },
]


class Command(BaseCommand):
    help = "Seeds the CMS with Denis Gathondu's current portfolio content."

    def create_asset_from_static(self, title, kind, static_path, alt_text=""):
        source_path = settings.BASE_DIR / "content" / "static" / static_path
        if not source_path.exists():
            return None

        with source_path.open("rb") as source_file:
            return Asset.objects.create(
                title=title,
                kind=kind,
                file=File(source_file, name=source_path.name),
                alt_text=alt_text,
            )

    def add_arguments(self, parser):
        parser.add_argument(
            "--reset",
            action="store_true",
            help="Delete existing portfolio content before seeding.",
        )

    def handle(self, *args, **options):
        if Profile.objects.exists() and not options["reset"]:
            self.stdout.write("Portfolio profile already exists. Use --reset to replace it.")
            return

        if options["reset"]:
            Profile.objects.all().delete()
            Asset.objects.all().delete()

        profile = Profile.objects.create(
            name="Denis Ngugi Gathondu",
            initials="DNG",
            role="Tech Lead & Senior Full-Stack Engineer",
            location="Nairobi, Kenya",
            email="thundoss@gmail.com",
            github="https://github.com/gathondu",
            linkedin="https://linkedin.com/in/gathondu",
            available=True,
            headline="I help teams ship\nreliable software.",
            seo_title="Denis Gathondu - Tech Lead & Full-Stack Engineer",
            seo_description="Senior software engineer and tech lead with 9+ years building full-stack products across fintech, SaaS, and nonprofits. Python, React, cloud, LLMs.",
            open_graph_title="Denis Gathondu - Tech Lead & Full-Stack Engineer",
            open_graph_description="Senior software engineer and tech lead based in Nairobi.",
            nav_links=[
                {"label": "Work", "href": "/work"},
                {"label": "Projects", "href": "/projects"},
                {"label": "Skills", "href": "/skills"},
                {"label": "About", "href": "/about"},
                {"label": "Contact", "href": "/contact"},
            ],
            ui_copy={
                "available_status": "Available for contracts",
                "unavailable_status": "Currently unavailable",
                "hero_primary_action": "View my work",
                "hero_secondary_action": "Get in touch",
                "hero_github_action": "GitHub",
                "hero_resume_action": "Download CV",
                "trust_section_label": "Trusted across",
                "services_section_label": "How I help",
                "featured_projects_label": "Selected proof",
                "featured_projects_intro": "A few examples of the kind of product, platform, and delivery work clients bring me into.",
                "project_problem_label": "Problem",
                "project_role_label": "Role",
                "project_outcome_label": "Outcome",
                "project_stack_label": "Stack",
                "project_description_label": "Description",
                "project_architecture_label": "Architecture",
                "project_preview_label": "Preview",
                "project_source_label": "Source",
                "project_live_label": "Open live project",
                "project_preview_unavailable": "Live preview is not available for this project yet.",
                "experience_timeline_label": "Experience timeline",
                "work_section_label": "Experience",
                "skills_section_label": "Skills",
                "about_section_label": "About",
                "contact_section_label": "Contact",
                "education_label": "Education",
                "certifications_label": "AI Certifications",
                "view_certificate_label": "View certificate",
                "certificate_modal_fallback_title": "Certificate",
                "open_certificate_label": "Open certificate in new tab",
                "contact_note_label": "Quick note",
                "contact_email_icon": "@",
                "contact_github_icon": "GH",
                "contact_linkedin_icon": "in",
                "contact_email_subject": "Let's work together",
                "contact_send_email_label": "Send an email",
                "nav_hire_label": "Hire me",
                "mobile_nav_toggle_label": "Toggle menu",
                "mobile_nav_hire_label": "Hire me",
                "footer_github_label": "GitHub",
                "footer_linkedin_label": "LinkedIn",
                "footer_email_label": "Email",
                "modal_close_label": "Close modal",
                "modal_backdrop_close_label": "Close modal backdrop",
                "modal_close_text": "x",
                "external_link_suffix": "↗",
                "cta_arrow": "→",
            },
            bio="Senior full-stack engineer and technical lead helping teams ship reliable web, mobile, and AI-enabled products - from architecture and delivery planning to production code.",
            trust_items=[
                "Fintech",
                "SaaS",
                "E-commerce",
                "Social impact",
                "AI-enabled products",
                "Global remote teams",
            ],
            service_items=[
                {
                    "step": "01",
                    "title": "Plan",
                    "summary": "Clarify the product, architecture, delivery path, and risks before teams commit budget.",
                    "outcome": "A practical roadmap with scope, milestones, and technical tradeoffs made visible.",
                },
                {
                    "step": "02",
                    "title": "Build",
                    "summary": "Design and ship reliable full-stack products across web, mobile, APIs, and applied AI workflows.",
                    "outcome": "Production software that is maintainable, observable, and ready for real users.",
                },
                {
                    "step": "03",
                    "title": "Lead",
                    "summary": "Guide teams through planning, reviews, delivery rituals, mentoring, and technical decisions.",
                    "outcome": "Engineering teams that move faster without losing quality or alignment.",
                },
                {
                    "step": "04",
                    "title": "Maintain",
                    "summary": "Stabilize systems with testing, CI/CD, documentation, monitoring, and pragmatic refactoring.",
                    "outcome": "Lower operational drag and a codebase future teams can confidently extend.",
                },
            ],
            featured_projects=[
                {**project, "stack": project["tools"]} for project in DEFAULT_PROJECTS
            ],
            skill_heading="The tools I reach\nfor most.",
            skill_copy="Comfortable from database schema to deployment pipeline. I pick what solves the problem - not what's trendy.",
            about_heading="Ambitious, curious,\ndriven to build.",
            about_copy=[
                "I'm a full-stack engineer and tech lead based in Nairobi, Kenya. Since 2017 I've been working with Andela and their global partners, shipping production software across fintech, SaaS, e-commerce, and social impact.",
                "I care about clean architecture, fast feedback loops, and teams that ship with confidence. I'm equally comfortable writing Django APIs, leading sprint planning, or debugging a Flutter layout at midnight.",
                "Currently deepening my work in applied AI - RAG pipelines, LLM agents, and MCP integrations - with five certifications and growing.",
            ],
            contact_heading="Let's build\nsomething together.",
            contact_copy="I'm open to contract work, senior engineering roles, and technical leadership positions. Based in Nairobi - available globally.",
            contact_note="The fastest way to reach me is via email. I typically respond within 24 hours. Tell me about your project, timeline, and what kind of help you're looking for.",
        )

        profile.resume_asset = self.create_asset_from_static(
            "Denis Gathondu CV",
            Asset.Kind.PDF,
            "content/cv/Denis_Gathondu_CV.pdf",
        )
        profile.save(update_fields=["resume_asset"])

        for order, project in enumerate(DEFAULT_PROJECTS):
            Project.objects.create(
                profile=profile,
                title=project["title"],
                client=project.get("client", ""),
                status=project.get("status", ""),
                problem=project.get("problem", ""),
                role=project.get("role", ""),
                tools=project.get("tools", []),
                outcome=project.get("outcome", ""),
                description=project.get("description", ""),
                architecture=project.get("architecture", ""),
                project_url=project.get("project_url", ""),
                source_url=project.get("source_url", ""),
                featured=True,
                order=order,
            )

        for order, stat in enumerate(
            [
                ("9+", "Years shipping"),
                ("12+", "Products built"),
                ("5", "AI certifications"),
                ("3", "Countries served"),
            ]
        ):
            Stat.objects.create(profile=profile, value=stat[0], label=stat[1], order=order)

        for order, group in enumerate(
            [
                ("Backend", ["Python", "Django", "FastAPI", "Flask", "Ruby on Rails", "Node.js", "GraphQL"]),
                ("Frontend", ["React", "Next.js", "TypeScript", "Flutter", "HTML5", "CSS"]),
                ("Infrastructure", ["AWS", "GCP", "Docker", "Kubernetes", "CI/CD", "Microservices"]),
                ("Data & AI", ["PostgreSQL", "MongoDB", "Redis", "LLMs", "RAG", "LangChain", "MCP", "Pinecone"]),
                ("Practices", ["TDD", "Agile", "Code review", "System design", "Technical writing"]),
            ]
        ):
            SkillGroup.objects.create(profile=profile, label=group[0], skills=group[1], order=order)

        for order, job in enumerate(
            [
                (
                    "Senior Software Engineer (Contract)",
                    "Andela",
                    "New York, NY (remote)",
                    "Feb 2017 - Present",
                    [
                        "Spearheaded design and development of customized applications using Agile methodology, delivering projects from concept through implementation.",
                        "Restructured monolithic applications into independently managed microservices, improving efficiency and flexibility of internal services.",
                        "Collaborated with Andela partners to deliver customized technology solutions aligned with their business objectives.",
                        "Designed an efficient Secret Santa matching algorithm using Django and Python scripting to foster team culture.",
                    ],
                ),
                (
                    "Independent Consultant",
                    "Rainforest Alliance",
                    "Nairobi, Kenya",
                    "Jun 2025 - Jan 2026",
                    [
                        "Built the FieldEntry app end-to-end allowing certificate holders to get aggregates for surveys on registered small farms.",
                        "Built a greenhouse gases desktop application using Electron, React, and FastAPI.",
                        "Integrated data from KoBo surveys into the Cool Farm project API for greenhouse gas calculations across multiple farms.",
                        "Delivered the app within 3 months from inception, advising on tooling for best UX and DX.",
                    ],
                ),
                (
                    "Engineering Manager",
                    "Jipamba",
                    "Nairobi, Kenya",
                    "Dec 2024 - Dec 2025",
                    [
                        "Led the engineering team including developers, QA, and other technical roles.",
                        "Oversaw implementation of tasks, sprints, and technical features to ensure progress aligned with goals.",
                        "Provided hands-on technical expertise by reviewing code and debugging complex issues.",
                        "Mentored team members, fostering technical growth and onboarding new hires effectively.",
                        "Built mobile apps using Flutter.",
                    ],
                ),
                (
                    "Technical Lead / Senior Full-Stack Engineer",
                    "Jipamba",
                    "Nairobi, Kenya",
                    "Mar 2024 - Dec 2024",
                    [
                        "Led daily standups and conducted peer reviews.",
                        "Created technical and design documents for features.",
                        "Designed and implemented critical features end-to-end.",
                        "Managed task creation and estimations to keep the team on track.",
                    ],
                ),
                (
                    "Engineering Lead",
                    "Teknobyte",
                    "Nairobi, Kenya",
                    "Sep 2022 - Nov 2024",
                    [
                        "Engineered administrative web tools for data capture, significantly reducing data corruption.",
                        "Built a mobile lexicon application for users to interact with precompiled dictionary data.",
                        "Incorporated LLMs in data capture to assist with proof-checking and related-word suggestions.",
                    ],
                ),
                (
                    "Senior Software Engineer (Contract)",
                    "Shelter Animals Count",
                    "Atlanta, GA (remote)",
                    "May 2022 - Oct 2022",
                    [
                        "Implemented impactful data visualizations using Recharts to identify patterns in large datasets.",
                        "Built user-friendly React forms to streamline animal intake, outcome, and service tracking.",
                    ],
                ),
                (
                    "Software Engineer (Contract)",
                    "WeSpire",
                    "Boston, MA (remote)",
                    "Jul 2020 - Mar 2022",
                    [
                        "Implemented a recurring donation feature end-to-end using React.js and Rails, integrating Stripe's API.",
                        "Collaborated with cross-functional teams to improve UI, increase engagement, and enhance platform functionality.",
                    ],
                ),
                (
                    "Software Engineer (Contract)",
                    "BombFell",
                    "New York, NY (remote)",
                    "Feb 2019 - Apr 2020",
                    [
                        "Built an intuitive order preview experience in React.js, greatly reducing returned orders.",
                        "Implemented a Shop feature allowing subscribers to purchase individual items outside their curated orders.",
                        "Designed and built stylist portal features that improved inventory management and client experience.",
                    ],
                ),
                (
                    "Associate Software Engineer (Contract)",
                    "Asset-Map",
                    "Philadelphia, PA (remote)",
                    "Mar 2018 - Jan 2019",
                    [
                        "Implemented third-party API integration using Django, reducing manual data entry from multiple providers.",
                    ],
                ),
            ]
        ):
            Experience.objects.create(
                profile=profile,
                role=job[0],
                company=job[1],
                location=job[2],
                period=job[3],
                bullets=job[4],
                order=order,
            )

        Education.objects.create(
            profile=profile,
            degree="BSc Information Technology",
            institution="Jomo Kenyatta University of Agriculture & Technology",
            year="2013",
            honors="Second Class Honors, Upper Division",
        )

        for order, cert in enumerate(
            [
                (
                    "LangChain, Pinecone & OpenAI: Build Next-Gen LLM Apps",
                    "https://www.udemy.com/certificate/UC-bd103fa3-1610-42f7-8286-3e86abc2b771/",
                    "content/certificates/llm.pdf",
                ),
                (
                    "AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents",
                    "https://www.udemy.com/certificate/UC-9b497638-2420-40f6-a375-eb02d45038b3/",
                    "content/certificates/core.pdf",
                ),
                (
                    "AI Leader: Generative AI & Agentic AI for Leaders & Founders",
                    "https://www.udemy.com/certificate/UC-7bccd45a-3abd-401a-8b12-b3ffe030447a/",
                    "content/certificates/leader.pdf",
                ),
                (
                    "AI Engineer Agentic Track: The Complete Agent & MCP Course",
                    "https://www.udemy.com/certificate/UC-3388c666-70be-4556-9411-5451d12197c1/",
                    "content/certificates/agentic.pdf",
                ),
                (
                    "AI Engineer Production Track: Deploy LLMs & Agents at Scale",
                    "https://www.udemy.com/certificate/UC-e33ff652-9bf1-4c33-acab-6505c7d313e4/",
                    "content/certificates/production.pdf",
                ),
            ]
        ):
            asset = self.create_asset_from_static(cert[0], Asset.Kind.PDF, cert[2])
            Certification.objects.create(
                profile=profile,
                name=cert[0],
                url=cert[1],
                asset=asset,
                static_asset_path=cert[2],
                order=order,
            )

        self.stdout.write(self.style.SUCCESS("Seeded portfolio CMS content."))
