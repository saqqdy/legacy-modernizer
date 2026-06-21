# RiskAssessment

迁移风险评估。

```typescript
interface RiskAssessment {
  level: 'low' | 'medium' | 'high'
  reason: string
  recommendedOrder: MigrationDimension[]
  estimatedEffort: number  // 人天
}
```
