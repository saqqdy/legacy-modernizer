# 🔍 研究发现 — Legacy Modernizer

## 项目背景

Legacy Modernizer 是一个 Claude Code 插件项目，目标是用 AI 语义理解能力帮助开发者将遗留前端项目现代化。

**核心洞察**（来自 claude-code-skill-ideas-project.md）：
- 迁移需要理解语义，不是简单正则替换
- 比如 `this.$refs` → `useTemplateRef()` 需要上下文判断
- 中国市场巨大：大量 Vue 2 项目亟待升级
- 可以拆成多个小 skill（vue2-to-vue3、js-to-ts、class-to-composition）
- 差异化：不是跑 codemod，而是 AI 理解业务逻辑后做语义级迁移

---

## 技术调研

### 项目架构决策（2026-06-20 确认）

1. **Skill + Hook + Agent 三层架构**
   - Skill: 手动触发的迁移能力（/modernize, /analyze 等）
   - Hook: 自动触发的检测拦截（post-edit 检测遗留 API, pre-commit 阻止新模式）
   - Agent: 自主规划的多步迁移流程（planner → executor → verifier）

2. **逐文件迁移 + 预览确认**
   - 先项目级分析，再逐文件迁移
   - 每步输出 diff 供用户确认/跳过/修改
   - 平衡安全性与效率

3. **纯 AI 语义检测 + 规律模板**
   - 主力靠 AI 理解代码语义判断迁移点
   - Skill prompt 内置规律模板弥补纯 AI 可能的遗漏
   - 不引入 AST 解析器，降低开发复杂度

4. **MVP 聚焦 Vue 2→3**
   - 中国市场最大痛点
   - 与核心差异化定位最契合
   - 后续扩展为通用迁移框架

5. **通用迁移框架路线（v2.0+）**
   - v1.0 做深 Vue 生态
   - v2.0 抽象迁移引擎接口（MigrationDriver）
   - 上层按技术栈做插件式驱动（React Hook 迁移、CSS 迁移、后端框架迁移等）
   - v2.x 提供 SDK 让社区贡献新驱动

### Claude Code 插件能力模型
- 待调研：Skill / Hook / Agent 各自的能力边界
- 待调研：现有类似插件的最佳实践

### Vue 2 → Vue 3 迁移要点
- 待整理：关键 API 变更清单
- 待整理：常见迁移模式与陷阱

### JS → TS 迁移要点
- 待整理：渐进式迁移策略对比
- 待整理：Vue 组件类型化方案

### Webpack → Vite 迁移要点
- 待整理：配置映射关系
- 待整理：常见插件/Loader 替代方案

---

## 竞品分析

### 现有迁移工具
| 工具 | 方式 | 局限 |
|------|------|------|
| vue-codemod | AST 规则 | 只能做语法级替换，不理解语义 |
| gogocode | AST+插件 | 需要手写规则，覆盖面有限 |
| ast-grep | AST 模式匹配 | 需要用户写匹配规则 |
| eslint-plugin-vue-compat | Lint 规则 | 只检测不修复 |

**结论**: 所有现有工具都是规则驱动，无法理解业务语义。AI 的差异化优势在此。

---

## 参考资源
- [Vue 3 迁移指南](https://v3-migration.vuejs.org/)
- [Vue 2 → 3 兼容性构建](https://v3-migration.vuejs.org/migration-build.html)
- [Composition API 迁移策略](https://vuejs.org/guide/reusability/composables.html)
