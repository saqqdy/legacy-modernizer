# JS → TypeScript 迁移

## 渐进式迁移路径

推荐 4 阶段方法：

1. **@ts-check + JSDoc** — 在 .js 文件添加类型检查
2. **.d.ts 声明文件** — 为第三方模块创建类型声明
3. **.js → .ts 重命名** — 逐步添加内联类型
4. **严格模式** — 启用 `strict: true`，消除 `any`

## Vue 组件类型化

### Props

```ts
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
