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
# Docker
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
# Azure CLI
############################################

curl -sL https://aka.ms/InstallAzureCLIDeb | bash

############################################
# Terraform
############################################

wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor -o /usr/share/keyrings/hashicorp.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp.gpg] https://apt.releases.hashicorp.com jammy main" > /etc/apt/sources.list.d/hashicorp.list
apt-get update -qq
apt-get install -y terraform

############################################
# Folder structure
############################################

sudo chown -R vagrant:vagrant /home/vagrant/dev

echo "✅ Dev VM ready!"
