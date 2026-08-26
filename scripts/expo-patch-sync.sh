#!/usr/bin/env bash
# Bring expo package versions back in line with what expo-doctor expects.
#
# Expo publishes SDK 57 patches roughly weekly. The promotion gate runs
# expo-doctor, so a docs-only promotion fails on drift that has nothing to do
# with the change being promoted. This happened three times in eight days
# (2026-08-18, 08-22, 08-26) and each time the fix was identical.
#
# Usage: bash scripts/expo-patch-sync.sh
# Then commit package.json + package-lock.json.
#
# npm 10 is pinned for the lockfile because CI runs Node 22 / npm 10 and
# rejects lockfiles written by npm 11 (missing transitive @emnapi entries).
set -euo pipefail
cd "$(dirname "$0")/.."

echo "Asking expo-doctor what it expects…"
OUT=$(npx --yes expo-doctor 2>&1 || true)

if grep -q "checks passed. No issues detected" <<<"$OUT"; then
  echo "Nothing to do: expo-doctor is already clean."
  exit 0
fi

# The "Patch version mismatches" table prints: <package> <expected> <found>
PAIRS=$(sed -n 's/^\([a-z@][a-z0-9@/-]*\)  *~\{0,1\}\([0-9][0-9.]*\)  *[0-9][0-9.]* *$/\1@~\2/p' <<<"$OUT" || true)

if [ -z "$PAIRS" ]; then
  echo "expo-doctor is unhappy, but not about patch versions. Read it yourself:"
  echo "$OUT"
  exit 1
fi

echo "Bumping:"; echo "$PAIRS" | sed 's/^/  /'
for pair in $PAIRS; do
  npm pkg set "dependencies.${pair%@*}=${pair##*@}"
done

echo "Regenerating the lockfile with npm 10 (CI's resolver)…"
npx --yes npm@10 install --package-lock-only >/dev/null
npm ci >/dev/null

echo
npx --yes expo-doctor
