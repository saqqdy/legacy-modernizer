# Webpack → Vite 迁移

## 配置映射

| Webpack | Vite | 说明 |
|---------|------|------|
| `entry` | index.html | Vite 使用 ESM 入口 |
| `module.rules` | 内置 | 无需 loader 配置 |
| `plugins` | `plugins` | 插件 API 不同 |
| `resolve.alias` | `resolve.alias` | 语法相同 |
| `devServer` | `server` | 选项名变更 |
| `DefinePlugin` | `define` | 选项名变更 |

## 环境变量

| Webpack | Vite | 说明 |
|---------|------|------|
| `process.env.NODE_ENV` | `import.meta.env.MODE` | 自动设置 |
| `process.env.VUE_APP_XXX` | `import.meta.env.VITE_XXX` | 前缀变更 |

## 常用插件替换

- `babel-loader` → 内置（esbuild）
- `vue-loader` → `@vitejs/plugin-vue`
- `html-webpack-plugin` → 内置
- `mini-css-extract-plugin` → 内置
- `sass-loader` → 仅需安装 `sass`
