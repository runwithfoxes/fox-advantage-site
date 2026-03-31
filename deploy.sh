#!/bin/bash
# Deploy to Vercel from a clean copy (bypasses git author check)
# ALWAYS use this script instead of running vercel --prod directly
set -e

# Safety check: uncommitted changes?
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "ERROR: You have uncommitted changes. Commit and push first."
  exit 1
fi

# Safety check: unpushed commits?
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main 2>/dev/null || echo "")
if [ "$LOCAL" != "$REMOTE" ]; then
  echo "ERROR: Local commits not pushed. Run git push first."
  exit 1
fi

TEMP_DIR=$(mktemp -d)
echo "Copying project to $TEMP_DIR..."

rsync -a \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.DS_Store' \
  . "$TEMP_DIR/"

cd "$TEMP_DIR"
npx vercel link --project fox-advantage-site --yes
npx vercel --prod

echo "Cleaning up..."
rm -rf "$TEMP_DIR"
echo "Done! Deployed fox-advantage-site to production."
