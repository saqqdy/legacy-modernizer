# 语义级迁移

## 有什么不同？

传统 codemod 基于 AST 模式操作 — 它们看到的是语法树。Legacy Modernizer 基于**代码语义**操作 — 它理解代码*做什么*。

### 示例：this.$refs

Codemod 看到 `this.$refs.input`，不知道：
- 这是模板 ref 还是组件 ref？
- 在 mounted、方法还是 watcher 中使用？
- 应该变成 `ref()` 还是 `useTemplateRef()`？

Legacy Modernizer 读取上下文：
- "这个 ref 在 `mounted()` 中用于调用 `focus()`"
- → 生成 `useTemplateRef<HTMLInputElement>('input')` + `onMounted(() => inputRef.value?.focus())`
