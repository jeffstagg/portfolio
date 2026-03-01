terraform {
  required_version = ">= 1.7.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.110"
    }
  }

  cloud {
    organization = "jeffstagg"

    workspaces {
      name = "portfolio"
    }
  }
}

provider "azurerm" {
  features {}

  subscription_id = var.subscription_id
  tenant_id       = var.tenant_id
  client_id       = var.client_id

  # OIDC — no client secret, token is provided by GitHub Actions at runtime
  use_oidc = true
}
