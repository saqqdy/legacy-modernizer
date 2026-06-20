# 🏗️ Legacy Modernizer — 开发计划

> 遗留代码现代化 Claude Code 插件 · 完整开发路线图

---

## 〇、版本规划（SemVer）

### 版本总览

| 版本 | 代码名 | 对应阶段 | 核心能力 | 状态 |
|------|--------|----------|----------|------|
| **v0.1.0** | Daybreak | Phase 0 | 插件骨架 + 项目分析扫描 | 🔜 规划中 |
| **v0.2.0** | Sunrise | Phase 1 | Vue 2→3 单文件迁移 MVP | 🔜 规划中 |
| **v0.3.0** | Dawn | Phase 1 完善 | 批量迁移 + Agent 自动化 | 🔜 规划中 |
| **v0.4.0** | Ember | Phase 2 | JS→TS 渐进式迁移 | 🔜 规划中 |
| **v0.5.0** | Catalyst | Phase 3 | Webpack→Vite 构建迁移 | 🔜 规划中 |
| **v0.6.0** | Forge | Phase 4 | 辅助迁移能力（测试/ESLint/Pinia） | 🔜 规划中 |
| **v0.7.0** | Compass | Phase 5 前半 | 交互式迁移向导 | 🔜 规划中 |
| **v0.8.0** | Anchor | Phase 5 后半 | 迁移日志/回滚/文档 | 🔜 规划中 |
| **v1.0.0** | Lighthouse | 发布 | 生产就绪 + 插件市场上线 | 🔜 规划中 |

### 版本详细定义

#### v0.1.0 — Daybreak（破晓）
> Phase 0 交付 · 最小可用骨架

- 插件注册与安装验证（plugin.json 完整配置）
- `/analyze` Skill：扫描项目目录，识别 Vue 2 / JS / Webpack 特征模式，输出结构化报告
- `post-edit` Hook：编辑 .vue 文件时检测并提示已废弃 API 使用
- 测试框架搭建 + 基础测试用例
- **验收标准**：`claude /analyze` 能正确识别 Vue 2 项目的遗留模式并输出报告

#### v0.2.0 — Sunrise（日出）
> Phase 1 MVP · 最小可行迁移

- `/migrate-vue` Skill：单文件 Options API → Composition API（`<script setup>`）
- 支持迁移模式：基础响应式、生命周期、computed、watch
- diff 预览 + 用户确认机制
- 知识库：Vue 2→3 核心 API 映射表（20+ 模式）
- **验收标准**：10 个测试组件全部正确迁移，输出 diff 可预览

#### v0.3.0 — Dawn（晨光）
> Phase 1 完善 · 自动化批量迁移

- `modernizer-planner` Agent：项目级迁移计划生成
- `modernizer-executor` Agent：按计划逐文件批量迁移
- `modernizer-verifier` Agent：迁移结果语义一致性验证
- 扩展迁移模式：mixins→composables、过滤器、自定义指令、$refs→useTemplateRef
- 迁移优先级排序与风险评估
- **验收标准**：完整 Vue 2 中型项目（50+ 组件）可批量迁移，verifier 通过率 > 95%

#### v0.4.0 — Ember（余烬）
> Phase 2 · JS→TS 渐进式迁移

- `/migrate-ts` Skill：单文件 JS→TS 转换
- Vue 组件 Props/Emits 类型推断
- 四阶段渐进式迁移路径：@ts-check → .d.ts → .ts → 类型完备
- JSDoc 类型提取 → 内联类型
- any 类型标记 + TODO 注释
- **验收标准**：Props 类型推断准确率 > 90%，支持四阶段渐进迁移

#### v0.5.0 — Catalyst（催化剂）
> Phase 3 · 构建工具迁移

- `/migrate-vite` Skill：Webpack→Vite 配置转换
- 配置项映射表（entry/output/plugins/resolve/devServer）
- 环境变量迁移：process.env → import.meta.env
- 常用插件/Loader 替代方案库（15+ 方案）
- index.html 调整
- **验收标准**：常见 Webpack 配置项目可自动映射，迁移后项目可正常 dev/build

#### v0.6.0 — Forge（铸造）
> Phase 4 · 辅助迁移全家桶

- Jest → Vitest 迁移
- Vuex → Pinia 迁移
- ESLint 配置现代化（Vue 3 + TS 规则集）
- CSS/预处理器迁移建议
- 依赖版本升级策略 + 风险矩阵
- **验收标准**：各辅助 Skill 功能可用，依赖风险评估覆盖 top 100 常用包

