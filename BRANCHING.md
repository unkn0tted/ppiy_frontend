# Branching Strategy

This repository uses one upstream branch and three working branches.

## Branch Roles

- `upstream/main`
  - Official upstream from `perfect-panel/frontend`
  - Read-only in normal work
- `main`
  - Shared baseline for this repo
  - Only accepts upstream syncs and features/fixes that both brands can use
- `kfc`
  - KFC brand line
  - Holds KFC-only UI and KFC-only custom features
- `weidu`
  - Weidu brand line
  - Holds Weidu-only UI and Weidu-only custom features

## Rules

- Do not develop directly on `upstream/main`.
- Do not put KFC-only UI or behavior into `main`.
- Do not put Weidu-only UI or behavior into `main`.
- Shared features go into `main` first.
- Brand-specific work stays on its own branch.
- Upstream updates are merged into `main` first, then brought into `kfc` and `weidu` as needed.

## Current Structure

- `main` and `weidu` currently point to the shared baseline.
- `kfc` currently contains KFC-specific UI decisions on top of that baseline.

## Common Workflows

### 1. Sync official updates

```bash
git switch main
git fetch upstream
git merge upstream/main
bun run check
bun run build
git push origin main
```

Then update brand branches if needed:

```bash
git switch kfc
git merge main
git push origin kfc

git switch weidu
git merge main
git push origin weidu
```

### 2. Build a shared feature

```bash
git switch main
# develop here
bun run check
bun run build
git push origin main
```

Then merge it into `kfc` and `weidu` when ready.

### 3. Build a KFC-only feature

```bash
git switch kfc
# develop here
bun run check
bun run build
git push origin kfc
```

Do not merge KFC-only UI back into `main`.

### 4. Build a Weidu-only feature

```bash
git switch weidu
# develop here
bun run check
bun run build
git push origin weidu
```

Do not merge Weidu-only UI back into `main`.

## Quick Checks

Useful commands:

```bash
git branch -avv
git log --oneline --decorate --graph --all --simplify-by-decoration
git status
```

## Notes

- GitHub may show `had recent pushes` banners after you push `kfc` or `weidu`.
- That is only a GitHub UI prompt for compare/pull request and does not mean the branch structure is wrong.
