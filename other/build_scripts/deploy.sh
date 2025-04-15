#!/bin/bash

WEBHOOK_URL="DISCORD_WEBHOOK_URL"

# Update Backend

MESSAGE="Backend (Cloud) will be stopped to get updated."

# Send message to Discord
curl -X POST -H "Content-Type: application/json" \
  -d "{\"content\": \"$MESSAGE\"}" \
  $WEBHOOK_URL

cd ~/Concordia_Campus_Guide
sudo systemctl stop ccg_backend
git pull origin main
conda env update --file ccg_backend/environment.yml --prune --name myenv
sudo systemctl start ccg_backend

MESSAGE="Backend (Cloud) has been updated!"

# Send message to Discord
curl -X POST -H "Content-Type: application/json" \
  -d "{\"content\": \"$MESSAGE\"}" \
  $WEBHOOK_URL

# Generate Prod build

sudo systemctl stop build_release
sudo systemctl start build_release
