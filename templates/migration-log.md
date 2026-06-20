# 📋 Migration Log

## 迁移信息

- **项目**: {{projectRoot}}
- **迁移维度**: {{dimension}}
- **开始时间**: {{startedAt}}
- **完成时间**: {{completedAt}}
- **总文件数**: {{totalFiles}}
- **已迁移**: {{migratedFiles}}
- **已跳过**: {{skippedFiles}}

## 迁移记录

{{#each steps}}
### {{@index}}. {{file}}

**变更**: {{description}}

```diff
{{{diff}}}
```

---
{{/each}}
