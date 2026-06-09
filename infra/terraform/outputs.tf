output "backend_api_url" {
  description = "HTTPS URL for the Django portfolio API."
  value       = local.backend_api_url
}

output "backend_health_url" {
  description = "HTTPS URL for backend health checks."
  value       = "${local.backend_origin}/healthz/"
}

output "vercel_project_id" {
  description = "Vercel project id."
  value       = vercel_project.frontend.id
}

output "vercel_project_name" {
  description = "Vercel project name."
  value       = vercel_project.frontend.name
}
