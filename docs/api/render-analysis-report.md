# renderAnalysisReport()

Render an AnalysisReport into a full Markdown document.

```typescript
function renderAnalysisReport(report: AnalysisReport): string
```

## Example

```typescript
import { scanProject, renderAnalysisReport } from 'legacy-modernizer'
import { writeFile } from 'node:fs/promises'

const report = await scanProject({ root: '.' })
const markdown = renderAnalysisReport(report)
await writeFile('migration-report.md', markdown)
```
