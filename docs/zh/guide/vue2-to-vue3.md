# Vue 2 → Vue 3 迁移

## 检测模式

Legacy Modernizer 扫描以下 Vue 2 遗留模式：

| 严重级别 | 模式 | 替代方案 |
|----------|------|----------|
| 🔴 严重 | `filters: {}` | computed 或方法 |
| 🔴 严重 | `$on / $off / $once` | `mitt` 或 `tiny-emitter` |
| 🔴 严重 | `v-bind.xxx.sync` | `v-model:xxx` |
| 🟡 警告 | `this.$refs.xxx` | `useTemplateRef()` |
| 🟡 警告 | `this.$emit()` | `defineEmits()` |
| 🟡 警告 | `this.$router / $route` | `useRouter() / useRoute()` |
| 🟡 警告 | `this.$store` | `useStore()` 或 Pinia |
| 🟡 警告 | `destroyed / beforeDestroy` | `unmounted / beforeUnmount` |
| 🟡 警告 | `mixins: []` | Composables |
| 🔵 建议 | `data()` | `ref() / reactive()` |
| 🔵 建议 | `computed: {}` | `computed(() => ...)` |
| 🔵 建议 | `methods: {}` | 普通函数 |
| 🔵 建议 | `watch: {}` | `watch() / watchEffect()` |

## 迁移示例

```vue
<!-- 迁移前（Vue 2） -->
<script>
export default {
  data() {
    return { count: 0 }
  },
  computed: {
    double() { return this.count * 2 }
  },
  methods: {
    increment() { this.count++ }
  }
}
</script>

<!-- 迁移后（Vue 3） -->
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)

function increment() { count.value++ }
</script>
```

完整 API 映射参见 [Vue 2→3 知识库](https://github.com/saqqdy/legacy-modernizer/blob/main/knowledge/vue2-to-vue3.md)。
