# Interactive Workflow

The `/modernize` command provides a guided migration experience:

## 1. Project Scan

Automatically detects your tech stack and scans for legacy patterns.

## 2. Dimension Selection

Choose which migrations to perform:

```
📦 Available migration dimensions:
[1] Vue 2 → Vue 3    (42 patterns, 18 files)
[2] JS → TypeScript  (35 files without types)
[3] Webpack → Vite   (1 config file)
[4] Jest → Vitest    (8 test files)
[5] Vuex → Pinia     (2 store files)
```

## 3. Migration Plan

Generates an ordered plan with risk assessment.

## 4. Step-by-Step Execution

Each file migration shows:
- Full diff preview
- Description of changes
- Confirmation prompt (Accept / Skip / Edit)

## 5. Completion Summary

After migration:
- Statistics (files migrated, skipped)
- Suggested next steps (run tests, build check)
- Migration log saved for reference
