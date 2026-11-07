#!/usr/bin/env bash
set -euo pipefail

# Run from SD: bash incoming/lemon-courses/template-overwrite.sh
# This script overwrites the project from SD/incoming/lemon-courses.
# It preserves local Git, secrets, generated artifacts and local-only docs/sources.
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PARENT_DIR="$(dirname -- "$SCRIPT_DIR")"
if [[ "$(basename -- "$PARENT_DIR")" == "incoming" ]]; then
  SD_DIR="$(dirname -- "$PARENT_DIR")"
else
  SD_DIR="$PARENT_DIR"
fi
SOURCE="$SD_DIR/incoming/lemon-courses"
TARGET="$SD_DIR/lemon-courses"

if [[ ! -d "$SOURCE" || ! -f "$SOURCE/package.json" ]]; then
  echo "Missing incoming project: $SOURCE" >&2
  exit 1
fi
if [[ ! -f "$TARGET/package.json" || "$SOURCE" == "$TARGET" ]]; then
  echo "Invalid target project: $TARGET" >&2
  exit 1
fi
if ! command -v rsync >/dev/null 2>&1; then
  echo "rsync is required" >&2
  exit 1
fi

# Protect docs and _sources from deletion, while updating incoming files.
# rsync exclude patterns prevent deleting local secrets, Git and dependencies.
rsync -a --delete \
  --exclude='/.git/' \
  --exclude='/.env' \
  --exclude='/.env.*' \
  --exclude='/node_modules/' \
  --exclude='/.next/' \
  --exclude='/out/' \
  --exclude='/.vercel/' \
  --exclude='/*.tsbuildinfo' \
  --filter='P /docs/***' \
  --filter='P /_sources/***' \
  "$SOURCE/" "$TARGET/"

# Old compiled files cannot be used with a new source revision.
rm -rf -- "$TARGET/.next"
echo "Updated: $TARGET"
echo "Next: cd lemon-courses && npm install && npm run lint && npm run typecheck && npm run build"
