output "static_web_app_url" {
  description = "The default hostname of the deployed Static Web App"
  value       = "https://${azurerm_static_web_app.portfolio.default_host_name}"
}

output "deployment_token" {
  description = "Deployment token used by GitHub Actions to publish the site"
  value       = azurerm_static_web_app.portfolio.api_key
  sensitive   = true
}
