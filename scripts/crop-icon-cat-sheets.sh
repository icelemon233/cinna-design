#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

command -v magick >/dev/null 2>&1 || {
  echo "ImageMagick 'magick' is required." >&2
  exit 1
}

node "$ROOT_DIR/scripts/crop-icon-cat-sheets-smart.mjs"
