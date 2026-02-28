#!/bin/bash
set -e
export DEBIAN_FRONTEND=noninteractive

apt-get update -qq
sudo apt-get upgrade -y
sudo apt-get install -y \
    curl git unzip build-essential apt-transport-https \
    ca-certificates gnupg lsb-release jq

############################################
# Node.js
############################################

curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

############################################
# .NET SDK (LTS)
############################################

if ! command -v dotnet &> /dev/null; then
    echo "Installing .NET SDK..."

    wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb
    sudo dpkg -i packages-microsoft-prod.deb
    rm packages-microsoft-prod.deb

    sudo apt-get update -y
    sudo apt-get install -y dotnet-sdk-8.0
fi

# # .NET
# wget https://dot.net/v1/dotnet-install.sh -O /tmp/dotnet-install.sh
# chmod +x /tmp/dotnet-install.sh
# sudo -u vagrant /tmp/dotnet-install.sh --channel 8.0 --install-dir /home/vagrant/.dotnet

# Update .bashrc for vagrant user
cat >> /home/vagrant/.bashrc << "BASHEOF"
export DOTNET_ROOT=$HOME/.dotnet
export PATH=$PATH:$DOTNET_ROOT
BASHEOF


############################################
# Docker (REQUIRED for Cosmos Emulator)
############################################

if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."

    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
      sudo gpg --dearmor -o /usr/share/keyrings/docker.gpg

    echo \
      "deb [arch=$(dpkg --print-architecture) \
      signed-by=/usr/share/keyrings/docker.gpg] \
      https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    sudo apt-get update -y
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io

    sudo usermod -aG docker vagrant
    sudo systemctl enable docker
fi

############################################
# Azure Functions Core Tools
############################################

if ! command -v func &> /dev/null; then
    echo "Installing Azure Functions Core Tools..."

    curl https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -

    sudo add-apt-repository \
      "deb [arch=amd64] https://packages.microsoft.com/ubuntu/22.04/prod jammy main"

    sudo apt-get update -y
    sudo apt-get install -y azure-functions-core-tools-4
fi


# # Azure Functions Core Tools
# wget -q https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb
# dpkg -i packages-microsoft-prod.deb
# apt-get update -qq
# apt-get install -y azure-functions-core-tools-4

# Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | bash

# Terraform
wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor -o /usr/share/keyrings/hashicorp.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp.gpg] https://apt.releases.hashicorp.com jammy main" > /etc/apt/sources.list.d/hashicorp.list
apt-get update -qq
apt-get install -y terraform

# chown -R vagrant:vagrant /vagrant
# echo "VM ready! Node: $(node --version)"



############################################
# Cosmos DB Linux Emulator
############################################

echo "Pulling Cosmos DB Emulator (vnext-preview)..."
# NOTE: The legacy image has a time-limited evaluation license that expires.
# vnext-preview is the current stable Linux emulator without that restriction.
sudo docker pull mcr.microsoft.com/cosmosdb/linux/azure-cosmos-emulator:vnext-preview

############################################
# Folder structure
############################################

sudo chown -R vagrant:vagrant /home/vagrant/dev

echo "✅ Dev VM ready!"