#### v0.7.0 — Compass（指南针）
> Phase 5 前半 · 交互式迁移向导

- `/modernize` 主向导 Skill
  - 项目扫描 → 维度选择 → 计划生成 → 逐步执行
  - 迁移维度选择：Vue / TS / Vite / 测试 / 状态管理（可多选）
  - 每步 diff 预览 + 确认/跳过/回退
- 迁移进度可视化（X/Y 文件已完成，风险评估仪表盘）
- **验收标准**：从零开始完整迁移一个 Vue 2+JS+Webpack 项目到 Vue 3+TS+Vite

#### v0.8.0 — Anchor（锚点）
> Phase 5 后半 · 生产就绪保障

- 迁移日志记录（每步操作 + 前后代码快照）
- git-based 回滚支持
- 完善文档：快速上手 / 迁移模式参考 / FAQ / 故障排除
- 示例项目（含各阶段迁移快照）
- 边界情况处理与错误恢复
- **验收标准**：文档完整覆盖所有 Skill，示例项目端到端迁移成功

#### v1.0.0 — Lighthouse（灯塔）
> 正式发布 · 生产就绪

- 全部功能稳定性验证
- 性能优化（大项目扫描/迁移速度）
- 插件市场发布准备（描述、截图、标签）
- 社区反馈渠道建立
- 贡献者指南
- **验收标准**：插件市场审核通过，新用户 30 分钟内可完成首次迁移

### 版本分支策略

```
main (稳定发布)
  ├── v0.1.x ─── hotfix only
  ├── v0.2.x ─── hotfix only
  └── ...

dev (开发主线)
  └── feature/* (功能分支)
       ├── feature/analyze-scanner
       ├── feature/migrate-vue-core
       ├── feature/migrate-vue-mixins
       ├── feature/migrate-ts-basic
       └── ...
```

### 发布节奏

| 版本区间 | 开发周期 | 发布策略 |
|----------|----------|----------|
| v0.1.x ~ v0.3.x | 约 4 周 | 快速迭代，每周一个小版本 |
| v0.4.x ~ v0.6.x | 约 4 周 | 稳定迭代，每两周一个小版本 |
| v0.7.x ~ v0.8.x | 约 3 周 | 体验打磨，根据反馈调整 |
| v1.0.x | 约 2 周 | 发布准备，专注稳定性 |

---

## 一、项目定位与核心价值

### 要解决什么问题

前端技术栈迭代极快，大量生产项目仍停留在 Vue 2 + JavaScript + Webpack 技术栈。迁移到 Vue 3 + TypeScript + Vite 的痛点：

1. **迁移不是简单替换** — `this.$refs` → `useTemplateRef()`、mixins → composables 需要理解上下文
2. **现有工具只能做语法级替换** — vue-codemod/gogocode 基于规则，无法理解业务语义
3. **大规模迁移风险高** — 一次改几千个文件，出问题难以定位

### 我们的解法

**AI 语义级迁移**：不是跑 codemod，而是 AI 理解业务逻辑后做语义级改写。

### 技术决策（已确认）

| 维度 | 决策 | 理由 |
|------|------|------|
| 插件架构 | Skill + Hook + Agent | Skill 处理迁移逻辑，Hook 自动检测/拦截，Agent 自主规划多步迁移 |
| 迁移粒度 | 逐文件 + 预览确认 | 安全可控，适合大项目 |
| 检测策略 | 纯 AI 语义检测 + 规律模板 | 灵活，模板弥补遗漏 |
| MVP 场景 | Vue 2 → Vue 3 | 市场最大，差异化最强 |

---

## 二、架构设计

```
┌─────────────────────────────────────────────────────┐
│                  Legacy Modernizer                   │
├─────────────┬──────────────┬────────────────────────┤
│   Skills    │    Hooks     │       Agents           │
├─────────────┼──────────────┼────────────────────────┤
│ /modernize  │ pre-commit   │ modernizer-planner     │
│ /analyze    │ post-edit    │ modernizer-executor    │
│ /migrate-vue│              │ modernizer-verifier    │
│ /migrate-ts │              │                        │
│ /migrate-vite│             │                        │
├─────────────┴──────────────┴────────────────────────┤
│                Shared Knowledge Base                 │
│  迁移规则模板 · API 映射表 · 反模式库 · 风险评估    │
└─────────────────────────────────────────────────────┘
```

