# 📋 任务计划 — Legacy Modernizer 遗留代码现代化插件

## 项目概述

**项目名称**: Legacy Modernizer — 遗留代码现代化
**定位**: Claude Code 插件（Skill + Hook + Agent），帮助开发者将遗留前端项目现代化
**核心价值**: AI 语义级代码迁移，而非简单正则替换

---

## 阶段规划

### Phase 0: 基础设施搭建 🔄
- [ ] 项目脚手架初始化（plugin.json、目录结构）
- [ ] 开发环境配置（测试框架、lint、CI）
- [ ] 插件基础架构设计（Skill 注册、Hook 机制、Agent 定义）

### Phase 1: Vue 2 → Vue 3 迁移核心 🔄
- [ ] 分析扫描器：识别项目中 Vue 2 特征模式
- [ ] 迁移报告生成：受影响文件、风险等级、迁移路径
- [ ] Options API → Composition API 转换器（核心 Skill）
- [ ] 已废弃 API 替换（$refs → useTemplateRef、$on/$off → mitt 等）
- [ ] 生命周期钩子映射（created → onMounted 等）
- [ ] 混入(mixin) → 组合式函数(composable) 重构

### Phase 2: JavaScript → TypeScript 迁移 🔄
- [ ] 类型推断引擎：从 JS 代码推断 TS 类型
- [ ] 渐进式迁移策略：JSDoc → .d.ts → .ts
- [ ] Vue 组件 Props/Emits 类型化
- [ ] 第三方库类型补全建议

### Phase 3: Webpack → Vite 迁移 🔄
- [ ] 配置文件映射分析（webpack.config → vite.config）
- [ ] 插件/Loader 等价替换建议
- [ ] 环境变量迁移（process.env → import.meta.env）
- [ ] 入口文件与 HTML 模板调整

### Phase 4: 辅助迁移能力 🔄
- [ ] CSS/预处理器迁移（Sass → 原生 CSS 特性等）
- [ ] 测试框架迁移（Jest → Vitest）
- [ ] ESLint/Prettier 配置现代化
- [ ] 依赖版本升级策略与风险提示

### Phase 5: 体验优化与发布 🔄
- [ ] 交互式迁移向导（逐步确认、差异预览）
- [ ] 迁移日志与回滚支持
- [ ] 文档与示例项目
- [ ] 插件市场发布

---

## 关键决策

| # | 决策点 | 选项 | 决定 | 原因 |
|---|--------|------|------|------|
| 1 | 插件架构 | 纯 Skill / Skill+Hook / Skill+Hook+Agent | **Skill+Hook+Agent** | 最大灵活性；Skill 处理迁移逻辑，Hook 自动触发检测/拦截，Agent 自主规划多步迁移 |
| 2 | 迁移粒度 | 文件级 / 模块级 / 项目级 | **逐文件+预览确认** | 先整体分析再逐文件迁移，安全且可视化，适合大项目 |
| 3 | Vue 2 特征检测 | AST 解析 / 正则+AI / 纯 AI | **纯 AI 语义检测** | AI 做语义理解判断迁移点，灵活性强；用 Skill prompt 内置规律模板弥补遗漏 |
| 4 | MVP 优先场景 | Vue 2→3 / JS→TS / Webpack→Vite | **Vue 2→3 迁移** | 市场需求最大（中国大量 Vue 2 项目），与核心差异化定位最契合 |
| 5 | 版本策略 | 单版本 / 多版本渐进 | **SemVer 渐进发布** | 从 v0.1.0 逐步迭代到 v1.0.0，每个版本聚焦一个核心能力 |

---

## 版本里程碑

| 版本 | 代码名 | 里程碑 | 目标日期 | 交付物 |
|------|--------|--------|----------|--------|
| v0.1.0 | Daybreak | - | - | Phase 0: 插件骨架 + `/analyze` 扫描 |
| v0.2.0 | Sunrise | **M1: MVP** | - | Phase 1 核心: Options→Composition 单文件迁移 |
| v0.3.0 | Dawn | - | - | Phase 1 完善: Agent 批量迁移 + 验证 |
| v0.4.0 | Ember | **M2: TS** | - | Phase 2: JS→TS 渐进式迁移 |
| v0.5.0 | Catalyst | **M3: 构建迁移** | - | Phase 3: Webpack→Vite 迁移 |
| v0.6.0 | Forge | - | - | Phase 4: 辅助迁移全家桶 |
| v0.7.0 | Compass | - | - | Phase 5 前半: 交互式迁移向导 |
| v0.8.0 | Anchor | - | - | Phase 5 后半: 日志/回滚/文档 |
| v1.0.0 | Lighthouse | **M4: 发布** | - | 生产就绪 + 插件市场上线 |
| v2.0.0 | Horizon | **M5: 通用化** | - | 框架抽象 + React 支持 |
| v2.x | - | - | - | 更多技术栈驱动（CSS/Go/Angular/自定义 SDK） |

---

## 风险与缓解

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| AI 迁移准确率不足 | 产出错误代码 | 逐文件确认 + diff 预览 + 测试覆盖 |
| 大文件/大项目 token 超限 | 无法完整处理 | 模块拆分 + 增量迁移 |
| Vue 2 边界情况多 | 遗漏迁移点 | 建立迁移规则库 + 社区反馈迭代 |
| 插件 API 变更 | 兼容性问题 | 跟踪 Claude Code 更新 + 版本锁定 |
