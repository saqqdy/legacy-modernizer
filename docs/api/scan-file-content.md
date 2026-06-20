# scanFileContent()

Scan a single file's content for legacy patterns.

```typescript
function scanFileContent(
  content: string,
  filePath: string,
  maxMatchesPerRule?: number
): LegacyPattern[]
```

## Parameters

- **content** `string` — File content to scan
- **filePath** `string` — Relative file path (used for pattern filtering, e.g. `.ts` files skip JS→TS rules)
- **maxMatchesPerRule** `number` — Max matches per rule per file (default: `10`)

## Returns

`LegacyPattern[]` — Array of detected patterns

## Example

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
