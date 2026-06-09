provider "vercel" {
  api_token = var.vercel_api_token
}

locals {
  backend_origin  = "https://${var.backend_ip}"
  backend_api_url = "${local.backend_origin}/api/portfolio/"
  app_dir         = "/opt/gathondu"
}

data "archive_file" "backend" {
  type        = "tar.gz"
  source_dir  = "${path.module}/../../backend"
  output_path = "${path.module}/.terraform/backend.tar.gz"

  excludes = [
    ".env",
    ".env.*",
    ".venv",
    "__pycache__",
    "db.sqlite3",
    "media",
    "staticfiles",
    "*.pyc",
  ]
}

resource "vercel_project" "frontend" {
  name           = var.vercel_project_name
  framework      = "nextjs"
  root_directory = "frontend"

  git_repository = {
    type = "github"
    repo = var.github_repo
  }
}

resource "vercel_project_environment_variable" "portfolio_api_url" {
  project_id = vercel_project.frontend.id
  key        = "PORTFOLIO_API_URL"
  value      = local.backend_api_url
  target     = ["production", "preview"]
  sensitive  = true
}

resource "vercel_project_environment_variable" "portfolio_backend_origin" {
  project_id = vercel_project.frontend.id
  key        = "PORTFOLIO_BACKEND_ORIGIN"
  value      = local.backend_origin
  target     = ["production", "preview"]
  sensitive  = true
}

resource "null_resource" "backend_server" {
  triggers = {
    backend_archive_sha = data.archive_file.backend.output_sha256
    deploy_revision     = var.deploy_revision
  }

  connection {
    type        = "ssh"
    host        = var.backend_ip
    user        = var.ssh_user
    port        = var.ssh_port
    private_key = file(pathexpand(var.ssh_private_key_path))
  }

  provisioner "remote-exec" {
    inline = [
      "set -eu",
      "mkdir -p ${local.app_dir}/backend ${local.app_dir}/caddy",
      "apt-get update",
      "apt-get install -y ca-certificates curl gnupg tar",
      "if ! command -v docker >/dev/null 2>&1; then install -m 0755 -d /etc/apt/keyrings && curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc && chmod a+r /etc/apt/keyrings/docker.asc && . /etc/os-release && echo \"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $${VERSION_CODENAME} stable\" > /etc/apt/sources.list.d/docker.list && apt-get update && apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin; fi",
    ]
  }

  provisioner "file" {
    source      = data.archive_file.backend.output_path
    destination = "${local.app_dir}/backend.tar.gz"
  }

  provisioner "file" {
    source      = "${path.module}/../backend/compose.yaml"
    destination = "${local.app_dir}/compose.yaml"
  }

  provisioner "file" {
    source      = "${path.module}/../backend/Caddyfile.http"
    destination = "${local.app_dir}/Caddyfile.http"
  }

  provisioner "file" {
    source      = "${path.module}/../backend/Caddyfile.https"
    destination = "${local.app_dir}/Caddyfile.https"
  }

  provisioner "file" {
    source      = "${path.module}/../backend/deploy.sh"
    destination = "${local.app_dir}/deploy.sh"
  }

  provisioner "file" {
    source      = "${path.module}/../backend/renew-cert.sh"
    destination = "${local.app_dir}/renew-cert.sh"
  }

  provisioner "file" {
    source      = pathexpand(var.backend_env_file)
    destination = "${local.app_dir}/.env.production"
  }

  provisioner "remote-exec" {
    inline = [
      "set -eu",
      "rm -rf ${local.app_dir}/backend",
      "mkdir -p ${local.app_dir}/backend",
      "tar -xzf ${local.app_dir}/backend.tar.gz -C ${local.app_dir}/backend",
      "chmod +x ${local.app_dir}/deploy.sh ${local.app_dir}/renew-cert.sh ${local.app_dir}/backend/docker-entrypoint.sh",
      "cd ${local.app_dir} && APP_DIR=${local.app_dir} SERVER_IP=${var.backend_ip} CERTBOT_EMAIL='${var.certbot_email}' ./deploy.sh",
      "(crontab -l 2>/dev/null | grep -v '${local.app_dir}/renew-cert.sh'; echo '0 */12 * * * APP_DIR=${local.app_dir} ${local.app_dir}/renew-cert.sh >> /var/log/gathondu-certbot-renew.log 2>&1') | crontab -",
    ]
  }
}