### Skill 设计

| Skill 名称 | 触发方式 | 功能 |
|------------|----------|------|
| `/modernize` | 手动 | 交互式迁移向导，项目级分析 → 选择场景 → 逐文件迁移 |
| `/analyze` | 手动 | 扫描项目，生成迁移影响报告（受影响文件、风险等级、迁移路径） |
| `/migrate-vue` | 手动 | Vue 2 → Vue 3 单文件/批量迁移 |
| `/migrate-ts` | 手动 | JS → TS 渐进式迁移 |
| `/migrate-vite` | 手动 | Webpack → Vite 迁移 |

### Hook 设计

| Hook 事件 | 动作 | 目的 |
|-----------|------|------|
| `post-edit` (.vue/.js/.ts) | 检测遗留 API 使用 | 实时提醒开发者正在使用已废弃 API |
| `pre-commit` | 扫描暂存文件 | 阻止引入新的遗留模式 |

### Agent 设计

| Agent | 职责 |
|-------|------|
| `modernizer-planner` | 分析项目结构，制定迁移计划，评估风险 |
| `modernizer-executor` | 执行具体的迁移转换，逐文件处理 |
| `modernizer-verifier` | 验证迁移结果正确性，检测遗漏和错误 |

---

## 三、分阶段开发计划

### Phase 0: 基础设施（3-5 天）

**目标**: 搭建插件脚手架，跑通 Skill/Hook/Agent 注册流程

#### 任务清单

- [ ] **P0-1** 初始化项目结构
  ```
  legacy-modernizer/
  ├── plugin.json              # 插件清单
  ├── skills/                  # Skill 定义
  │   ├── modernize.md
  │   ├── analyze.md
  │   ├── migrate-vue.md
  │   ├── migrate-ts.md
  │   └── migrate-vite.md
  ├── hooks/                   # Hook 定义
  │   ├── post-edit.json
  │   └── pre-commit.json
  ├── agents/                  # Agent 定义
  │   ├── planner.md
  │   ├── executor.md
  │   └── verifier.md
  ├── knowledge/               # 知识库
  │   ├── vue2-to-vue3.md      # Vue 2→3 API 映射
  │   ├── js-to-ts.md          # JS→TS 迁移模式
  │   └── webpack-to-vite.md   # Webpack→Vite 配置映射
  ├── internal/                # 内部文档
  └── tests/                   # 测试
      ├── fixtures/            # 测试用例
      └── snapshots/           # 快照
  ```

- [ ] **P0-2** 编写 plugin.json
- [ ] **P0-3** 实现 `/analyze` Skill（最简单，验证架构可行性）
- [ ] **P0-4** 实现 post-edit Hook（检测 Vue 2 废弃 API）
- [ ] **P0-5** 安装测试框架 + 编写第一个测试用例

#### 交付物
- [ ] 可安装的 Claude Code 插件
- [ ] `/analyze` 能扫描指定目录并输出遗留模式报告
- [ ] Hook 能在编辑 .vue 文件时检测 Vue 2 API

---

### Phase 1: Vue 2 → Vue 3 核心 MVP（7-10 天）

**目标**: 完成单文件 Options API → Composition API 迁移

#### 任务清单

- [ ] **P1-1** 构建 Vue 2→3 知识库 — API 映射表
  ```
  覆盖范围:
  ├── 生命周期: created→onMounted, mounted→onMounted, destroyed→onUnmounted...
  ├── 响应式: data()→ref/reactive, computed→computed, watch→watch/watchEffect
  ├── 模板引用: this.$refs→useTemplateRef()
  ├── 事件: this.$emit→defineEmits, this.$on/$off→mitt/useEventBus
  ├── 路由: this.$router→useRouter(), this.$route→useRoute()
  ├── 状态: this.$store→useStore() / Pinia
  ├── 混入: mixins→composables
  ├── 过滤器: filters→computed/方法
  └── 自定义指令: directive 钩子名称变更
  ```

- [ ] **P1-2** 实现 `/migrate-vue` Skill 核心逻辑
  - 分析单文件组件结构（template / script / style）
  - 识别 Options API 模式
  - 生成 Composition API 等价代码
  - 生成 diff 预览供确认

- [ ] **P1-3** 实现 `modernizer-planner` Agent
  - 扫描项目所有 .vue 文件
  - 分类统计：Options API 文件数、使用废弃 API 文件数
  - 评估迁移复杂度
  - 生成迁移优先级列表

