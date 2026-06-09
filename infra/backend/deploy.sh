#!/bin/sh
set -eu

APP_DIR="${APP_DIR:-/opt/gathondu}"
SERVER_IP="${SERVER_IP:-167.233.100.112}"
CERTBOT_EMAIL="${CERTBOT_EMAIL:-}"

cd "$APP_DIR"

compose() {
  docker compose --env-file .env.production "$@"
}

for required_var in POSTGRES_DB POSTGRES_USER POSTGRES_PASSWORD; do
  if ! grep -Eq "^${required_var}=.+" .env.production; then
    printf '%s\n' "Missing required value in .env.production: ${required_var}" >&2
    exit 1
  fi
done

mkdir -p caddy
cp Caddyfile.http caddy/Caddyfile

compose up -d --build postgres web caddy

CERTBOT_ARGS="certonly --non-interactive --agree-tos --preferred-profile shortlived --webroot --webroot-path /var/www/certbot --ip-address ${SERVER_IP} --cert-name ${SERVER_IP}"

if [ -n "$CERTBOT_EMAIL" ]; then
  CERTBOT_ARGS="$CERTBOT_ARGS --email $CERTBOT_EMAIL"
else
  CERTBOT_ARGS="$CERTBOT_ARGS --register-unsafely-without-email"
fi

if ! compose run --rm --entrypoint sh certbot -c "test -f /etc/letsencrypt/live/$SERVER_IP/fullchain.pem"; then
  compose run --rm certbot $CERTBOT_ARGS
fi

cp Caddyfile.https caddy/Caddyfile
compose up -d --build
compose exec -T caddy caddy reload --config /etc/caddy/Caddyfile

compose run --rm certbot renew --deploy-hook "true"
