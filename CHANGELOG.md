# Changelog

## 0.1.1 (2026-06-27)

### 🚀 Features

- **plugin**: add `.claude-plugin/plugin.json` for Claude Code marketplace compatibility
  - Move plugin manifest from root to `.claude-plugin/` (standard location)
  - Simplify schema: remove non-standard `commands` and `skills` fields (auto-discovered from skill frontmatter)
  - Fix `repository` field format (string URL instead of object)
  - Prepare for Community Marketplace submission
- **docs**: update README installation instructions
  - Recommend `/plugin install` one-line setup
  - Add manual installation fallback section
  - Sync Chinese and English documentation

## 0.1.0 (2026-06-21)

### 🚀 Features

- **scanner**: add legacy code modernization scanner with multi-dimensional support ([76a01a4](https://github.com/saqqdy/legacy-modernizer/commit/76a01a4))
  - Vue 2→3, JS→TS, Webpack→Vite dimension scanning
  - Pattern detection with severity levels (critical / warning / info)
  - Risk assessment and migration plan generation
- **reporters**: add locale support (`en` / `zh`) to dimension labels in analysis report ([e57e506](https://github.com/saqqdy/legacy-modernizer/commit/e57e506))
- **docs**: add playground section and playground page with live iframe ([1b40945](https://github.com/saqqdy/legacy-modernizer/commit/1b40945))
- **build**: add tsup build configuration with ESM + CJS dual output ([9a42070](https://github.com/saqqdy/legacy-modernizer/commit/9a42070))
- **ci**: add CI/CD workflows — test, release, docs deploy ([9a42070](https://github.com/saqqdy/legacy-modernizer/commit/9a42070))

### 🐛 Bug Fixes

- **workflow**: correct syntax for `package.json` path in docs workflow trigger ([34b9332](https://github.com/saqqdy/legacy-modernizer/commit/34b9332))

### 📝 Documentation

- add comprehensive documentation site with VitePress ([281518f](https://github.com/saqqdy/legacy-modernizer/commit/281518f))
- add Chinese documentation (`/zh/`) with full sync to English version ([8dc5699](https://github.com/saqqdy/legacy-modernizer/commit/8dc5699))
- add README with detailed migration rules and usage options ([07ca77f](https://github.com/saqqdy/legacy-modernizer/commit/07ca77f))
- add ESLint modernization and migration guides to knowledge base ([c2de5a0](https://github.com/saqqdy/legacy-modernizer/commit/c2de5a0))
- add lastUpdated display and sitemap configuration to VitePress ([9905661](https://github.com/saqqdy/legacy-modernizer/commit/9905661))
- update playground route to `/zh/playground/` for Chinese locale ([8dc5699](https://github.com/saqqdy/legacy-modernizer/commit/8dc5699))

### 🔧 Chores

- add initial project configuration (TypeScript, ESLint, Prettier, Git) ([f330dd8](https://github.com/saqqdy/legacy-modernizer/commit/f330dd8))
- update release workflow trigger and permissions ([f3d3a58](https://github.com/saqqdy/legacy-modernizer/commit/f3d3a58))
