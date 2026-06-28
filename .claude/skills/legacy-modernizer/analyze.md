# Analyze Instructions — 项目分析扫描

## 目标

扫描项目目录，识别所有遗留技术模式，生成结构化迁移报告。

## 执行步骤

### 1. 检测项目技术栈

读取 `package.json`，提取以下信息：

```bash
# 检测 Vue 版本
cat package.json | grep '"vue"'

# 检测构建工具
ls webpack.config.* vite.config.* 2>/dev/null

# 检测测试框架
cat package.json | grep '"jest"\|"vitest"'

# 检测状态管理
cat package.json | grep '"vuex"\|"pinia"'
```

### 2. 扫描遗留模式

使用程序化 API：

```typescript
import { scanProject } from 'legacy-modernizer'

const report = await scanProject({
  root: process.cwd(),
  include: ['**/*.{vue,js,ts,jsx,tsx}'],
  exclude: ['node_modules/**', 'dist/**'],
})
```

或使用 Bash 工具手动扫描：

```bash
# Vue 2 Options API
grep -rn "export default {" --include="*.vue" src/

# this.$refs
grep -rn "this\.\$refs" --include="*.vue" --include="*.js" src/

# process.env
grep -rn "process\.env\." --include="*.js" --include="*.ts" src/
```

### 3. 生成报告

按以下模板输出：

```markdown
# 🔍 Legacy Modernizer 分析报告

## 项目概览
- 项目路径: {projectRoot}
- 扫描时间: {scannedAt}
- 扫描文件: {totalFiles} 个
- 发现模式: {totalPatterns} 个
- 扫描耗时: {duration}ms

## 维度统计
| 维度 | 发现数 | 受影响文件 | 🔴严重 | 🟡警告 | 🔵建议 |
|------|--------|-----------|--------|--------|--------|

## Top 10 遗留模式
（按严重等级和出现次数排序）

## 风险评估
- 整体风险: {level}
- 原因: {reason}
- 推荐迁移顺序: {order}
- 预估工时: {days} 人天
```

### 4. 错误处理

- 目录不存在: 提示用户指定正确路径
- 无法读取文件: 跳过该文件继续扫描
- 权限不足: 给出 chmod 建议
