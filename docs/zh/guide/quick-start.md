# 快速上手

## 使用 Claude Code Skill

安装后，在项目中打开 Claude Code：

```
/analyze                           # 扫描当前项目
/modernize                         # 启动交互式迁移向导
```

### /analyze

扫描你的项目并生成结构化的迁移报告：

```
📊 扫描完成
- Vue 2→3:    42 个模式分布在 18 个文件（5 个严重，12 个警告）
- JS→TS:      35 个 JavaScript 文件缺少类型
- Webpack→Vite: 检测到 1 个 webpack.config.js
- 总计: 78 个模式覆盖 6 个维度
```

### /modernize

交互式向导，逐步引导迁移，每步都有 diff 预览。

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

// 单文件扫描
const patterns = scanFileContent(content, 'src/components/Counter.vue')
patterns.forEach(p => {
  console.log(`[${p.severity}] ${p.name}: ${p.suggestion}`)
})
```
