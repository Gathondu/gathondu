import django.db.models.deletion
from django.db import migrations, models


ADDITIONAL_PROJECTS = [
    {
        "title": "Kaziro",
        "client": "Personal product",
        "status": "MVP build",
        "problem": "Job seekers lose time finding relevant roles, evaluating fit, researching companies, and tailoring application documents by hand.",
        "role": "Designed and built the agentic product architecture, backend workers, SvelteKit frontend, and deployment path.",
        "outcome": "Created a multi-tenant job application automation platform that can discover jobs, score fit, research employers, and generate tailored CV and cover letter drafts.",
        "description": "Kaziro is an AI-powered SaaS product for automating the job application lifecycle from discovery to tailored application materials.",
        "tools": [
            "FastAPI",
            "LangGraph",
            "Celery",
            "Redis",
            "PostgreSQL",
            "pgvector",
            "Supabase",
            "SvelteKit",
            "Tailwind",
            "DaisyUI",
            "Docker",
            "Caddy",
            "Vercel",
        ],
        "architecture": "SvelteKit frontend, FastAPI gateway, Celery scheduler and workers, Redis broker, LangGraph agent pipeline, PostgreSQL with pgvector, Supabase auth/storage, and server/Vercel deployment.",
        "source_url": "https://github.com/Gathondu/kaziro",
    },
    {
        "title": "Meridian",
        "client": "Personal product",
        "status": "In progress",
        "problem": "Teams need a controlled way to inspect MCP capabilities through a web interface without exposing unsafe tool execution over HTTP.",
        "role": "Built the SvelteKit and FastAPI monorepo shape, API boundaries, and AWS-oriented deployment architecture.",
        "outcome": "Created an inspection-focused app with read-only MCP endpoints and a clear path to static frontend plus Lambda-backed API deployment.",
        "description": "Meridian is a SvelteKit and FastAPI application focused on MCP inspection workflows and cloud deployment readiness.",
        "tools": [
            "SvelteKit",
            "FastAPI",
            "Terraform",
            "Docker",
            "Lambda container image",
            "ECR",
            "S3",
            "CloudFront",
        ],
        "architecture": "Static SvelteKit frontend, FastAPI backend, read-only MCP inspection endpoints, Terraform-managed AWS infrastructure, Lambda container backend, and S3/CloudFront frontend hosting.",
        "source_url": "https://github.com/Gathondu/meridian",
    },
    {
        "title": "SautiRelay",
        "client": "Personal product",
        "status": "Planned MVP",
        "problem": "Community reporting flows need privacy-first capture, consent-aware location handling, structured reports, and escalation routing.",
        "role": "Defined the local-first architecture, OpenAPI boundary, frontend workflow, backend validation, and AWS deployment direction.",
        "outcome": "Established a product and engineering foundation for anonymous reporting, report structuring, and responder handoff workflows.",
        "description": "SautiRelay is a privacy-first community reporting and escalation platform designed for African civic and safety contexts.",
        "tools": [
            "Svelte 5",
            "FastAPI",
            "OpenAPI",
            "Generated TypeScript client",
            "Terraform",
            "AWS planning",
        ],
        "architecture": "Svelte UI communicates through a generated TypeScript client against an OpenAPI-aligned FastAPI backend that owns validation, privacy-preserving normalization, and route recommendation.",
        "source_url": "https://github.com/Gathondu/sautirelay",
    },
    {
        "title": "Haven Circle",
        "client": "Personal product",
        "status": "Scaffolded",
        "problem": "Solo luxury real estate operators need a polished listing platform with private admin workflows and media-rich property management.",
        "role": "Scaffolded the full-stack product architecture, admin authentication path, data model foundation, and demo listing workflows.",
        "outcome": "Created a SvelteKit and FastAPI base with JWT-protected admin flows, PostgreSQL persistence, and Cloudinary-backed media seeding.",
        "description": "Haven Circle is a luxury solo real estate web platform with public listing experiences and protected admin workflows.",
        "tools": [
            "SvelteKit",
            "Tailwind",
            "FastAPI",
            "SQLAlchemy async",
            "PostgreSQL",
            "JWT",
            "Cloudinary",
        ],
        "architecture": "SvelteKit frontend, FastAPI API, async SQLAlchemy persistence, PostgreSQL database, JWT admin authentication, and optional Cloudinary media storage for listing galleries.",
        "source_url": "https://github.com/Gathondu/haven-circle",
    },
    {
        "title": "Estfrank",
        "client": "Estfrank Digitec",
        "status": "Delivered",
        "problem": "The company needed a branded corporate ICT site that communicated service domains, partners, clients, industries, and contact pathways.",
        "role": "Built the static SvelteKit site, branded content system, reusable sections, and deployment-ready static output.",
        "outcome": "Delivered a polished ICT services website with responsive content sections, brand assets, and static hosting support.",
        "description": "Estfrank is a corporate website for Estfrank Digitec, an ICT, software, cloud, security, and telecommunications services company.",
        "tools": [
            "SvelteKit",
            "Svelte 5",
            "TypeScript",
            "adapter-static",
            "CSS Modules",
            "cPanel static hosting",
        ],
        "architecture": "Static SvelteKit application with content modules, reusable service/project components, custom branding assets, and prerendered pages for cPanel-style hosting.",
        "source_url": "https://github.com/Gathondu/estfranc",
    },
]


