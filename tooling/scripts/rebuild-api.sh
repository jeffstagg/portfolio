#!/bin/bash
cd /home/vagrant/dev/apps/Portfolio.Api
dotnet build
cd /home/vagrant/dev/tooling/scripts
docker compose restart portfolio-api