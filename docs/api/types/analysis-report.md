# AnalysisReport

Full project analysis report.

```typescript
interface AnalysisReport {
  projectRoot: string
  scannedAt: string
  totalFiles: number
  totalPatterns: number
  patterns: LegacyPattern[]
  dimensions: DimensionStats[]
  risk: RiskAssessment
  duration: number  // ms
}
```
