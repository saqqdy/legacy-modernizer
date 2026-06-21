# AnalysisReport

完整项目分析报告。

```typescript
interface AnalysisReport {
  projectRoot: string
  scannedAt: string
  totalFiles: number
  totalPatterns: number
  patterns: LegacyPattern[]
  dimensions: DimensionStats[]
  risk: RiskAssessment
  duration: number  // 毫秒
}
```
