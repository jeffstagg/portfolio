resource "azurerm_resource_group" "portfolio" {
  name     = "rg-${var.project_name}"
  location = var.location
}

resource "azurerm_static_web_app" "portfolio" {
  name                = "stapp-${var.project_name}"
  resource_group_name = azurerm_resource_group.portfolio.name
  location            = azurerm_resource_group.portfolio.location
  sku_tier            = "Free"
  sku_size            = "Free"
}
