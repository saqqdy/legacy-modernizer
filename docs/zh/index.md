---
layout: home
title: Legacy Modernizer
titleTemplate: AI 驱动的遗留代码现代化

hero:
  name: Legacy Modernizer
  text: AI 语义级代码迁移
  tagline: Vue 2→3、JS→TS、Webpack→Vite — 不是正则替换，而是理解代码意图
  image:
    src: /logo.svg
    alt: Legacy Modernizer
  actions:
    - theme: brand
      text: 开始使用
      link: /zh/guide/
    - theme: alt
      text: GitHub
      link: https://github.com/saqqdy/legacy-modernizer
    - theme: alt
      text: API 参考
      link: /zh/api/

features:
  - icon: 🧠
    title: 语义级迁移
    details: AI 理解代码意图，不是简单正则替换。this.$refs.input → useTemplateRef('input') + onMounted。
  - icon: 🔍
    title: 多维度扫描
    details: 检测 22+ 种遗留模式，覆盖 6 个迁移维度 — Vue 2→3、JS→TS、Webpack→Vite 等。
  - icon: ✅
    title: Diff 预览确认
    details: 每次迁移展示 diff，接受/跳过/自定义 — 你始终掌控。
  - icon: 📊
    title: 风险评估
    details: 自动评估风险等级，推荐迁移顺序，估算工作量。
  - icon: 🔄
    title: 渐进式迁移
    details: 按维度或按文件逐步迁移，不需要一次性重写。
  - icon: 🔌
    title: Claude Code 原生
    details: 作为 Skill 直接在 Claude Code 中使用 — /analyze 和 /modernize 命令。
---