- [ ] **P1-4** 实现 `modernizer-executor` Agent
  - 按计划逐文件调用 `/migrate-vue` Skill
  - 自动处理 import 语句
  - 维护迁移日志

- [ ] **P1-5** 实现 `modernizer-verifier` Agent
  - 对比迁移前后代码语义一致性
  - 检测遗漏的迁移点
  - 验证模板引用完整性

- [ ] **P1-6** 编写测试用例
  - 简单 Options API 组件 → Composition API
  - 复杂组件（mixins、自定义指令、过滤器）
  - 边界情况（动态组件、异步组件、递归组件）

#### 关键迁移模式示例

**模式 1: 基础响应式**
```vue
<!-- Before (Vue 2 Options API) -->
<script>
export default {
  data() {
    return { count: 0, user: { name: '' } }
  },
  computed: {
    doubleCount() { return this.count * 2 }
  },
  methods: {
    increment() { this.count++ }
  }
}
</script>

<!-- After (Vue 3 Composition API) -->
<script setup>
import { ref, reactive, computed } from 'vue'

const count = ref(0)
const user = reactive({ name: '' })
const doubleCount = computed(() => count.value * 2)

function increment() { count.value++ }
</script>
```

**模式 2: 生命周期 + 模板引用**
```vue
<!-- Before -->
<script>
export default {
  mounted() {
    this.$refs.input.focus()
  },
  beforeUnmount() {
    this.timer && clearTimeout(this.timer)
  }
}
</script>

<!-- After -->
<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useTemplateRef } from 'vue'

const inputRef = useTemplateRef('input')

onMounted(() => {
  inputRef.value?.focus()
})

onBeforeUnmount(() => {
  timer.value && clearTimeout(timer.value)
})
</script>
```

#### 交付物
- [ ] `/migrate-vue` 能完成单个 .vue 文件的 Options→Composition 转换
- [ ] `modernizer-planner` 能生成项目级迁移报告
- [ ] `modernizer-executor` 能按计划批量迁移
- [ ] 10+ 测试用例覆盖常见迁移模式

---

### Phase 2: JavaScript → TypeScript（5-7 天）

**目标**: 渐进式 JS→TS 迁移支持

#### 任务清单

- [ ] **P2-1** 构建 JS→TS 知识库
  - Vue 组件 Props 类型推断
  - Emits 类型定义
  - 事件处理函数类型
  - 第三方库 @types 补全策略

- [ ] **P2-2** 实现 `/migrate-ts` Skill
  - 单文件 JS→TS 转换（.js → .ts, .vue script → script lang="ts"）
  - JSDoc 类型提取 → 内联类型
  - 自动生成 .d.ts 声明文件
  - any 类型标记与 TODO 注释

- [ ] **P2-3** 实现渐进式迁移路径
  - 阶段 1: 添加 `// @ts-check` + JSDoc
  - 阶段 2: 生成 .d.ts 声明文件
  - 阶段 3: .js → .ts 文件重命名
  - 阶段 4: 完善 TS 类型覆盖

- [ ] **P2-4** 编写测试用例

#### 交付物
- [ ] `/migrate-ts` 能完成单文件 JS→TS 转换
- [ ] 支持四阶段渐进式迁移策略
- [ ] Vue 组件 Props/Emits 类型化

---

### Phase 3: Webpack → Vite（5-7 天）

**目标**: 构建工具迁移分析与自动化

#### 任务清单

- [ ] **P3-1** 构建 Webpack→Vite 知识库
  - 配置项映射表
  - 常用插件/Loader 替代方案
  - 环境变量差异
  - 入口/HTML 模板差异

- [ ] **P3-2** 实现 `/migrate-vite` Skill
  - 解析 webpack.config.js
  - 生成 vite.config.ts 等价配置
  - 迁移 process.env → import.meta.env
  - 调整 index.html 位置和内容

- [ ] **P3-3** 常见插件迁移方案
  - webpack-dev-server → Vite 内置
  - html-webpack-plugin → Vite 内置
  - mini-css-extract-plugin → Vite 内置
  - babel-loader → esbuild/SWC
  - 其他常用插件的迁移指南

- [ ] **P3-4** 编写测试用例

#### 交付物
- [ ] `/migrate-vite` 能分析 webpack 配置并生成 Vite 等价配置
- [ ] 环境变量迁移支持
- [ ] 常见插件迁移方案库

