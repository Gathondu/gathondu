SHELL := /bin/sh

APP_DIR ?= /opt/gathondu
ENV_FILE ?= .env.production
SERVICE ?= web
EXEC_FLAGS ?=
RUN_FLAGS ?= --rm --entrypoint python
LOG_LINES ?= 200
BACKUP_DIR ?= backups

COMPOSE := docker compose --env-file $(ENV_FILE)
MANAGE := python manage.py

.DEFAULT_GOAL := help

.PHONY: help check-env ps up deploy restart restart-server restart-web restart-caddy reload-caddy down build logs logs-web logs-caddy shell sh manage manage-run migrate makemigrations collectstatic seed seed-reset createsuperuser superuser dbshell db-backup cert-renew

help:
	@printf '%s\n' 'Gathondu backend server commands'
	@printf '%s\n' ''
	@printf '%s\n' 'Usage:'
	@printf '%s\n' '  make manage CMD="createsuperuser"'
	@printf '%s\n' '  make logs-web'
	@printf '%s\n' '  make restart'
	@printf '%s\n' ''
	@printf '%s\n' 'Targets:'
	@printf '%s\n' '  ps               Show compose service status'
	@printf '%s\n' '  up               Start the backend stack'
	@printf '%s\n' '  deploy           Run ./deploy.sh'
	@printf '%s\n' '  restart          Restart the web service'
	@printf '%s\n' '  restart-server   Restart the Django web service'
	@printf '%s\n' '  restart-caddy    Restart Caddy'
	@printf '%s\n' '  reload-caddy     Reload Caddy configuration'
	@printf '%s\n' '  logs-web         Tail Django logs'
	@printf '%s\n' '  shell            Open a shell in the web container'
	@printf '%s\n' '  manage           Run manage.py in the running web container'
	@printf '%s\n' '  manage-run       Run manage.py in a one-off web container'
	@printf '%s\n' '  migrate          Run Django migrations'
	@printf '%s\n' '  makemigrations   Create Django migrations'
	@printf '%s\n' '  collectstatic    Collect static files'
	@printf '%s\n' '  seed             Seed portfolio content'
	@printf '%s\n' '  seed-reset       Back up the database, then run seed_portfolio --reset'
	@printf '%s\n' '  createsuperuser  Create a Django admin user'
	@printf '%s\n' '  dbshell          Open Django dbshell'
	@printf '%s\n' '  db-backup        Write a Postgres dump to $(BACKUP_DIR)'
	@printf '%s\n' '  cert-renew       Renew certificates'

check-env:
	@test -f "$(ENV_FILE)" || { printf '%s\n' "Missing $(ENV_FILE). Run this from $(APP_DIR) on the server."; exit 1; }

ps: check-env
	$(COMPOSE) ps

up: check-env
	$(COMPOSE) up -d

deploy:
	APP_DIR="$(APP_DIR)" ./deploy.sh

restart: restart-web

restart-server: restart-web

restart-web: check-env
	$(COMPOSE) restart web

restart-caddy: check-env
	$(COMPOSE) restart caddy

reload-caddy: check-env
	$(COMPOSE) exec $(EXEC_FLAGS) caddy caddy reload --config /etc/caddy/Caddyfile

down: check-env
	$(COMPOSE) down

build: check-env
	$(COMPOSE) build

logs: check-env
	$(COMPOSE) logs --tail=$(LOG_LINES) -f

logs-web: check-env
	$(COMPOSE) logs --tail=$(LOG_LINES) -f web

logs-caddy: check-env
	$(COMPOSE) logs --tail=$(LOG_LINES) -f caddy

shell: check-env
	$(COMPOSE) exec $(EXEC_FLAGS) web sh

sh: shell

manage: check-env
	@test -n "$(CMD)" || { printf '%s\n' 'Usage: make manage CMD="check"'; exit 1; }
	$(COMPOSE) exec $(EXEC_FLAGS) $(SERVICE) $(MANAGE) $(CMD)

manage-run: check-env
	@test -n "$(CMD)" || { printf '%s\n' 'Usage: make manage-run CMD="check"'; exit 1; }
	$(COMPOSE) run $(RUN_FLAGS) $(SERVICE) manage.py $(CMD)

migrate: check-env
	$(COMPOSE) exec $(EXEC_FLAGS) web $(MANAGE) migrate

makemigrations: check-env
	$(COMPOSE) exec $(EXEC_FLAGS) web $(MANAGE) makemigrations

collectstatic: check-env
	$(COMPOSE) exec $(EXEC_FLAGS) web $(MANAGE) collectstatic --noinput

seed: check-env
	$(COMPOSE) exec $(EXEC_FLAGS) web $(MANAGE) seed_portfolio

seed-reset: db-backup
	$(COMPOSE) exec $(EXEC_FLAGS) web $(MANAGE) seed_portfolio --reset

createsuperuser: check-env
	$(COMPOSE) exec $(EXEC_FLAGS) web $(MANAGE) createsuperuser

superuser: createsuperuser

dbshell: check-env
	$(COMPOSE) exec $(EXEC_FLAGS) web $(MANAGE) dbshell

db-backup: check-env
	@mkdir -p "$(BACKUP_DIR)"
	$(COMPOSE) exec -T postgres sh -c 'pg_dump -U "$$POSTGRES_USER" "$$POSTGRES_DB"' > "$(BACKUP_DIR)/gathondu-$$(date +%Y%m%d-%H%M%S).sql"

cert-renew: check-env
	./renew-cert.sh
