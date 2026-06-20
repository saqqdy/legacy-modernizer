# Webpack → Vite Migration

## Configuration Mapping

| Webpack | Vite | Notes |
|---------|------|-------|
| `entry` | index.html | Vite uses ESM entry |
| `module.rules` | Built-in | No loader config needed |
| `plugins` | `plugins` | Different plugin API |
| `resolve.alias` | `resolve.alias` | Same syntax |
| `devServer` | `server` | Option names changed |
| `DefinePlugin` | `define` | Option name changed |

## Environment Variables

| Webpack | Vite | Notes |
|---------|------|-------|
| `process.env.NODE_ENV` | `import.meta.env.MODE` | Auto set |
| `process.env.VUE_APP_XXX` | `import.meta.env.VITE_XXX` | Prefix changed |

## Common Plugin Replacements

- `babel-loader` → Built-in (esbuild)
- `vue-loader` → `@vitejs/plugin-vue`
- `html-webpack-plugin` → Built-in
- `mini-css-extract-plugin` → Built-in
- `sass-loader` → Install `sass` only
