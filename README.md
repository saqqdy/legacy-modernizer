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

- **Vue 2→3**: Options API, $refs, $emit, mixins, filters, etc.
- **JS→TS**: Untyped files, PropTypes, JSDoc types
- **Webpack→Vite**: Config files, require.context, process.env
- **Jest→Vitest**: Global functions, config files
- **Vuex→Pinia**: Store instances, map helpers
- **ESLint Modernization**: Legacy config formats

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

### Option 1: Claude Code Plugin (Recommended)

**Via Marketplace (recommended):**

```bash
# 1. Add this repo as a marketplace
/plugin marketplace add saqqdy/legacy-modernizer

# 2. Install the plugin
/plugin install legacy-modernizer
```

**Direct install:**

```bash
/plugin install https://github.com/saqqdy/legacy-modernizer
```

After installation, use these commands:

| Command | Description |
|---------|-------------|
| `/analyze` | Scan current project for legacy patterns, generate migration report |
| `/modernize` | Launch interactive migration wizard: scan → select dimensions → generate plan → step-by-step migration |

**How it works:**
1. Open Claude Code in a Vue 2 legacy project
2. Type `/analyze` → get a full legacy pattern analysis report
3. Type `/modernize` → select migration dimension (e.g. Vue 2→3), confirm diffs file by file

### Option 2: Programmatic Usage

```bash
pnpm add legacy-modernizer
```

```typescript
import { scanProject, scanFileContent, renderAnalysisReport } from 'legacy-modernizer'

// Full project scan
const report = await scanProject({
  root: process.cwd(),
  include: ['**/*.{vue,js,ts}'],
  exclude: ['node_modules/**', 'dist/**'],
})

console.log(renderAnalysisReport(report))
// Or access structured data directly
console.log(`Found ${report.totalPatterns} patterns in ${report.totalFiles} files`)
console.log(`Risk: ${report.risk.level} — ${report.risk.reason}`)

// Single file scan
const patterns = scanFileContent(content, 'src/components/Counter.vue')
patterns.forEach(p => console.log(`[${p.severity}] ${p.name}: ${p.suggestion}`))
```

### Option 3: Playground

Try it online without any installation:

```bash
# Clone the repo and start Playground
git clone https://github.com/saqqdy/legacy-modernizer.git
cd legacy-modernizer
pnpm install
pnpm run playground
```

The Playground ships with built-in legacy code samples so you can:
- 📂 Select different sample files to see scan results
- ✏️ Edit code and see real-time legacy pattern detection
- 📊 View structured analysis reports
- 🌐 Toggle Chinese/English report language

---

## 📐 Scan Rules Reference

### Vue 2→3 (15 rules)

| Rule ID | Name | Severity | Description |
|---------|------|----------|-------------|
| `vue2-options-api` | Options API component | 🔵 info | Rewrite using `<script setup>` + Composition API |
| `vue2-data-function` | data() option | 🔵 info | Replace with ref() / reactive() |
| `vue2-computed-option` | computed:{} option | 🔵 info | Replace with computed(() => ...) |
| `vue2-methods-option` | methods:{} option | 🔵 info | Rewrite as plain functions |
| `vue2-watch-option` | watch:{} option | 🔵 info | Replace with watch() / watchEffect() |
| `vue2-this-refs` | this.$refs | 🟡 warning | Replace with useTemplateRef() |
| `vue2-this-emit` | this.$emit | 🟡 warning | Replace with defineEmits() |
| `vue2-this-router` | this.$router / this.$route | 🟡 warning | Replace with useRouter() / useRoute() |
| `vue2-this-store` | this.$store | 🟡 warning | Replace with useStore() or migrate to Pinia |
| `vue2-filters` | filters:{} option | 🔴 critical | Vue 3 removed filters — use computed or methods |
| `vue2-event-bus` | $on / $off / $once | 🔴 critical | Use mitt or tiny-emitter instead |
| `vue2-destroyed` | destroyed / beforeDestroy | 🟡 warning | Replace with unmounted / beforeUnmount |
| `vue2-mixins` | mixins:[] option | 🟡 warning | Replace with Composables |
| `vue2-v-bind-sync` | v-bind.sync modifier | 🔴 critical | Replace with v-model:xxx |
| `vue2-v-on-native` | v-on.native modifier | 🟡 warning | Declare in emits option instead |

### JS→TS (4 rules)

| Rule ID | Name | Severity | Description |
|---------|------|----------|-------------|
| `js-prop-types` | PropTypes validation | 🟡 warning | Replace with TypeScript interface |
| `js-jsdoc-types` | JSDoc type annotations | 🔵 info | Migrate JSDoc types to inline TypeScript types |
| `js-commonjs-export` | CommonJS exports | 🔵 info | Replace with ES module export |
| `js-require-import` | require() import | 🔵 info | Replace with ES import |

### Webpack→Vite (3 rules)

| Rule ID | Name | Severity | Description |
|---------|------|----------|-------------|
| `webpack-config` | webpack.config file | 🔵 info | Migrate to vite.config.ts |
| `webpack-require-context` | require.context | 🟡 warning | Vite uses import.meta.glob instead |
| `webpack-process-env` | process.env usage | 🔵 info | Vite uses import.meta.env instead |

