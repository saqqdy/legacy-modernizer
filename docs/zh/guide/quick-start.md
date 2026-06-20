# 快速上手

## 使用 Claude Code Skill

安装后，在项目中打开 Claude Code：

```
/analyze                           # 扫描当前项目
/modernize                         # 启动交互式迁移向导
```

## 使用编程式 API

```typescript
import { scanProject, scanFileContent, renderAnalysisReport } from 'legacy-modernizer'

// 全项目扫描
const report = await scanProject({
  root: process.cwd(),
  include: ['**/*.{vue,js,ts}'],
  exclude: ['node_modules/**', 'dist/**'],
})

// 渲染 Markdown 报告
const markdown = renderAnalysisReport(report)
console.log(markdown)
```
