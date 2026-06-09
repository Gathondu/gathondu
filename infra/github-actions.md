# GitHub Actions Deployment

The workflow at `.github/workflows/deploy-backend.yml` deploys the Django backend
to `https://167.233.100.112` whenever backend or deployment files are pushed to
`main`. Vercel should still deploy the frontend from GitHub automatically.

## Required GitHub secrets

Create these in GitHub under **Settings -> Secrets and variables -> Actions**:

```text
SERVER_USERNAME=root
SERVER_SSH_PRIVATE_KEY=<private key with SSH access to the server>
BACKEND_ENV_PRODUCTION=<paste the full production env block>
```

Recommended additional secrets:

```text
SERVER_HOST=167.233.100.112
SERVER_PORT=22
SERVER_APP_DIR=/opt/gathondu
CERTBOT_EMAIL=you@example.com
SERVER_PASSWORD=your-server-password
SERVER_SSH_PASSPHRASE=your-private-key-passphrase
```

`CERTBOT_EMAIL` is optional, but recommended for Let's Encrypt expiry notices.
`SERVER_PASSWORD` is only required when using password-based SSH, or when
deploying as a non-root user that needs a password for `sudo`.
`SERVER_SSH_PASSPHRASE` is only required when `SERVER_SSH_PRIVATE_KEY` is
encrypted. For CI deploy keys, an unencrypted private key is simpler and avoids
interactive prompt issues.

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

- The workflow uses `SERVER_SSH_PRIVATE_KEY` when it is set. It falls back to
  password auth with `SERVER_PASSWORD` for servers that allow SSH passwords.
- If `SERVER_USERNAME` is not `root`, the account must have password-based
  `sudo` access or passwordless `sudo`.
- The workflow installs Docker Engine on Ubuntu/Debian if Docker is missing.
- Certbot renewal is installed at `/etc/cron.d/gathondu-certbot-renew`.

## Troubleshooting SSH auth

If the upload step fails with `Permission denied (publickey,password)`, the
server rejected the GitHub Actions key for `SERVER_USERNAME`.

On your local machine, print the public key that matches the GitHub secret:

```bash
ssh-keygen -y -f ~/.ssh/gathondu_github_actions
```

On the server, add that public key to the deploy user's `authorized_keys`. For
the default `SERVER_USERNAME=root`:

```bash
mkdir -p /root/.ssh
chmod 700 /root/.ssh
echo 'PASTE_PUBLIC_KEY_HERE' >> /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys
```

The workflow prints the public key fingerprint in the `Prepare SSH private key`
step. It should match the fingerprint for the public key on the server:

```bash
ssh-keygen -lf /root/.ssh/authorized_keys
```
