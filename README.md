# 🏗️ Legacy Modernizer

> AI-powered legacy code modernization for frontend projects — Vue 2→3, JS→TS, Webpack→Vite — with semantic understanding, not just regex replacement.

[![npm version](https://img.shields.io/npm/v/legacy-modernizer.svg)](https://www.npmjs.com/package/legacy-modernizer)
[![license](https://img.shields.io/npm/l/legacy-modernizer.svg)](https://github.com/saqqdy/legacy-modernizer/blob/main/LICENSE)

[中文文档](README_CN.md)

---

## 🎯 The Problem It Solves

| Scenario | Traditional Tools (codemod) | Legacy Modernizer |
|----------|---------------------------|-------------------|
| `this.$refs.input` → ? | Rule: `this.$refs.xxx → ???` — can't decide ref vs useTemplateRef | AI understands: "this ref is used in mounted for focus()" → `useTemplateRef('input')` + `onMounted` |
| Mixin → Composable | Rule matching only — can't merge overlapping state | AI understands business logic boundaries → clean composable extraction |
| `process.env.X` → ? | Simple find-replace → `import.meta.env.X` | AI checks what X is and whether it needs `VITE_` prefix |

**Core insight**: Migration requires understanding code *intent*, not just syntax patterns.

---

## ✨ Core Features

### 🔍 Multi-Dimension Scanning

Scan your project for legacy patterns across 6 migration dimensions:

```
📊 Scan complete
- Vue 2→3:    42 patterns in 18 files (5 critical, 12 warning)
- JS→TS:      35 .js files without types
- Webpack→Vite: 1 webpack.config.js detected
- Total: 78 patterns across 6 dimensions
```

### 📋 Structured Analysis Report

Generate a detailed report with risk assessment and recommended migration order:

- Pattern breakdown by dimension and severity
- Risk level (low/medium/high) with reasoning
- Recommended migration order
- Effort estimation (person-days)

### 🧠 AI Semantic Migration (v0.2.0+)

Not just regex — AI understands your code's intent and produces semantically equivalent modern code:

- **Options API → Composition API**: `data()` → `ref()`, `computed:{}` → `computed()`, etc.
- **Mixin → Composable**: Understands business logic boundaries
- **Vue 2 APIs → Vue 3**: `$refs` → `useTemplateRef`, `$emit` → `defineEmits`, etc.

### 🔄 Interactive Migration Wizard (v0.7.0+)

Step-by-step guided migration with diff preview and confirmation at every step.

---

## 🚀 Getting Started

### Option 1: Claude Code Skill (Recommended)

```bash
# Clone into your project directory
cd your-project
git clone https://github.com/saqqdy/legacy-modernizer.git .legacy-modernizer

# Copy the Skill directory
cp -r .legacy-modernizer/.claude/skills/ .claude/skills/
```

Then in Claude Code:

```
/analyze                           # Scan current project for legacy patterns
/modernize                         # Launch interactive migration wizard
```

### Option 2: Programmatic Usage

```bash
pnpm add legacy-modernizer
```

```typescript
import { scanProject, scanFileContent } from 'legacy-modernizer'

// Full project scan
const report = await scanProject({
  root: process.cwd(),
  include: ['**/*.{vue,js,ts}'],
  exclude: ['node_modules/**', 'dist/**'],
})

console.log(`Found ${report.totalPatterns} patterns in ${report.totalFiles} files`)
console.log(`Risk: ${report.risk.level} — ${report.risk.reason}`)

// Single file scan
const patterns = scanFileContent(content, 'src/components/Counter.vue')
patterns.forEach(p => console.log(`[${p.severity}] ${p.name}: ${p.suggestion}`))
```

---

## 📋 Version Roadmap

| Version | Codename | Theme | Status |
|---------|----------|-------|--------|
| v0.1.0 | Daybreak | Plugin skeleton + `/analyze` scanner | ✅ Current |
| v0.2.0 | Sunrise | Vue 2→3 single-file migration MVP | 📋 Planned |
| v0.3.0 | Dawn | Agent-based batch migration + verification | 📋 Planned |
| v0.4.0 | Ember | JS→TS progressive migration | 📋 Planned |
| v0.5.0 | Catalyst | Webpack→Vite build migration | 📋 Planned |
| v0.6.0 | Forge | Auxiliary migrations (Jest→Vitest, Vuex→Pinia, ESLint) | 📋 Planned |
| v0.7.0 | Compass | Interactive migration wizard | 📋 Planned |
| v0.8.0 | Anchor | Migration logging / rollback / documentation | 📋 Planned |
| v1.0.0 | Lighthouse | Production-ready + marketplace publishing | 📋 Planned |
| v2.0.0 | Horizon | Universal framework + React driver | 📋 Future |

---

## 🗂️ Project Structure

```
legacy-modernizer/
├── .claude/skills/legacy-modernizer/   # Skill prompts (core product)
│   ├── skill.md                        # Main entry + command routing
│   ├── analyze.md                      # Scan instructions
│   └── modernize.md                    # Migration wizard instructions
├── src/                                # TypeScript source (programmatic API)
│   ├── types.ts                        # Core type definitions
│   ├── scanners/legacy-scanner.ts      # Legacy pattern detector
│   └── utils/                          # Utility functions
├── knowledge/                          # Migration knowledge base
│   ├── vue2-to-vue3.md                 # Vue 2→3 API mapping
│   ├── js-to-ts.md                     # JS→TS migration patterns
│   └── webpack-to-vite.md             # Build tool migration
├── templates/                          # Report templates
│   ├── analysis-report.md
│   └── migration-log.md
├── internal/                           # Internal planning docs
└── examples/                           # Sample output
```

---

## 🛠️ Development

```bash
pnpm install          # Install dependencies
pnpm run lint         # ESLint check + auto-fix
pnpm run typecheck    # TypeScript type check
pnpm run test         # Run tests (vitest)
pnpm run build        # Build (ESM + CJS)
pnpm run dev          # Watch mode development
```

### Tech Stack

- **Language**: TypeScript 5.9+
- **Build**: rolldown
- **Lint**: @eslint-sets/eslint-config (ESLint 9 flat config)
- **Formatting**: prettier + prettier-config-common
- **Testing**: vitest
- **Package Manager**: pnpm 9

---

## 🆚 Comparison

### vs vue-codemod / gogocode / ast-grep

| Dimension | Code Mods | Legacy Modernizer |
|-----------|-----------|-------------------|
| Approach | AST rule matching | AI semantic understanding |
| `this.$refs.xxx` → ? | Can't decide ref vs useTemplateRef | Understands usage context |
| Mixin merging | Can only rename, not restructure | Extracts clean composables |
| Business logic | Ignores it | Recognizes boundaries |
| Error handling | Rule errors = broken output | Unclear → asks for confirmation |

---

## 📄 License

[MIT](./LICENSE)
