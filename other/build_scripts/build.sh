#!/bin/bash

LOGFILE="/home/zeiadbadawy/build_release.log"

rm -f "$LOGFILE"
touch "$LOGFILE"
chmod 644 "$LOGFILE"

# Redirect stdout and stderr to log file
exec > >(tee -a "$LOGFILE") 2>&1

WEBHOOK_URL="DISCORD_WEBHOOK_URL"

### echo "Simulating discord notification: Starting Android APK release build."

MESSAGE="Starting Android APK release build."

# Send message to Discord
curl -X POST -H "Content-Type: application/json" \
  -d "{\"content\": \"$MESSAGE\"}" \
  $WEBHOOK_URL

cd ccg_frontend/ccg_mobile/
npm install --legacy-peer-deps
rm -rf android
npx expo prebuild --platform android
cd android
./gradlew assembleRelease
rm -f ~/webhook-listener/release/ConcordiaCampusGuide.apk
cp app/build/outputs/apk/release/app-release.apk ~/webhook-listener/release/ConcordiaCampusGuide.apk

### echo "Simulating discord notification: Android APK release build complete!"

MESSAGE="Android APK release build complete! Download at: https://get.ccgapp.com/release/ConcordiaCampusGuide.apk"


curl -X POST -H "Content-Type: application/json" \
  -d '{
    "content": "'"$MESSAGE"'",
    "embeds": [{
      "image": {
        "url": "https://get.ccgapp.com/release/ccg_android.png"
      }
    }]
  }' \
  $WEBHOOK_URL
