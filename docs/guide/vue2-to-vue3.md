# Vue 2 → Vue 3 Migration

## Detected Patterns

Legacy Modernizer scans for these Vue 2 patterns:

| Severity | Pattern | Replacement |
|----------|---------|-------------|
| 🔴 Critical | `filters: {}` | `computed` or methods |
| 🔴 Critical | `$on / $off / $once` | `mitt` or `tiny-emitter` |
| 🔴 Critical | `v-bind.xxx.sync` | `v-model:xxx` |
| 🟡 Warning | `this.$refs.xxx` | `useTemplateRef()` |
| 🟡 Warning | `this.$emit()` | `defineEmits()` |
| 🟡 Warning | `this.$router / $route` | `useRouter() / useRoute()` |
| 🟡 Warning | `this.$store` | `useStore()` or Pinia |
| 🟡 Warning | `destroyed / beforeDestroy` | `unmounted / beforeUnmount` |
| 🟡 Warning | `mixins: []` | Composables |
| 🔵 Info | `data()` | `ref() / reactive()` |
| 🔵 Info | `computed: {}` | `computed(() => ...)` |
| 🔵 Info | `methods: {}` | Plain functions |
| 🔵 Info | `watch: {}` | `watch() / watchEffect()` |

## Migration Example

```vue
<!-- Before (Vue 2) -->
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

<!-- After (Vue 3) -->
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)

function increment() { count.value++ }
</script>
```

See [Vue 2→3 Knowledge Base](https://github.com/saqqdy/legacy-modernizer/blob/main/knowledge/vue2-to-vue3.md) for the complete API mapping.
