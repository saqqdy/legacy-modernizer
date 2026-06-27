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

### 方式 1: Claude Code 插件（推荐）

一行命令安装为 Claude Code 插件：

```bash
# 在 Claude Code 中执行：
/plugin install https://github.com/saqqdy/legacy-modernizer
```

安装后可用命令：

| 命令 | 功能说明 |
|------|---------|
| `/analyze` | 扫描当前项目的遗留模式，生成迁移报告 |
| `/modernize` | 启动交互式迁移向导：扫描 → 选择维度 → 生成计划 → 逐步迁移 |

**体验流程：**
1. 在一个 Vue 2 老项目中打开 Claude Code
2. 输入 `/analyze` → 输出完整的遗留模式分析报告
3. 输入 `/modernize` → 选择迁移维度（如 Vue 2→3），逐文件确认 diff 迁移

**手动安装（备选方案）：**
```bash
cd your-project
git clone https://github.com/saqqdy/legacy-modernizer.git .legacy-modernizer
cp -r .legacy-modernizer/.claude/skills/ .claude/skills/
```

### 方式 2: 编程式使用

```bash
pnpm add legacy-modernizer
```

```typescript
import { scanProject, scanFileContent, renderAnalysisReport } from 'legacy-modernizer'

// 全项目扫描
const report = await scanProject({
  root: process.cwd(),
  include: ['**/*.{vue,js,ts}'],
  exclude: ['node_modules/**', 'dist/**'],
})

console.log(renderAnalysisReport(report))
// 或直接访问结构化数据
console.log(`发现 ${report.totalPatterns} 个模式，${report.totalFiles} 个文件`)
console.log(`风险: ${report.risk.level} — ${report.risk.reason}`)

// 单文件扫描
const patterns = scanFileContent(content, 'src/components/Counter.vue')
patterns.forEach(p => console.log(`[${p.severity}] ${p.name}: ${p.suggestion}`))
```

### 方式 3: Playground 在线体验

无需安装，在线体验扫描效果：

```bash
# 克隆仓库并启动 Playground
git clone https://github.com/saqqdy/legacy-modernizer.git
cd legacy-modernizer
pnpm install
pnpm run playground
```

Playground 内置了多种遗留代码示例文件，你可以：
- 📂 选择不同的示例文件查看扫描结果
- ✏️ 编辑代码实时查看遗留模式检测
- 📊 查看结构化分析报告
- 🌐 切换中英文报告语言

---

## 📐 扫描规则详情

### Vue 2→3（15 条规则）

| 规则 ID | 名称 | 严重等级 | 说明 |
|---------|------|---------|------|
| `vue2-options-api` | Options API component | 🔵 info | 使用 `<script setup>` + Composition API 重写 |
| `vue2-data-function` | data() option | 🔵 info | 使用 ref() / reactive() 替代 |
| `vue2-computed-option` | computed:{} option | 🔵 info | 使用 computed(() => ...) 替代 |
| `vue2-methods-option` | methods:{} option | 🔵 info | 改写为普通函数 |
| `vue2-watch-option` | watch:{} option | 🔵 info | 使用 watch() / watchEffect() 替代 |
| `vue2-this-refs` | this.$refs | 🟡 warning | 使用 useTemplateRef() 替代 |
| `vue2-this-emit` | this.$emit | 🟡 warning | 使用 defineEmits() 替代 |
| `vue2-this-router` | this.$router / this.$route | 🟡 warning | 使用 useRouter() / useRoute() 替代 |
| `vue2-this-store` | this.$store | 🟡 warning | 使用 useStore() 或迁移到 Pinia |
| `vue2-filters` | filters:{} option | 🔴 critical | Vue 3 已移除 filters，改为 computed 或方法 |
| `vue2-event-bus` | $on / $off / $once | 🔴 critical | 使用 mitt 或 tiny-emitter 替代 |
| `vue2-destroyed` | destroyed / beforeDestroy | 🟡 warning | 改为 unmounted / beforeUnmount |
| `vue2-mixins` | mixins:[] option | 🟡 warning | 使用 Composables 替代 mixins |
| `vue2-v-bind-sync` | v-bind.sync modifier | 🔴 critical | 改为 v-model:xxx |
| `vue2-v-on-native` | v-on.native modifier | 🟡 warning | 在 emits 中声明即可 |

### JS→TS（4 条规则）

| 规则 ID | 名称 | 严重等级 | 说明 |
|---------|------|---------|------|
| `js-prop-types` | PropTypes validation | 🟡 warning | 使用 TypeScript interface 替代 |
| `js-jsdoc-types` | JSDoc type annotations | 🔵 info | 将 JSDoc 类型迁移为内联 TypeScript 类型 |
| `js-commonjs-export` | CommonJS exports | 🔵 info | 使用 ES module export 替代 |
| `js-require-import` | require() import | 🔵 info | 使用 ES import 替代 |

### Webpack→Vite（3 条规则）

