# Vuex → Pinia 迁移指南

## 核心差异

| 特性 | Vuex | Pinia |
|------|------|-------|
| Store 定义 | 单一全局 store + modules | 独立 store，按需组合 |
| TypeScript | 需要复杂类型声明 | 原生类型推断 |
| Mutations | 必须通过 mutation 修改状态 | 直接修改，无需 mutation |
| Composition API | 需要额外封装 | 原生支持 setup store |
| 模块化 | 嵌套模块 + namespaced | 扁平化，每个文件一个 store |

## API 映射

### Store 定义

```typescript
// Vuex
const store = new Vuex.Store({
  state: { count: 0 },
  getters: { double: state => state.count * 2 },
  mutations: { INCREMENT(state) { state.count++ } },
  actions: { increment({ commit }) { commit('INCREMENT') } },
})

// Pinia — Option Store
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: { double: state => state.count * 2 },
  actions: { increment() { this.count++ } },
})

// Pinia — Setup Store（推荐）
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const double = computed(() => count.value * 2)
  function increment() { count.value++ }
  return { count, double, increment }
})
```

### 组件中使用

```typescript
// Vuex
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['count']),
    ...mapGetters(['double']),
  },
  methods: {
    ...mapActions(['increment']),
  },
}

// Pinia
import { useCounterStore } from '@/stores/counter'
const store = useCounterStore()
store.count
store.double
store.increment()
const { count, double } = storeToRefs(store)
```

### 异步 Action

```typescript
// Vuex
actions: {
  async fetchData({ commit }) {
    const data = await api.fetch()
    commit('SET_DATA', data)
  }
}

// Pinia — 直接 await，无需 commit
actions: {
  async fetchData() {
    this.data = await api.fetch()
  }
}
```

## mapState / mapGetters → storeToRefs

```typescript
// Vuex
computed: {
  ...mapState('user', ['name', 'email']),
  ...mapGetters('user', ['isLoggedIn']),
}

// Pinia
const userStore = useUserStore()
const { name, email, isLoggedIn } = storeToRefs(userStore)
```

## 注意事项

1. Pinia 无需 mutations，actions 可直接修改状态
2. 使用 `storeToRefs()` 解构保持响应性，方法不需要 ref
3. Pinia store 天然支持 SSR，无需额外配置
4. 迁移时可逐步替换单个 module，不需要一次性全部替换
