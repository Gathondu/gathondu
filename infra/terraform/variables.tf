variable "vercel_api_token" {
  description = "Vercel API token used to manage the frontend project."
  type        = string
  sensitive   = true
}

variable "vercel_project_name" {
  description = "Name for the Vercel project."
  type        = string
  default     = "gathondu"
}

variable "github_repo" {
  description = "GitHub repository connected to Vercel."
  type        = string
  default     = "Gathondu/gathondu"
}

variable "backend_ip" {
  description = "Public IPv4 address for the backend server."
  type        = string
  default     = "167.233.100.112"
}

variable "ssh_user" {
  description = "SSH user for server provisioning."
  type        = string
  default     = "root"
}

variable "ssh_port" {
  description = "SSH port for server provisioning."
  type        = number
  default     = 22
}

variable "ssh_private_key_path" {
  description = "Path to the private key used for root SSH access."
  type        = string
  default     = "~/.ssh/id_rsa"
}

variable "backend_env_file" {
  description = "Path to the untracked production env file uploaded to the server."
  type        = string
  default     = "../backend/.env.production"
}

variable "certbot_email" {
  description = "Optional email address for Let's Encrypt registration and expiry notices."
  type        = string
  default     = ""
}

variable "deploy_revision" {
  description = "Change this value to force Terraform to re-upload and redeploy the backend."
  type        = string
  default     = "manual-1"
}
