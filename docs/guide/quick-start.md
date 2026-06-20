# Quick Start

## Using Claude Code Skill

After installation, open Claude Code in your project:

```
/analyze                           # Scan current project
/modernize                         # Launch interactive migration wizard
```

### /analyze

Scans your project and generates a structured migration report:

```
📊 Scan complete
- Vue 2→3:    42 patterns in 18 files (5 critical, 12 warning)
- JS→TS:      35 JavaScript files without types
- Webpack→Vite: 1 webpack.config.js detected
- Total: 78 patterns across 6 dimensions
```

### /modernize

Interactive wizard that guides you through migration step by step with diff preview at every step.

## Using Programmatic API

```typescript
import { scanProject, scanFileContent, renderAnalysisReport } from 'legacy-modernizer'

// Full project scan
const report = await scanProject({
  root: process.cwd(),
  include: ['**/*.{vue,js,ts}'],
  exclude: ['node_modules/**', 'dist/**'],
})

// Render Markdown report
const markdown = renderAnalysisReport(report)
console.log(markdown)

// Single file scan
const patterns = scanFileContent(content, 'src/components/Counter.vue')
patterns.forEach(p => {
  console.log(`[${p.severity}] ${p.name}: ${p.suggestion}`)
})
```
