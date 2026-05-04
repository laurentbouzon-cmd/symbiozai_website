#!/bin/bash
# deploy-prod.sh — Deploy symbiozai_website to prod (DO 161.35.206.176)
# Usage: ./scripts/deploy-prod.sh
#
# CRITICAL: content/blog/ is managed exclusively by Content Engine (/opt/content-engine/).
# This script uses --exclude='blog/' to NEVER overwrite CE-managed articles.
# DO NOT remove this exclude or the CE articles will be erased on every deploy.

set -euo pipefail

REMOTE_USER="root"
REMOTE_HOST="161.35.206.176"
REMOTE_DIR="/var/www/symbiozai"
SSH_KEY="$HOME/.ssh/do_symbiozai"
LOCAL_DIR="$(cd "$(dirname "$0")/.." && pwd)"

SSH_CMD="ssh -i $SSH_KEY"

echo "[deploy] Starting deploy from $LOCAL_DIR"

echo "[deploy] Syncing app/"
rsync -avz --delete "$LOCAL_DIR/app/" -e "$SSH_CMD" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/app/"

echo "[deploy] Syncing components/"
rsync -avz --delete "$LOCAL_DIR/components/" -e "$SSH_CMD" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/components/"

echo "[deploy] Syncing lib/"
rsync -avz --delete "$LOCAL_DIR/lib/" -e "$SSH_CMD" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/lib/"

echo "[deploy] Syncing public/"
rsync -avz --delete "$LOCAL_DIR/public/" -e "$SSH_CMD" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/public/"

echo "[deploy] Syncing styles/"
rsync -avz --delete "$LOCAL_DIR/styles/" -e "$SSH_CMD" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/styles/"

echo "[deploy] Syncing content/ (EXCLUDING blog/ — managed by Content Engine)"
rsync -avz --delete --exclude='blog/' "$LOCAL_DIR/content/" -e "$SSH_CMD" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/content/"

echo "[deploy] Syncing root config files"
rsync -avz "$LOCAL_DIR/middleware.ts" "$LOCAL_DIR/next.config.js" "$LOCAL_DIR/package.json" \
  "$LOCAL_DIR/package-lock.json" "$LOCAL_DIR/tailwind.config.js" \
  -e "$SSH_CMD" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/"

echo "[deploy] Running npm install + build on server"
$SSH_CMD "$REMOTE_USER@$REMOTE_HOST" "cd $REMOTE_DIR && npm install --legacy-peer-deps && npm run build"

echo "[deploy] Restarting PM2"
$SSH_CMD "$REMOTE_USER@$REMOTE_HOST" "pm2 restart symbiozai && pm2 status"

echo "[deploy] Done. Smoke check:"
curl -s -o /dev/null -w "symbioz.ai/fr HTTP %{http_code}\n" --max-time 10 "https://symbioz.ai/fr"
curl -s -o /dev/null -w "symbioz.ai/fr/blog HTTP %{http_code}\n" --max-time 10 "https://symbioz.ai/fr/blog"
