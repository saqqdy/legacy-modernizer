# ESLint 现代化迁移指南

## 核心变化

ESLint 9 引入了 Flat Config（扁平化配置），完全替代了旧版的 `.eslintrc.*` 格式。

| 特性 | 旧版 (.eslintrc) | Flat Config (eslint.config.*) |
|------|------------------|-------------------------------|
| 格式 | JSON / JS / YAML | JS / MJS / TS |
| 导出 | `module.exports = {}` | `export default []` |
| 插件引用 | 字符串名 (`plugins: ['vue']`) | 导入对象 (`import vue from 'eslint-plugin-vue'`) |
| 扩展 | `extends: ['eslint:recommended']` | 展开 `{ ...js.configs.recommended }` |
| Override | `overrides: [...]` | 多个配置对象组合 |
| 解析器 | `parser: '@babel/eslint-parser'` | 在配置对象中指定 `languageOptions.parser` |
| env | `env: { browser: true }` | 使用 `globals` 包 |

## 配置迁移

```javascript
// .eslintrc.js（旧版）
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'no-console': 'warn',
    'vue/no-unused-vars': 'error',
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: { jest: true },
    },
  ],
}
```

```javascript
// eslint.config.mjs（Flat Config）
import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import babelParser from '@babel/eslint-parser'
import vueParser from 'vue-eslint-parser'
import globals from 'globals'

export default [
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: babelParser,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: { vue },
    rules: {
      ...js.configs.recommended.rules,
      ...vue.configs.recommended.rules,
      'no-console': 'warn',
      'vue/no-unused-vars': 'error',
    },
  },
  {
    files: ['**/*.test.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
]
```

## 关键迁移点

1. **不再有 `overrides`**：用多个配置对象替代，数组中靠后的配置覆盖前面的
2. **不再有 `env`**：替换为 `languageOptions.globals`，使用 `globals` 包
3. **不再有 `extends` 字符串**：直接展开推荐配置的 `rules` 对象
4. **插件必须导入**：不再是字符串名，而是实际导入的模块
5. **`parser` 位置变化**：移到 `languageOptions.parser`
6. **忽略文件**：使用顶层 `ignores` 属性替代 `.eslintignore`

## 注意事项

1. Flat Config 从 ESLint 9 开始为默认格式，8.x 可通过 `ESLINT_USE_FLAT_CONFIG=true` 启用
2. 许多插件还在适配 Flat Config，迁移前检查插件兼容性
3. `@eslint/migrate-config` CLI 工具可辅助自动迁移