def add_projects_route(profile):
    nav_links = list(profile.nav_links or [])
    if not any(link.get("href") == "/projects" for link in nav_links):
        nav_links.insert(1, {"label": "Projects", "href": "/projects"})
        profile.nav_links = nav_links
        profile.save(update_fields=["nav_links", "updated_at"])


def create_project(Project, profile, order, project):
    title = project.get("title", "")
    if not title or Project.objects.filter(profile=profile, title=title).exists():
        return

    tools = project.get("tools") or project.get("stack") or []
    Project.objects.create(
        profile=profile,
        title=title,
        client=project.get("client", ""),
        status=project.get("status", ""),
        problem=project.get("problem", ""),
        role=project.get("role", ""),
        outcome=project.get("outcome", ""),
        description=project.get("description") or project.get("outcome", ""),
        tools=tools,
        architecture=project.get("architecture", ""),
        project_url=project.get("project_url") or project.get("projectUrl") or project.get("href", ""),
        source_url=project.get("source_url") or project.get("sourceUrl", ""),
        featured=True,
        order=order,
    )


def seed_projects(apps, schema_editor):
    Profile = apps.get_model("content", "Profile")
    Project = apps.get_model("content", "Project")

    for profile in Profile.objects.all():
        add_projects_route(profile)

        order = 0
        for project in profile.featured_projects or []:
            create_project(Project, profile, order, project)
            order += 1

        for project in ADDITIONAL_PROJECTS:
            create_project(Project, profile, order, project)
            order += 1


class Migration(migrations.Migration):

    dependencies = [
        ("content", "0006_asset_certification_asset_profile_resume_asset"),
    ]

    operations = [
        migrations.CreateModel(
            name="Project",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=180)),
                ("client", models.CharField(blank=True, max_length=160)),
                ("status", models.CharField(blank=True, max_length=80)),
                ("problem", models.TextField(blank=True)),
                ("role", models.TextField(blank=True)),
                ("outcome", models.TextField(blank=True)),
                ("description", models.TextField(blank=True)),
                ("tools", models.JSONField(blank=True, default=list)),
                ("architecture", models.TextField(blank=True)),
                ("project_url", models.URLField(blank=True)),
                ("source_url", models.URLField(blank=True)),
                ("featured", models.BooleanField(default=True)),
                ("order", models.PositiveIntegerField(default=0)),
                (
                    "profile",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="projects",
                        to="content.profile",
                    ),
                ),
            ],
            options={
                "ordering": ["order", "id"],
            },
        ),
        migrations.RunPython(seed_projects, migrations.RunPython.noop),
    ]