---

### Phase 4: 辅助迁移能力（5-7 天）

#### 任务清单

- [ ] **P4-1** Jest → Vitest 迁移
- [ ] **P4-2** ESLint 配置现代化（Vue 3 + TS 规则集）
- [ ] **P4-3** CSS/预处理器迁移建议
- [ ] **P4-4** 依赖版本升级策略与风险提示
- [ ] **P4-5** Vuex → Pinia 迁移

#### 交付物
- [ ] 各辅助迁移 Skill 可用
- [ ] 依赖升级风险矩阵

---

### Phase 5: 体验优化与发布（5-7 天）

#### 任务清单

- [ ] **P5-1** 交互式迁移向导 `/modernize`
  - 项目扫描 → 选择迁移维度 → 生成计划 → 逐步执行
  - 每步 diff 预览 + 确认
- [ ] **P5-2** 迁移日志与回滚
  - 记录每步迁移操作
  - 支持 git-based 回滚
- [ ] **P5-3** 完善文档
  - 快速上手指南
  - 迁移模式参考
  - 常见问题 FAQ
- [ ] **P5-4** 示例项目
  - Vue 2 + JS + Webpack 的完整示例
  - 展示各阶段迁移效果
- [ ] **P5-5** 插件市场发布

#### 交付物
- [ ] `/modernize` 交互式向导可用
- [ ] 文档完善
- [ ] 插件市场上线

---

## 四、里程碑时间线

```
Week 1-2  ████████░░░░░░░░░░░░ Phase 0 + Phase 1 开始
                          ↓ v0.1.0 Daybreak → v0.2.0 Sunrise

Week 3-4  ░░░░░░░░████████░░░░ Phase 1 完善 + Phase 2
                          ↓ v0.3.0 Dawn → v0.4.0 Ember

Week 5-6  ░░░░░░░░░░░░░░████████ Phase 3 + Phase 4
                          ↓ v0.5.0 Catalyst → v0.6.0 Forge

Week 7-8  ░░░░░░░░░░░░░░░░░░░░████ Phase 5
                          ↓ v0.7.0 Compass → v0.8.0 Anchor → v1.0.0 Lighthouse
```

| 里程碑 | 版本 | 核心能力 | 验收标准 |
|--------|------|----------|----------|
| **M1: MVP** | v0.2.0 Sunrise | Vue 2→3 单文件迁移 | 10 个测试组件全部正确迁移，输出 diff 可预览 |
| **M2: TS** | v0.4.0 Ember | JS→TS 渐进式迁移 | 支持四阶段策略，Props 类型推断准确率 > 90% |
| **M3: 构建迁移** | v0.5.0 Catalyst | Webpack→Vite 自动化 | 常见配置项自动映射，项目可正常 dev/build |
| **M4: 发布** | v1.0.0 Lighthouse | 全流程 + 文档 | 示例项目端到端迁移成功，文档完整 |

---

## 五、知识库设计

### Vue 2 → Vue 3 API 全面映射

#### 1. 响应式系统

| Vue 2 | Vue 3 Composition API | 说明 |
|-------|----------------------|------|
| `data()` | `ref()` / `reactive()` | 基础类型用 ref，对象用 reactive |
| `this.xxx` | `xxx.value` (ref) / `xxx` (reactive) | ref 需要在 JS 中加 .value |
| `computed: {}` | `computed(() => {})` | 改为函数式 |
| `watch: {}` | `watch()` / `watchEffect()` | 更灵活的侦听 |
| `this.$set(obj, key, val)` | 直接赋值 `obj[key] = val` | Vue 3 响应式无此限制 |
| `this.$delete(obj, key)` | `delete obj[key]` | 同上 |

#### 2. 生命周期

| Vue 2 | Vue 3 Options API | Vue 3 Composition API |
|-------|-------------------|----------------------|
| `beforeCreate` | `beforeCreate` | `setup()` 本身 |
| `created` | `created` | `setup()` 本身 |
| `beforeMount` | `beforeMount` | `onBeforeMount()` |
| `mounted` | `mounted` | `onMounted()` |
| `beforeUpdate` | `beforeUpdate` | `onBeforeUpdate()` |
| `updated` | `updated` | `onUpdated()` |
| `beforeDestroy` | `beforeUnmount` | `onBeforeUnmount()` |
| `destroyed` | `unmounted` | `onUnmounted()` |

