# Webpack → Vite 迁移知识库

## 配置映射

| Webpack | Vite | 说明 |
|---------|------|------|
| `entry` | 默认 index.html | Vite 基于 ESM 入口 |
| `output` | `build.outDir` | 输出目录 |
| `module.rules` | Vite 内置 | 不需要 loader 配置 |
| `plugins` | `plugins` | 语法不同，需逐个替换 |
| `resolve.alias` | `resolve.alias` | 语法相同 |
| `resolve.extensions` | `resolve.extensions` | 语法相同 |
| `devServer` | `server` | 选项名变更 |
| `mode` | 无需配置 | 自动检测 |

## 常用插件/Loader 替代

| Webpack | Vite | 说明 |
|---------|------|------|
| `babel-loader` | Vite 内置 (esbuild) | 无需配置 |
| `vue-loader` | `@vitejs/plugin-vue` | 官方 Vue 插件 |
| `html-webpack-plugin` | 内置 | Vite 自动处理 HTML |
| `mini-css-extract-plugin` | 内置 | Vite 自动提取 CSS |
| `css-loader` + `style-loader` | 内置 | 原生支持 CSS |
| `sass-loader` | 预装 `sass` 即可 | 自动检测 |
| `postcss-loader` | `postcss.config.js` | 直接使用 PostCSS 配置 |
| `file-loader` / `url-loader` | 内置 | 自动处理静态资源 |
| `webpack-dev-server` | 内置 | `vite dev` |
| `webpack-merge` | 无需 | 使用 `defineConfig` 函数 |
| `DefinePlugin` | `define` | 选项名变更 |
| `CopyWebpackPlugin` | `vite-plugin-static-copy` | 社区插件 |
| `CompressionPlugin` | `vite-plugin-compression` | 社区插件 |

## 环境变量迁移

| Webpack | Vite | 说明 |
|---------|------|------|
| `process.env.NODE_ENV` | `import.meta.env.MODE` | 自动设置 |
| `process.env.VUE_APP_XXX` | `import.meta.env.VITE_XXX` | 前缀变更 |
| `DefinePlugin` 注入 | `define` 选项 | 静态替换 |

## 目录结构调整

```
Before (Webpack):
├── public/
│   ├── index.html        ← 模板
│   └── favicon.ico
├── src/
│   └── main.js           ← 入口
└── webpack.config.js

After (Vite):
├── index.html            ← 移到根目录（入口）
├── public/
│   └── favicon.ico
├── src/
│   └── main.ts           ← 入口（由 index.html 引用）
└── vite.config.ts
```

## index.html 变更

```html
<!-- Before (Webpack) -->
<!-- public/index.html — 仅作模板 -->
<div id="app"></div>

<!-- After (Vite) -->
<!-- 根目录 index.html — ESM 入口 -->
<script type="module" src="/src/main.ts"></script>
<div id="app"></div>
```
