# DimensionStats

按迁移维度分组的统计信息。

```typescript
interface DimensionStats {
  dimension: MigrationDimension
  count: number
  files: number
  bySeverity: Record<PatternSeverity, number>
}
```