#### 3. 模板与依赖注入

| Vue 2 | Vue 3 | 说明 |
|-------|-------|------|
| `this.$refs.xxx` | `useTemplateRef('xxx')` | Vue 3.5+ 推荐方式 |
| `this.$emit('xxx')` | `defineEmits()` | `<script setup>` 方式 |
| `this.$slots` | `useSlots()` | 组合式 API |
| `this.$attrs` | `useAttrs()` | 组合式 API |
| `this.$router` | `useRouter()` | Vue Router 4 |
| `this.$route` | `useRoute()` | Vue Router 4 |
| `this.$store` | `useStore()` / Pinia | 状态管理 |
| `filters` | `computed` / 方法 | 过滤器已移除 |
| `this.$on / $off / $once` | `mitt` / 自定义事件 | 事件总线已移除 |
| `this.$children` | `ref` | 已移除 |
| `this.$listeners` | 合并到 `$attrs` | 已移除 |
| `this.$scopedSlots` | `this.$slots` | 统一为 slots |

#### 4. 指令与组件

| Vue 2 | Vue 3 | 说明 |
|-------|-------|------|
| `v-bind.sync` | `v-bind:xxx:modelValue` + `defineEmits` | .sync 修饰符已移除 |
| `v-on.native` | `emits` 选项声明 | .native 修饰符已移除 |
| 自定义指令钩子 | 统一对齐组件生命周期 | 钩子名称改名 |
| `<transition>` | `<Transition>` | 大驼峰命名 |
| `<transition-group>` | `<TransitionGroup>` | 大驼峰命名 |

---

## 六、测试策略

### 测试矩阵

| 迁移场景 | 简单 | 中等 | 复杂 |
|----------|------|------|------|
| 基础响应式 | ✅ | | |
| 生命周期映射 | ✅ | | |
| 模板引用 | | ✅ | |
| Mixin→Composable | | ✅ | ✅ |
| 过滤器迁移 | | ✅ | |
| 自定义指令 | | | ✅ |
| Vuex→Pinia | | | ✅ |
| JS→TS+Vue迁移 | | ✅ | ✅ |

### 测试用例结构

```
tests/
├── fixtures/
│   ├── vue2-simple-options/       # 简单 Options API 组件
│   ├── vue2-with-mixins/          # 含 mixins 的组件
│   ├── vue2-with-filters/         # 含过滤器的组件
│   ├── vue2-with-directives/      # 含自定义指令的组件
│   ├── vue2-with-vuex/            # 含 Vuex 的组件
│   ├── vue2-with-router/          # 含 Vue Router 的组件
│   ├── js-basic/                  # 基础 JS 文件
│   ├── js-vue-component/          # JS Vue 组件
│   ├── webpack-basic/             # 基础 Webpack 配置
│   └── webpack-complex/           # 复杂 Webpack 配置
├── snapshots/                     # 期望的迁移结果
└── integration/                   # 端到端迁移测试
```

---

## 七、风险管控

| 风险 | 概率 | 影响 | 缓解策略 |
|------|------|------|----------|
| AI 迁移产生语义错误 | 高 | 高 | 逐文件确认 + diff 预览 + verifier Agent 二次检查 |
| 大文件拆分处理 token 不足 | 中 | 中 | 智能分段：template/style/script 分别处理 |
| Vue 2 边界模式遗漏 | 中 | 中 | 持续扩充知识库 + 社区反馈驱动的迭代 |
| Claude Code 插件 API 不稳定 | 低 | 高 | 版本锁定 + abstraction layer 隔离 API 变更 |

---

## 八、差异化定位

### vs vue-codemod / gogocode

```
codemod 方式：
  规则: this.$refs.xxx → ???
  问题: 不知道该转为 ref() 还是 useTemplateRef()，不知道应声明在什么位置

AI 方式：
  理解: 这个 $refs.input 在 mounted 里用来 focus()
  决策: 使用 useTemplateRef('input')，在 onMounted 中调用
  输出: 完整的、语义等价的 Composition API 代码
```

### 核心差异化能力

1. **语义理解** — 理解代码意图，而非模式匹配
2. **上下文感知** — 跨文件理解依赖关系（store/router/mixins）
3. **业务感知** — 识别业务逻辑边界，不做破坏性合并
4. **渐进式** — 不是一次性替换，支持逐步迁移
5. **可验证** — 每步迁移都有 diff 预览和验证

