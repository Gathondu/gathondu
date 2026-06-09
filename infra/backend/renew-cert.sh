#!/bin/sh
set -eu

APP_DIR="${APP_DIR:-/opt/gathondu}"

cd "$APP_DIR"

docker compose run --rm certbot renew --deploy-hook "true"
docker compose exec -T caddy caddy reload --config /etc/caddy/Caddyfile
