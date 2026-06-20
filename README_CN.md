# 🏗️ Legacy Modernizer

> AI 驱动的遗留代码现代化工具 — Vue 2→3、JS→TS、Webpack→Vite — 语义级迁移，不是正则替换。

[![npm version](https://img.shields.io/npm/v/legacy-modernizer.svg)](https://www.npmjs.com/package/legacy-modernizer)
[![license](https://img.shields.io/npm/l/legacy-modernizer.svg)](https://github.com/saqqdy/legacy-modernizer/blob/main/LICENSE)

[English](README.md)

---

## 🎯 解决什么问题

| 场景 | 传统工具 (codemod) | Legacy Modernizer |
|------|-------------------|-------------------|
| `this.$refs.input` → ? | 规则：`this.$refs.xxx → ???` 无法决定用 ref 还是 useTemplateRef | AI 理解：这个 ref 在 mounted 里用于 focus() → `useTemplateRef('input')` + `onMounted` |
| Mixin → Composable | 只能规则匹配，无法合并重叠状态 | AI 理解业务逻辑边界 → 干净的 composable 提取 |
| `process.env.X` → ? | 简单替换 → `import.meta.env.X` | AI 检查 X 是什么，是否需要 `VITE_` 前缀 |

**核心洞察**：迁移需要理解代码*意图*，不仅是语法模式。

---

## ✨ 核心功能

### 🔍 多维度扫描

扫描项目中的遗留模式，覆盖 6 个迁移维度：

- **Vue 2→3**: Options API、$refs、$emit、mixins、filters 等
- **JS→TS**: 无类型文件、PropTypes、JSDoc 类型
- **Webpack→Vite**: 配置文件、require.context、process.env
- **Jest→Vitest**: 全局函数、配置文件
- **Vuex→Pinia**: Store 实例、map 辅助函数
- **ESLint 现代化**: 旧版配置格式

### 📋 结构化分析报告

- 按维度和严重等级分类统计
- 风险评估（低/中/高）及原因
- 推荐迁移顺序
- 工作量估算（人天）

### 🧠 AI 语义迁移（v0.2.0+）

不只是正则替换 — AI 理解代码意图，生成语义等价的现代代码。

### 🔄 交互式迁移向导（v0.7.0+）

逐步引导的迁移流程，每一步都有 diff 预览和确认。

---

## 🚀 快速开始

### 方式 1: Claude Code Skill（推荐）

```bash
cd your-project
git clone https://github.com/saqqdy/legacy-modernizer.git .legacy-modernizer
cp -r .legacy-modernizer/.claude/skills/ .claude/skills/
```

在 Claude Code 中：

```
/analyze                           # 扫描当前项目的遗留模式
/modernize                         # 启动交互式迁移向导
```

### 方式 2: 编程式使用

```bash
pnpm add legacy-modernizer
```

```typescript
import { scanProject, scanFileContent } from 'legacy-modernizer'

// 全项目扫描
const report = await scanProject({
  root: process.cwd(),
  include: ['**/*.{vue,js,ts}'],
  exclude: ['node_modules/**', 'dist/**'],
})

console.log(`发现 ${report.totalPatterns} 个模式，${report.totalFiles} 个文件`)
console.log(`风险: ${report.risk.level} — ${report.risk.reason}`)

// 单文件扫描
const patterns = scanFileContent(content, 'src/components/Counter.vue')
patterns.forEach(p => console.log(`[${p.severity}] ${p.name}: ${p.suggestion}`))
```

---

## 📋 版本路线图

| 版本 | 代码名 | 主题 | 状态 |
|------|--------|------|------|
| v0.1.0 | Daybreak | 插件骨架 + `/analyze` 扫描器 | ✅ 当前 |
| v0.2.0 | Sunrise | Vue 2→3 单文件迁移 MVP | 📋 计划中 |
| v0.3.0 | Dawn | Agent 批量迁移 + 验证 | 📋 计划中 |
| v0.4.0 | Ember | JS→TS 渐进式迁移 | 📋 计划中 |
| v0.5.0 | Catalyst | Webpack→Vite 构建迁移 | 📋 计划中 |
| v0.6.0 | Forge | 辅助迁移全家桶 | 📋 计划中 |
| v0.7.0 | Compass | 交互式迁移向导 | 📋 计划中 |
| v0.8.0 | Anchor | 日志/回滚/文档 | 📋 计划中 |
| v1.0.0 | Lighthouse | 生产就绪 + 市场发布 | 📋 计划中 |
| v2.0.0 | Horizon | 通用框架 + React 驱动 | 🔮 远景 |

---

## 🛠️ 开发

```bash
pnpm install          # 安装依赖
pnpm run lint         # ESLint 检查 + 自动修复
pnpm run typecheck    # TypeScript 类型检查
pnpm run test         # 运行测试 (vitest)
pnpm run build        # 构建 (ESM + CJS)
pnpm run dev          # 监听模式开发
```

---

## 📄 许可证

[MIT](./LICENSE)
