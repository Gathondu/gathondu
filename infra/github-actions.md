# GitHub Actions Deployment

The workflow at `.github/workflows/deploy-backend.yml` deploys the Django backend
to `https://167.233.100.112` whenever backend or deployment files are pushed to
`main`. Vercel should still deploy the frontend from GitHub automatically.

## Required GitHub secrets

Create these in GitHub under **Settings -> Secrets and variables -> Actions**:

```text
SERVER_USERNAME=root
SERVER_PASSWORD=your-server-password
BACKEND_ENV_PRODUCTION=<paste the full production env block>
```

Recommended additional secrets:

```text
SERVER_HOST=167.233.100.112
SERVER_PORT=22
SERVER_APP_DIR=/opt/gathondu
CERTBOT_EMAIL=you@example.com
```

`CERTBOT_EMAIL` is optional, but recommended for Let's Encrypt expiry notices.

## BACKEND_ENV_PRODUCTION example

Paste this as a multiline GitHub secret named `BACKEND_ENV_PRODUCTION`, replacing
the secret values:

```env
DJANGO_SECRET_KEY=replace-with-a-long-random-secret
DJANGO_DEBUG=false
DJANGO_ALLOWED_HOSTS=167.233.100.112
DJANGO_CSRF_TRUSTED_ORIGINS=https://167.233.100.112
DJANGO_CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
DJANGO_CORS_ALLOWED_ORIGIN_REGEXES=^https://[a-z0-9-]+\.vercel\.app$
DJANGO_SECURE_SSL_REDIRECT=true
DJANGO_SECURE_HSTS_SECONDS=31536000
POSTGRES_DB=gathondu
POSTGRES_USER=gathondu
POSTGRES_PASSWORD=replace-with-a-strong-password
DATABASE_URL=postgres://gathondu:replace-with-a-strong-password@postgres:5432/gathondu
```

The `POSTGRES_PASSWORD` value and the password inside `DATABASE_URL` must match.

## Vercel environment variables

Add these to the Vercel project for production and preview:

```env
PORTFOLIO_API_URL=https://167.233.100.112/api/portfolio/
PORTFOLIO_BACKEND_ORIGIN=https://167.233.100.112
```

## Notes

- The workflow uses SSH password auth because the current server credential plan
  uses a username and password.
- If `SERVER_USERNAME` is not `root`, the account must have password-based
  `sudo` access.
- The workflow installs Docker Engine on Ubuntu/Debian if Docker is missing.
- Certbot renewal is installed at `/etc/cron.d/gathondu-certbot-renew`.
