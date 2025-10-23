#!/bin/bash

# === CONFIG ===
BRANCH="main"                     # change if you use 'master' or another branch
COMMIT_MSG="auto: updated files"  # default commit message
WATCH_DIRS="app components pages" # limit what folders to watch (optional)

# === START ===
echo "🚀 Watching for file changes in: $WATCH_DIRS"
fswatch -o $WATCH_DIRS | while read f
do
  echo "✏️  File changed — committing and pushing..."
  git add .
  git commit -m "$COMMIT_MSG"
  git pull --rebase origin $BRANCH   # ensure up-to-date
  git push origin $BRANCH
  echo "✅ Code pushed to GitHub!"
done
