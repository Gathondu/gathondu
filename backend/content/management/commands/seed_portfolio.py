from django.core.management.base import BaseCommand

from content.models import Certification, Education, Experience, Profile, SkillGroup, Stat


class Command(BaseCommand):
    help = "Seeds the CMS with Denis Gathondu's current portfolio content."

    def handle(self, *args, **options):
        Profile.objects.all().delete()

        profile = Profile.objects.create(
            name="Denis Gathondu",
            initials="DNG",
            role="Tech Lead & Senior Full-Stack Engineer",
            location="Nairobi, Kenya",
            email="thundoss@gmail.com",
            github="https://github.com/gathondu",
            linkedin="https://linkedin.com/in/gathondu",
            available=True,
            headline="I build software\nthat actually ships.",
            seo_title="Denis Gathondu - Tech Lead & Full-Stack Engineer",
            seo_description="Senior software engineer and tech lead with 9+ years building full-stack products across fintech, SaaS, and nonprofits. Python, React, cloud, LLMs.",
            open_graph_title="Denis Gathondu - Tech Lead & Full-Stack Engineer",
            open_graph_description="Senior software engineer and tech lead based in Nairobi.",
            nav_links=[
                {"label": "Work", "href": "/work"},
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
            bio="9+ years crafting full-stack products across fintech, SaaS, and social impact. I lead teams, design systems, and write code - from architecture to deployment.",
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
            Certification.objects.create(
                profile=profile,
                name=cert[0],
                url=cert[1],
                static_asset_path=cert[2],
                order=order,
            )

        self.stdout.write(self.style.SUCCESS("Seeded portfolio CMS content."))
