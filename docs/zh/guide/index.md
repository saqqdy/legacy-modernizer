# 介绍

Legacy Modernizer 是一个 Claude Code Skill 插件，帮助开发者用 AI 语义理解能力将遗留前端项目现代化。

## 为什么需要 Legacy Modernizer？

传统迁移工具（vue-codemod、gogocode、ast-grep）是**规则驱动**的 — 只能做语法级模式匹配和替换。但真实迁移需要**理解代码意图**：

| 场景 | Codemod | Legacy Modernizer |
|------|---------|-------------------|
| `this.$refs.xxx` → ? | 无法决定 ref 还是 useTemplateRef | AI 理解这个 ref 在 mounted 中用于 focus() |
| Mixin → Composable | 只能重命名，无法重构 | AI 提取干净的 composable，尊重业务逻辑 |
| `process.env.X` | 简单替换 | AI 检查 X 是否需要 `VITE_` 前缀 |

## 核心原则

1. **语义级迁移** — 理解代码意图后再做转换
2. **逐文件确认** — 每次修改展示 diff，不做盲批
3. **渐进式** — 支持按维度逐步迁移
4. **可验证** — 每步迁移前后验证语义一致性

## 下一步？

- [安装](/zh/guide/installation) — 2 分钟完成设置
- [快速上手](/zh/guide/quick-start) — 扫描你的第一个项目
- [Vue 2 → 3](/zh/guide/vue2-to-vue3) — 了解迁移路径
