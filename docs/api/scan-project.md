# scanProject()

Scan a project directory and produce a full analysis report.

```typescript
function scanProject(options: ScannerOptions): Promise<AnalysisReport>
```

## Parameters

- **options.root** `string` — Project root directory
- **options.include** `string[]` — File globs to include
- **options.exclude** `string[]` — File globs to exclude
- **options.maxFiles** `number` — Max files to scan (0 = unlimited)
- **options.maxMatchesPerRule** `number` — Max matches per rule per file (default: 10)

## Returns

`Promise<AnalysisReport>`

## Example

```typescript
import { scanProject } from 'legacy-modernizer'

const report = await scanProject({
  root: process.cwd(),
  exclude: ['node_modules/**', 'dist/**'],
})

console.log(`Risk: ${report.risk.level}`)
console.log(`Patterns: ${report.totalPatterns}`)
```
