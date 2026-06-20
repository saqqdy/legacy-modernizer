# ModernizerConfig

Scanner configuration.

```typescript
interface ModernizerConfig {
  dimensions: Record<MigrationDimension, DimensionConfig>
  maxFiles: number
  includeSuggestions: boolean
}

interface DimensionConfig {
  enabled: boolean
  include: string[]
  exclude: string[]
}
```
