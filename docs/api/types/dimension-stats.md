# DimensionStats

Statistics grouped by migration dimension.

```typescript
interface DimensionStats {
  dimension: MigrationDimension
  count: number
  files: number
  bySeverity: Record<PatternSeverity, number>
}
```