### Jest→Vitest (2 rules)

| Rule ID | Name | Severity | Description |
|---------|------|----------|-------------|
| `jest-config` | Jest config detected | 🔵 info | Migrate to vitest.config.ts |
| `jest-global` | Jest global functions | 🟡 warning | Replace with vitest imports (vi, describe, it, expect) |

### Vuex→Pinia (2 rules)

| Rule ID | Name | Severity | Description |
|---------|------|----------|-------------|
| `vuex-store` | Vuex store usage | 🔵 info | Migrate to Pinia defineStore() |
| `vuex-map-state` | mapState / mapGetters | 🟡 warning | Pinia uses storeToRefs() instead |

### ESLint Modernization (2 rules)

| Rule ID | Name | Severity | Description |
|---------|------|----------|-------------|
| `eslint-legacy-config` | Legacy ESLint config format | 🔵 info | Migrate to ESLint 9 flat config |
| `eslint-override-array` | ESLint overrides array | 🔵 info | Flat config uses multiple config objects |

> **Total**: 6 dimensions, 28 detection rules

---

## 📋 Version Roadmap

| Version | Codename | Theme | Status |
|---------|----------|-------|--------|
| v0.1.0 | Daybreak | Plugin skeleton + `/analyze` scanner | ✅ Released |
| v0.1.1 | Daybreak | Standard plugin installation support | ✅ Current |
| v0.2.0 | Sunrise | Vue 2→3 single-file migration MVP | 📋 Planned |
| v0.3.0 | Dawn | Agent-based batch migration + verification | 📋 Planned |
| v0.4.0 | Ember | JS→TS progressive migration | 📋 Planned |
| v0.5.0 | Catalyst | Webpack→Vite build migration | 📋 Planned |
| v0.6.0 | Forge | Auxiliary migrations (Jest→Vitest, Vuex→Pinia, ESLint) | 📋 Planned |
| v0.7.0 | Compass | Interactive migration wizard | 📋 Planned |
| v0.8.0 | Anchor | Migration logging / rollback / documentation | 📋 Planned |
| v1.0.0 | Lighthouse | Production-ready + marketplace publishing | 📋 Planned |
| v2.0.0 | Horizon | Universal framework + React driver | 🔮 Future |

---

## 🗂️ Project Structure

```
legacy-modernizer/
├── .claude-plugin/                     # Claude Code plugin manifest
│   └── plugin.json                     # Marketplace-compatible configuration
├── .claude/skills/legacy-modernizer/   # Skill prompts (core product)
│   ├── skill.md                        # Main entry + command routing
│   ├── analyze.md                      # Scan instructions
│   └── modernize.md                    # Migration wizard instructions
├── src/                                # TypeScript source (programmatic API)
│   ├── index.ts                        # Entry point, public API exports
│   ├── types.ts                        # Core type definitions
│   ├── scanners/                       # Scanners
│   │   ├── legacy-scanner.ts           # Legacy pattern detector
│   │   └── rules/                      # Per-dimension detection rules
│   │       ├── index.ts                # Rules aggregation
│   │       ├── vue2-to-vue3.ts         # 15 Vue 2→3 rules
│   │       ├── js-to-ts.ts             # 4 JS→TS rules
│   │       ├── webpack-to-vite.ts      # 3 Webpack→Vite rules
│   │       ├── jest-to-vitest.ts       # 2 Jest→Vitest rules
│   │       ├── vuex-to-pinia.ts        # 2 Vuex→Pinia rules
│   │       └── eslint-modernize.ts     # 2 ESLint modernization rules
│   ├── reporters/                      # Report rendering
│   │   ├── analysis.ts                 # Markdown report generation
│   │   └── locale.ts                   # Chinese/English labels
│   └── utils/                          # Utility functions
│       ├── config.ts                   # Config merging
│       └── format.ts                   # Output formatting
├── knowledge/                          # Migration knowledge base
├── templates/                          # Report templates
├── internal/                           # Internal planning docs
├── docs/                               # VitePress documentation site
└── playground/                         # Interactive Playground
```

---

## 🛠️ Development

```bash
pnpm install          # Install dependencies
pnpm run lint         # ESLint check + auto-fix
pnpm run typecheck    # TypeScript type check
pnpm run test         # Run tests (vitest)
pnpm run test:watch   # Test watch mode
pnpm run test:coverage # Test coverage
pnpm run build        # Build (ESM + CJS)
pnpm run dev          # Watch mode development
pnpm run docs:dev     # Start docs dev server
pnpm run playground   # Start Playground
```

### Tech Stack

- **Language**: TypeScript 5.9+, strict mode
- **Build**: rolldown
- **Lint**: @eslint-sets/eslint-config (ESLint 9 flat config)
- **Formatting**: prettier + prettier-config-common
- **Testing**: vitest
- **Docs**: VitePress
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
| Error handling | Rule errors = broken output | Uncertain → asks for confirmation |

---

## 📄 License

[MIT](./LICENSE)
