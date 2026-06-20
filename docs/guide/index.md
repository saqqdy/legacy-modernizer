# Introduction

Legacy Modernizer is a Claude Code Skill plugin that helps developers modernize legacy frontend projects using AI semantic-level migration.

## Why Legacy Modernizer?

Traditional migration tools (vue-codemod, gogocode, ast-grep) are **rule-driven** — they can only perform syntax-level pattern matching and replacement. But real-world migration requires **understanding code intent**:

| Scenario | Codemod | Legacy Modernizer |
|----------|---------|-------------------|
| `this.$refs.xxx` → ? | Can't decide ref vs useTemplateRef | AI understands "this ref is used in mounted for focus()" |
| Mixin → Composable | Can only rename, not restructure | AI extracts clean composables respecting business logic |
| `process.env.X` | Simple find-replace | AI checks if X needs `VITE_` prefix |

## Core Principles

1. **Semantic Migration** — Understand code intent before transforming
2. **File-by-File Confirmation** — Show diff for every change, no blind batch updates
3. **Progressive** — Support dimension-by-dimension migration
4. **Verifiable** — Validate semantic consistency before and after each step

## What's Next?

- [Installation](/guide/installation) — Get set up in 2 minutes
- [Quick Start](/guide/quick-start) — Scan your first project
- [Vue 2 → 3](/guide/vue2-to-vue3) — Understand the migration path
