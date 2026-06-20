# JS → TypeScript 迁移知识库

## 渐进式迁移路径

### 阶段 1: @ts-check + JSDoc
在 .js 文件顶部添加 `// @ts-check`，用 JSDoc 补充类型信息。

```js
// @ts-check
/**
 * @param {string} name
 * @param {number} age
 * @returns {string}
 */
function greet(name, age) {
  return `Hello, ${name}! You are ${age} years old.`
}
```

### 阶段 2: .d.ts 声明文件
为第三方库和复杂类型创建声明文件。

```ts
// types/api.d.ts
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
}

interface ApiResponse<T> {
  code: number
  data: T
  message: string
}
```

### 阶段 3: .js → .ts 重命名
逐步将 .js 文件重命名为 .ts，添加内联类型。

### 阶段 4: 严格模式
启用 `strict: true`，消除所有 `any` 类型。

## Vue 组件类型化

### Props 类型化

```ts
// Before (JS + PropTypes)
export default {
  props: {
    title: String,
    count: { type: Number, default: 0 },
    items: Array,
    callback: Function,
  }
}

// After (TS + defineProps)
<script setup lang="ts">
interface Props {
  title: string
  count?: number
  items: string[]
  callback: (id: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
})
</script>
```

### Emits 类型化

```ts
// Before
this.$emit('update', value)
this.$emit('delete', id)

// After
const emit = defineEmits<{
  update: [value: string]
  delete: [id: number]
}>()
```

### Ref 模板类型化

```ts
// Before
this.$refs.form.validate()

// After
const formRef = useTemplateRef<{ validate: () => boolean }>('form')
formRef.value?.validate()
```
