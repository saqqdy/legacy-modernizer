# LegacyPattern

文件中检测到的单个遗留模式。

```typescript
interface LegacyPattern {
  id: string        // 例如 "vue2-options-api"
  name: string      // 可读名称
  dimension: MigrationDimension
  severity: PatternSeverity
  file: string      // 相对路径
  line: number      // 从 1 开始，未知为 0
  snippet: string   // 匹配文本（最多 120 字符）
  suggestion?: string
}
```
