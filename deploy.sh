#!/bin/bash
set -e

echo "==> Pulling latest code..."
git pull origin main

echo "==> Installing dependencies..."
npm ci

echo "==> Building frontend..."
npm run build

echo "==> Restarting app..."
pm2 restart entrytech || pm2 start server.js --name entrytech
pm2 save

echo "==> Reloading nginx..."
nginx -t && systemctl reload nginx

echo "==> Done. EntryTech is live at https://entryteckh.co.uk"
