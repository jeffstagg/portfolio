# Portfolio

Static portfolio site built with React + Vite, served from local markdown files.

## Prerequisites

- [VirtualBox](https://www.virtualbox.org/)
- [Vagrant](https://www.vagrantup.com/)

## Setup

### 1. Start the VM

From the repo root:

```bash
vagrant up
```

This provisions an Ubuntu 22.04 VM (6 GB RAM, 4 CPUs) and installs Node.js, Docker, Azure CLI, and Terraform via `bootstrap.sh`.

### 2. Keep files in sync

The repo is synced into the VM at `/home/vagrant/dev` via rsync. In a separate terminal, run:

```bash
vagrant rsync-auto
```

This watches for local file changes and pushes them into the VM automatically.

### 3. SSH into the VM

```bash
vagrant ssh
```

### 4. Start the dev server

```bash
cd /home/vagrant/dev/tooling/scripts
docker compose up
```

The Vite dev server starts at [http://localhost:5173](http://localhost:5173) (port is forwarded from the VM).

## Content

Portfolio content lives in `apps/Portfolio.React/public/content/`:

```text
public/content/
  index.json              ← ordered list of experience and project slugs
  experiences/
    <slug>.md             ← YAML frontmatter only
  projects/
    <slug>.md             ← YAML frontmatter + markdown body
  images/
    <filename>            ← images referenced from markdown
```

Reference images in markdown with an absolute path:

```markdown
![Description](/content/images/filename.png)
```

## Stopping the VM

```bash
vagrant halt      # suspend
vagrant destroy   # delete entirely
```
