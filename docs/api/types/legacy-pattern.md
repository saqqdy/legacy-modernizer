# LegacyPattern

A single detected legacy pattern in a file.

```typescript
interface LegacyPattern {
  id: string        // e.g. "vue2-options-api"
  name: string      // Human-readable name
  dimension: MigrationDimension
  severity: PatternSeverity
  file: string      // Relative path
  line: number      // 1-based, 0 if unknown
  snippet: string   // Matched text (max 120 chars)
  suggestion?: string
}
```
