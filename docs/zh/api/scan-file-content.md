# scanFileContent()

扫描单个文件内容中的遗留模式。

```typescript
function scanFileContent(
  content: string,
  filePath: string,
  maxMatchesPerRule?: number
): LegacyPattern[]
```

## 参数

- **content** `string` — 要扫描的文件内容
- **filePath** `string` — 相对文件路径（用于模式过滤，例如 `.ts` 文件会跳过 JS→TS 规则）
- **maxMatchesPerRule** `number` — 每条规则每文件最大匹配数（默认：`10`）

## 返回值

`LegacyPattern[]` — 检测到的模式数组

## 示例

```typescript
import { scanFileContent } from 'legacy-modernizer'

const code = `
export default {
  data() { return { count: 0 } },
  methods: { increment() { this.count++ } }
}`

const patterns = scanFileContent(code, 'src/Counter.vue')
// → [{ id: 'vue2-data-function', ... }, { id: 'vue2-methods-option', ... }]
```
