# renderAnalysisReport()

将 AnalysisReport 渲染为完整的 Markdown 文档。

```typescript
function renderAnalysisReport(
  report: AnalysisReport,
  locale?: 'en' | 'zh'
): string
```

## 参数

- **report** `AnalysisReport` — 分析报告对象
- **locale** `'en' | 'zh'` — 输出语言，默认 `'zh'`

## 返回值

`string` — Markdown 格式的分析报告

## 示例

```typescript
import { scanProject, renderAnalysisReport } from 'legacy-modernizer'
import { writeFile } from 'node:fs/promises'

const report = await scanProject({ root: '.' })
const markdown = renderAnalysisReport(report)
await writeFile('migration-report.md', markdown)
```