---

## 九、v2.0 通用迁移框架路线图

> v1.0 聚焦 Vue 生态做深做透；v2.0 将迁移方法论抽象为通用框架，支持任意技术栈。

### 架构演进

```
v1.0 — Vue 生态专用
┌─────────────────────────────┐
│     Legacy Modernizer       │
│  ┌─────┬─────┬──────────┐  │
│  │Vue  │ TS  │ Vite     │  │
│  │迁移  │迁移  │迁移      │  │
│  └─────┴─────┴──────────┘  │
│  知识库（Vue 专用）          │
└─────────────────────────────┘

v2.0 — 通用迁移框架
┌─────────────────────────────────────────┐
│         Legacy Modernizer Core          │
│  ┌─────────────────────────────────┐    │
│  │  迁移引擎（通用）               │    │
│  │  · 分析器接口 · 规则引擎       │    │
│  │  · 转换管道   · 验证器         │    │
│  │  · 上下文管理 · 回滚机制       │    │
│  └─────────────────────────────────┘    │
│  ┌─────────┐ ┌────────┐ ┌──────────┐  │
│  │ Vue 驱动 │ │React驱动│ │Angular驱动│  │
│  │ (内置)   │ │(插件)  │ │ (插件)   │  │
│  └─────────┘ └────────┘ └──────────┘  │
│  ┌─────────┐ ┌────────┐ ┌──────────┐  │
│  │ CSS驱动  │ │Go驱动  │ │ 自定义... │  │
│  │ (插件)   │ │(插件)  │ │          │  │
│  └─────────┘ └────────┘ └──────────┘  │
└─────────────────────────────────────────┘
```

### v2.0 版本规划

| 版本 | 目标 | 新增迁移场景 |
|------|------|-------------|
| **v2.0.0** | 通用框架 + React 支持 | React Class → Hooks、CRA → Vite |
| **v2.1.0** | CSS 生态迁移 | CSS Modules → Tailwind、Sass → 原生 CSS |
| **v2.2.0** | 后端语言迁移 | Express → Fastify、REST → GraphQL |
| **v2.3.0** | Angular 生态 | AngularJS → Angular、RxJS 升级 |
| **v2.4.0** | 自定义迁移插件 SDK | 用户可编写自己的迁移驱动 |

### 框架抽象层设计

```typescript
// 迁移驱动接口（概念模型）
interface MigrationDriver {
  name: string                    // 驱动名称，如 "vue2-to-vue3"
  detect(project: Project): DetectionResult  // 检测项目是否适用此驱动
  analyze(project: Project): AnalysisReport  // 分析迁移影响
  transform(file: File, context: Context): TransformResult  // 单文件转换
  verify(before: File, after: File): VerificationResult  // 验证结果
  knowledgePath: string          // 知识库路径
}
```

### 时间线预估

```
2026 Q3  v1.0 发布（Vue 生态完善）
2026 Q4  v2.0 开发（框架抽象 + React 驱动）
2027 Q1  v2.0 发布 + 插件 SDK
2027 Q2+ 社区驱动扩展更多技术栈
```

---

## 十、目录结构（最终）

```
legacy-modernizer/
├── plugin.json
├── skills/
│   ├── modernize.md          # 主迁移向导
│   ├── analyze.md            # 项目分析扫描
│   ├── migrate-vue.md        # Vue 2→3 迁移
│   ├── migrate-ts.md         # JS→TS 迁移
│   └── migrate-vite.md       # Webpack→Vite 迁移
├── hooks/
│   ├── post-edit.json        # 编辑后检测遗留 API
│   └── pre-commit.json       # 提交前阻止遗留模式
├── agents/
│   ├── planner.md            # 迁移计划制定
│   ├── executor.md           # 迁移执行
│   └── verifier.md           # 迁移验证
├── knowledge/
│   ├── vue2-to-vue3.md       # Vue 2→3 完整映射表
│   ├── js-to-ts.md           # JS→TS 迁移模式
│   ├── webpack-to-vite.md    # 构建工具迁移
│   ├── vuex-to-pinia.md      # 状态管理迁移
│   └── jest-to-vitest.md     # 测试框架迁移
├── internal/                 # 内部文档
│   ├── task_plan.md
│   ├── findings.md
│   ├── progress.md
│   └── development-plan.md   # 本文件
└── tests/
    ├── fixtures/
    ├── snapshots/
    └── integration/
```
