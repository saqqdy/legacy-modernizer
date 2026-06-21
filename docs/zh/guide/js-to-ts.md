# JS → TypeScript 迁移

## 渐进式迁移路径

Legacy Modernizer 推荐 4 阶段方法：

### 阶段 1: @ts-check + JSDoc
在 .js 文件添加 `// @ts-check`，补充 JSDoc 类型。

### 阶段 2: .d.ts 声明文件
为第三方模块创建类型声明。

### 阶段 3: .js → .ts 重命名
逐步重命名文件并添加内联类型。

### 阶段 4: 严格模式
启用 `strict: true`，消除所有 `any` 类型。

## Vue 组件类型化

### Props

```ts
// 迁移前（JS + PropTypes）
export default {
  props: {
    title: String,
    count: { type: Number, default: 0 },
  }
}

// 迁移后（TS + defineProps）
interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
})
```

### Emits

```ts
const emit = defineEmits<{
  update: [value: string]
  delete: [id: number]
}>()
```
