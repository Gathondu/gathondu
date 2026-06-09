#!/bin/sh
set -eu

APP_DIR="${APP_DIR:-/opt/gathondu}"
SERVER_IP="${SERVER_IP:-167.233.100.112}"
CERTBOT_EMAIL="${CERTBOT_EMAIL:-}"

cd "$APP_DIR"

mkdir -p caddy
cp Caddyfile.http caddy/Caddyfile

docker compose up -d --build postgres web caddy

CERTBOT_ARGS="certonly --non-interactive --agree-tos --preferred-profile shortlived --webroot --webroot-path /var/www/certbot --ip-address ${SERVER_IP} --cert-name ${SERVER_IP}"

if [ -n "$CERTBOT_EMAIL" ]; then
  CERTBOT_ARGS="$CERTBOT_ARGS --email $CERTBOT_EMAIL"
else
  CERTBOT_ARGS="$CERTBOT_ARGS --register-unsafely-without-email"
fi

if ! docker compose run --rm --entrypoint sh certbot -c "test -f /etc/letsencrypt/live/$SERVER_IP/fullchain.pem"; then
  docker compose run --rm certbot $CERTBOT_ARGS
fi

cp Caddyfile.https caddy/Caddyfile
docker compose up -d --build
docker compose exec -T caddy caddy reload --config /etc/caddy/Caddyfile

docker compose run --rm certbot renew --deploy-hook "true"
