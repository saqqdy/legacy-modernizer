# scanProject()

扫描项目目录并生成完整的分析报告。

```typescript
function scanProject(options: ScannerOptions): Promise<AnalysisReport>
```

## 参数

- **options.root** `string` — 项目根目录
- **options.include** `string[]` — 包含的文件 glob 模式
- **options.exclude** `string[]` — 排除的文件 glob 模式
- **options.maxFiles** `number` — 最大扫描文件数（0 = 不限）
- **options.maxMatchesPerRule** `number` — 每条规则每文件最大匹配数（默认：10）

## 返回值

`Promise<AnalysisReport>`

## 示例

```typescript
import { scanProject } from 'legacy-modernizer'

const report = await scanProject({
  root: process.cwd(),
  exclude: ['node_modules/**', 'dist/**'],
})

console.log(`风险: ${report.risk.level}`)
console.log(`模式数: ${report.totalPatterns}`)
```
