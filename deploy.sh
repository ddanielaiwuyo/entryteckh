#!/bin/bash
set -e

echo "==> Pulling latest code..."
git pull origin main

echo "==> Rebuilding and restarting containers..."
docker compose up -d --build --remove-orphans

echo "==> Issuing/renewing SSL certificate..."
docker compose run --rm certbot

echo "==> Reloading Nginx..."
docker compose exec nginx nginx -s reload

echo "==> Done. EntryTech is live at https://entrytech.co.uk"
