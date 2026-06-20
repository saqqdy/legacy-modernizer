# Legacy Modernizer — Claude Code Guide

## Project Overview

Legacy Modernizer 是一个 Claude Code Skill 插件，帮助开发者将遗留前端项目（Vue 2→3、JS→TS、Webpack→Vite）进行 AI 语义级迁移。

## Architecture

```
.claude/skills/legacy-modernizer/  ← Skill 定义（核心产品）
src/                               ← TypeScript 源码（程序化 API）
knowledge/                         ← 迁移知识库
templates/                         ← 报告模板
internal/                          ← 内部规划文档
```

## Development Commands

```bash
pnpm install          # 安装依赖
pnpm run lint         # ESLint 检查 + 自动修复
pnpm run typecheck    # TypeScript 类型检查
pnpm run test         # 运行测试 (vitest)
pnpm run build        # 构建 (ESM + CJS)
pnpm run dev          # 监听模式开发
```

## Key Principles

1. **语义级迁移** — 理解代码意图再做转换，不是模式匹配
2. **逐文件确认** — 每次迁移展示 diff 供用户确认
3. **渐进式** — 支持按维度逐步迁移
4. **可验证** — 每步迁移前后验证语义一致性

## Code Style

- TypeScript 5.9+，strict mode
- 文件命名：kebab-case
- 导出：named exports，不用 default
- 注释密度：匹配 incident-commander 风格，关键模块加 JSDoc
- 测试：vitest，放在同级 `*.test.ts`

## Version Plan

- v0.1.0 Daybreak: 插件骨架 + `/analyze` 扫描
- v0.2.0 Sunrise: Vue 2→3 单文件迁移 MVP
- 完整路线图见 `internal/development-plan.md`
