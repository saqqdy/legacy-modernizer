# Jest → Vitest 迁移指南

## 核心差异

| 特性 | Jest | Vitest |
|------|------|--------|
| 运行时 | Node（默认） | Vite（复用构建管线） |
| 配置 | jest.config.* | vitest.config.* |
| ESM 支持 | 需要额外配置 | 原生支持 |
| 全局 API | 默认注入 | 需显式导入 |
| Mock | jest.fn() / jest.mock() | vi.fn() / vi.mock() |

## API 映射

### 全局函数

```typescript
// Jest（全局注入）
describe('MySuite', () => {
  it('works', () => { expect(1).toBe(1) })
})

// Vitest（显式导入）
import { describe, it, expect } from 'vitest'
describe('MySuite', () => {
  it('works', () => { expect(1).toBe(1) })
})
```

### Mock 函数

| Jest | Vitest |
|------|--------|
| `jest.fn()` | `vi.fn()` |
| `jest.mock('./mod')` | `vi.mock('./mod')` |
| `jest.spyOn(obj, 'method')` | `vi.spyOn(obj, 'method')` |
| `jest.fn().mockReturnValue(1)` | `vi.fn().mockReturnValue(1)` |
| `jest.clearAllMocks()` | `vi.clearAllMocks()` |
| `jest.resetAllMocks()` | `vi.resetAllMocks()` |

### 生命周期

| Jest | Vitest |
|------|--------|
| `beforeEach` | `beforeEach` |
| `afterEach` | `afterEach` |
| `beforeAll` | `beforeAll` |
| `afterAll` | `afterAll` |

### 快照

```typescript
// Jest
expect(result).toMatchSnapshot()

// Vitest — 完全兼容
expect(result).toMatchSnapshot()
```

## 配置迁移

```typescript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  transform: { '^.+\\.vue$': '@vue/vue3-jest' },
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
}

// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: false, // 推荐显式导入
  },
  resolve: {
    alias: { '@/': './src/' },
  },
})
```

## 注意事项

1. 如果项目使用 Vite，强烈推荐迁移到 Vitest — 配置共享，ESM 原生支持
2. Vitest 的 `vi.mock()` 支持 Hoisted 用法：`vi.hoisted(() => {})`
3. 全局 API 可通过 `test.globals: true` 启用，但不推荐（不利于类型推断）
