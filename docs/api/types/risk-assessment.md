# RiskAssessment

Migration risk evaluation.

```typescript
interface RiskAssessment {
  level: 'low' | 'medium' | 'high'
  reason: string
  recommendedOrder: MigrationDimension[]
  estimatedEffort: number  // person-days
}
```
