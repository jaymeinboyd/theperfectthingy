#!/usr/bin/env bash
# Build pinned upstream daedalOS static desktop into TPT/public/jenniferdemo.
# Cloudflare Pages must run this and publish the public/ directory.
# Never accesses the client's vault, tokens, or TPT license system.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
UPSTREAM_SHA="f017b393d4175eb396a741a7562299423843f1b1"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

git -C "$TMP" init -q
git -C "$TMP" remote add origin https://github.com/DustinBrett/daedalOS.git
git -C "$TMP" fetch --quiet --depth 1 origin "$UPSTREAM_SHA"
git -C "$TMP" checkout --quiet --detach FETCH_HEAD

(
  cd "$TMP"
  node "$ROOT/scripts/jenniferdemo/configure.mjs"
  npm exec --yes --package=yarn@1.22.22 -- yarn install --frozen-lockfile --non-interactive
  npm exec --yes --package=yarn@1.22.22 -- yarn build:prebuild
  npm exec --yes --package=yarn@1.22.22 -- yarn next build --webpack
)

cd "$ROOT"
DAEDALOS_OUT="$TMP/out" node scripts/jenniferdemo/audit.mjs

DEST="$ROOT/public/jenniferdemo"
rm -rf "$DEST"
mkdir -p "$DEST"
cp -a "$TMP/out/." "$DEST/"
cp "$TMP/LICENSE" "$DEST/UPSTREAM-MIT-LICENSE.txt"
echo "Staged the pinned vendor build in public/jenniferdemo, without company data."
echo "Browser smoke and security tests must pass before a live deployment."
