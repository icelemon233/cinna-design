#!/usr/bin/env bash
set -euo pipefail

repo_slug="${REPO_SLUG:-icelemon233/cinna-design}"
remote_url="${DEPLOY_REMOTE:-git@github.com:${repo_slug}.git}"
branch="${DEPLOY_BRANCH:-gh-pages}"
site_dir="apps/site/dist"
deploy_dir="$(mktemp -d)"

cleanup() {
  rm -rf "$deploy_dir"
}
trap cleanup EXIT

if ! git ls-remote "$remote_url" >/dev/null 2>&1; then
  echo "Remote repository does not exist or is not accessible: $remote_url" >&2
  echo "Create an empty GitHub repository first, then rerun pnpm deploy:pages." >&2
  exit 1
fi

legacy_source="apps/site/public/legacy-app.js"
if [ ! -f "$legacy_source" ]; then
  echo "Missing legacy app entry: $legacy_source" >&2
  exit 1
fi

legacy_version="$(shasum -a 256 "$legacy_source" | awk '{ print substr($1, 1, 12) }')"
VITE_CINNA_LEGACY_VERSION="$legacy_version" pnpm build:pages
touch "$site_dir/.nojekyll"
cp "$site_dir/index.html" "$site_dir/404.html"

if ! grep -q '"/cinna-design/assets/' "$site_dir/index.html"; then
  echo "Pages build asset base is not /cinna-design/: $site_dir/index.html" >&2
  exit 1
fi

if ! grep -R "legacy-app.js" "$site_dir/assets" >/dev/null || ! grep -R "$legacy_version" "$site_dir/assets" >/dev/null; then
  echo "Pages build did not include legacy app cache-busting version: $legacy_version" >&2
  exit 1
fi

if ! git clone --depth 1 --branch "$branch" "$remote_url" "$deploy_dir" >/dev/null 2>&1; then
  git clone --depth 1 "$remote_url" "$deploy_dir" >/dev/null
  git -C "$deploy_dir" checkout --orphan "$branch"
  git -C "$deploy_dir" rm -rf . >/dev/null 2>&1 || true
fi

rsync -a --delete --exclude ".git" "$site_dir"/ "$deploy_dir"/
touch "$deploy_dir/.nojekyll"

if [ ! -f "$deploy_dir/.nojekyll" ]; then
  echo "Missing .nojekyll in deploy directory." >&2
  exit 1
fi

git -C "$deploy_dir" add -A
if git -C "$deploy_dir" diff --cached --quiet; then
  echo "No Pages changes to publish."
  exit 0
fi

git -C "$deploy_dir" commit -m "Publish Cinna Design site"
git -C "$deploy_dir" push origin "$branch"