| 规则 ID | 名称 | 严重等级 | 说明 |
|---------|------|---------|------|
| `webpack-config` | webpack.config file | 🔵 info | 迁移为 vite.config.ts |
| `webpack-require-context` | require.context | 🟡 warning | Vite 使用 import.meta.glob 替代 |
| `webpack-process-env` | process.env usage | 🔵 info | Vite 使用 import.meta.env 替代 |

### Jest→Vitest（2 条规则）

| 规则 ID | 名称 | 严重等级 | 说明 |
|---------|------|---------|------|
| `jest-config` | Jest config detected | 🔵 info | 迁移为 vitest.config.ts |
| `jest-global` | Jest global functions | 🟡 warning | 改为 vitest 导入 (vi, describe, it, expect) |

### Vuex→Pinia（2 条规则）

| 规则 ID | 名称 | 严重等级 | 说明 |
|---------|------|---------|------|
| `vuex-store` | Vuex store usage | 🔵 info | 迁移为 Pinia defineStore() |
| `vuex-map-state` | mapState / mapGetters | 🟡 warning | Pinia 使用 storeToRefs() 替代 |

### ESLint 现代化（2 条规则）

| 规则 ID | 名称 | 严重等级 | 说明 |
|---------|------|---------|------|
| `eslint-legacy-config` | Legacy ESLint config format | 🔵 info | 迁移为 ESLint 9 flat config |
| `eslint-override-array` | ESLint overrides array | 🔵 info | flat config 使用多配置对象组合 |

> **总计**：6 个维度，28 条检测规则

---

## 📋 版本路线图

| 版本 | 代码名 | 主题 | 状态 |
|------|--------|------|------|
| v0.1.0 | Daybreak | 插件骨架 + `/analyze` 扫描器 | ✅ 已发布 |
| v0.1.1 | Daybreak | 标准插件安装支持 | ✅ 当前 |
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

## 🗂️ 项目结构

```
legacy-modernizer/
├── .claude/skills/legacy-modernizer/   # Skill 提示词（核心产品）
│   ├── skill.md                        # 主入口 + 命令路由
│   ├── analyze.md                      # 扫描指令
│   └── modernize.md                    # 迁移向导指令
├── src/                                # TypeScript 源码（编程式 API）
│   ├── index.ts                        # 入口，导出公开 API
│   ├── types.ts                        # 核心类型定义
│   ├── scanners/                       # 扫描器
│   │   ├── legacy-scanner.ts           # 遗留模式检测器
│   │   └── rules/                      # 每个维度的检测规则
│   │       ├── index.ts                # 规则汇总
│   │       ├── vue2-to-vue3.ts         # 15 条 Vue 2→3 规则
│   │       ├── js-to-ts.ts             # 4 条 JS→TS 规则
│   │       ├── webpack-to-vite.ts      # 3 条 Webpack→Vite 规则
│   │       ├── jest-to-vitest.ts       # 2 条 Jest→Vitest 规则
│   │       ├── vuex-to-pinia.ts        # 2 条 Vuex→Pinia 规则
│   │       └── eslint-modernize.ts     # 2 条 ESLint 现代化规则
│   ├── reporters/                      # 报告渲染
│   │   ├── analysis.ts                 # Markdown 报告生成
│   │   └── locale.ts                   # 中英文标签
│   └── utils/                          # 工具函数
│       ├── config.ts                   # 配置合并
│       └── format.ts                   # 格式化输出
├── knowledge/                          # 迁移知识库
├── templates/                          # 报告模板
├── internal/                           # 内部规划文档
├── docs/                               # VitePress 文档站
└── playground/                         # 在线体验 Playground
```

---

## 🛠️ 开发

```bash
pnpm install          # 安装依赖
pnpm run lint         # ESLint 检查 + 自动修复
pnpm run typecheck    # TypeScript 类型检查
pnpm run test         # 运行测试 (vitest)
pnpm run test:watch   # 测试监听模式
pnpm run test:coverage # 测试覆盖率
pnpm run build        # 构建 (ESM + CJS)
pnpm run dev          # 监听模式开发
pnpm run docs:dev     # 启动文档站开发服务器
pnpm run playground   # 启动 Playground
```

### 技术栈

- **语言**: TypeScript 5.9+，strict mode
- **构建**: rolldown
- **Lint**: @eslint-sets/eslint-config (ESLint 9 flat config)
- **格式化**: prettier + prettier-config-common
- **测试**: vitest
- **文档**: VitePress
- **包管理**: pnpm 9

---

## 🆚 对比

### vs vue-codemod / gogocode / ast-grep

| 维度 | Code Mods | Legacy Modernizer |
|------|-----------|-------------------|
| 方式 | AST 规则匹配 | AI 语义理解 |
| `this.$refs.xxx` → ? | 无法决定 ref 还是 useTemplateRef | 理解使用上下文 |
| Mixin 合并 | 只能重命名，不能重构 | 提取干净的 composables |
| 业务逻辑 | 忽略 | 识别边界 |
| 错误处理 | 规则出错 = 断裂的输出 | 不确定 → 请求确认 |

---

## 📄 许可证

[MIT](./LICENSE)
