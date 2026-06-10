# Deployment Infrastructure

This folder deploys the Next frontend to Vercel and the Django backend to
`https://167.233.100.112` using Docker Compose, Postgres, Caddy, and Certbot.

## Backend env

Create an untracked production env file before running Terraform:

```bash
cp infra/backend/env.production.example infra/backend/.env.production
```

Set strong values for `DJANGO_SECRET_KEY`, `POSTGRES_PASSWORD`, and `DATABASE_URL`.

## Terraform

```bash
cd infra/terraform
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform fmt
terraform validate
terraform plan
terraform apply
```

The backend deploy uses SSH as `root@167.233.100.112` by default and uploads a
clean backend tarball instead of copying local virtualenvs or SQLite files.

Uploaded CMS assets are stored in the Docker `media-data` volume and served by
Caddy from `/media/`. Do not treat uploaded files as collected static assets.

## Certificate renewal

The deploy installs a cron entry that runs `/opt/gathondu/renew-cert.sh` every
12 hours. Let's Encrypt IP address certificates are short-lived, so renewal must
remain active.
