# Modernize Instructions — 交互式迁移向导

## 目标

引导用户完成项目现代化全流程：扫描 → 选择维度 → 生成计划 → 逐步迁移

## 执行步骤

### 1. 项目扫描

调用 `/analyze` 完成项目扫描，获取分析报告。

### 2. 维度选择

向用户展示可用迁移维度，让用户选择本次要迁移的维度：

```
📦 可用迁移维度：
[1] Vue 2 → Vue 3    (发现 X 个模式，Y 个文件受影响)
[2] JS → TypeScript  (发现 X 个模式，Y 个文件受影响)
[3] Webpack → Vite   (发现 X 个模式，Y 个文件受影响)
[4] Jest → Vitest    (发现 X 个模式，Y 个文件受影响)
[5] Vuex → Pinia     (发现 X 个模式，Y 个文件受影响)

请选择要迁移的维度（可多选，如 1,2）：
```

### 3. 生成迁移计划

基于选择的维度和扫描结果，生成迁移计划：

```markdown
# 📋 迁移计划

## 迁移维度: Vue 2 → Vue 3

### 优先级排序
1. 🔴 严重问题 (X 个) — 已废弃 API，必须修改
2. 🟡 警告问题 (X 个) — 推荐修改
3. 🔵 建议优化 (X 个) — 可选优化

### 文件迁移顺序
1. `src/store/index.js` — Vuex store（其他文件依赖）
2. `src/router/index.js` — 路由配置
3. `src/composables/` — 共享逻辑
4. `src/components/` — UI 组件
5. `src/views/` — 页面组件
```

### 4. 逐步迁移

按计划逐文件迁移：

1. 读取原文件内容
2. AI 语义分析并生成迁移代码
3. 展示 diff 给用户预览
4. 等待用户确认（Y/跳过/自定义修改）
5. 应用修改
6. 记录迁移日志

### 5. 迁移确认

每步迁移后展示：

```
✅ 已迁移: src/components/Counter.vue
   - Options API → Composition API (<script setup>)
   - data() → ref()
   - computed:{} → computed(() => ...)
   
📋 进度: 3/50 文件已完成 | Vue 维度: 60%
```

### 6. 完成汇总

迁移完成后输出：

```markdown
# ✅ 迁移完成

## 迁移统计
- 迁移维度: Vue 2 → Vue 3
- 处理文件: 50/50
- 应用修改: 48 个文件
- 跳过文件: 2 个

## 建议后续操作
1. 运行测试: pnpm test
2. 检查构建: pnpm build
3. 启动开发: pnpm dev
4. 查看迁移日志: .legacy-modernizer/log.md
```
