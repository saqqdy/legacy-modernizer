# Vue 2 → Vue 3 迁移知识库

## 响应式系统

| Vue 2 | Vue 3 Composition API | 说明 |
|-------|----------------------|------|
| `data()` | `ref()` / `reactive()` | 基础类型用 ref，对象用 reactive |
| `this.xxx` | `xxx.value` (ref) / `xxx` (reactive) | ref 在 JS 中需要 .value |
| `computed: {}` | `computed(() => {})` | 函数式写法 |
| `watch: {}` | `watch()` / `watchEffect()` | 更灵活 |
| `this.$set(obj, key, val)` | 直接赋值 `obj[key] = val` | Vue 3 Proxy 响应式 |
| `this.$delete(obj, key)` | `delete obj[key]` | 同上 |
| `Vue.set()` | 不再需要 | 同上 |

## 生命周期

| Vue 2 | Vue 3 Options | Vue 3 Composition |
|-------|-------------|-------------------|
| `beforeCreate` | `beforeCreate` | `setup()` 本身 |
| `created` | `created` | `setup()` 本身 |
| `beforeMount` | `beforeMount` | `onBeforeMount()` |
| `mounted` | `mounted` | `onMounted()` |
| `beforeUpdate` | `beforeUpdate` | `onBeforeUpdate()` |
| `updated` | `updated` | `onUpdated()` |
| `beforeDestroy` | `beforeUnmount` | `onBeforeUnmount()` |
| `destroyed` | `unmounted` | `onUnmounted()` |
| `activated` | `activated` | `onActivated()` |
| `deactivated` | `deactivated` | `onDeactivated()` |

## 模板引用与依赖注入

| Vue 2 | Vue 3 | 注意事项 |
|-------|-------|---------|
| `this.$refs.xxx` | `useTemplateRef('xxx')` (3.5+) | 或 `ref()` + `:ref` |
| `this.$emit('xxx')` | `defineEmits()` | `<script setup>` 专用 |
| `this.$slots` | `useSlots()` | |
| `this.$attrs` | `useAttrs()` | |
| `this.$router` | `useRouter()` | Vue Router 4 |
| `this.$route` | `useRoute()` | Vue Router 4 |
| `this.$store` | `useStore()` / Pinia | |

## 已移除 API

| Vue 2 API | Vue 3 替代方案 | 备注 |
|-----------|--------------|------|
| `filters: {}` | `computed` / 方法 | 完全移除 |
| `$on / $off / $once` | `mitt` / `tiny-emitter` | 事件总线移除 |
| `$children` | `ref` | 移除 |
| `$listeners` | 合并到 `$attrs` | 移除 |
| `$scopedSlots` | `$slots` | 统一 |
| `v-bind.sync` | `v-model:xxx` | 语法变更 |
| `v-on.native` | `emits` 选项 | 语法移除 |
| 自定义指令旧钩子 | 对齐组件生命周期 | 钩子重命名 |
| `<transition>` | `<Transition>` | 大驼峰 |
| `<transition-group>` | `<TransitionGroup>` | 大驼峰 |
| `Vue.extend()` | `defineComponent()` | 工厂函数移除 |
| `Vue.mixin()` | 组合式函数 | 全局 mixin 移除 |

## Mixin → Composable 重构模式

### Before (Mixin)
```js
// mixins/counter.js
export default {
  data() {
    return { count: 0 }
  },
  computed: {
    doubleCount() { return this.count * 2 }
  },
  methods: {
    increment() { this.count++ }
  }
}
```

### After (Composable)
```ts
// composables/useCounter.ts
import { ref, computed } from 'vue'

export function useCounter(initial = 0) {
  const count = ref(initial)
  const doubleCount = computed(() => count.value * 2)

  function increment() { count.value++ }

  return { count, doubleCount, increment }
}
```

## 自定义指令钩子映射

| Vue 2 | Vue 3 |
|-------|-------|
| `bind` | `beforeMount` |
| `inserted` | `mounted` |
| `update` | `updated` |
| `componentUpdated` | `updated` |
| `unbind` | `beforeUnmount` |
