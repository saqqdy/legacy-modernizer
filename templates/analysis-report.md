# 🔍 Legacy Modernizer 分析报告

## 项目概览

- **项目路径**: {{projectRoot}}
- **扫描时间**: {{scannedAt}}
- **扫描文件**: {{totalFiles}} 个
- **发现模式**: {{totalPatterns}} 个
- **扫描耗时**: {{duration}}ms

## 维度统计

| 维度 | 发现数 | 受影响文件 | 🔴严重 | 🟡警告 | 🔵建议 |
|------|--------|-----------|--------|--------|--------|
{{#each dimensions}}
| {{label}} | {{count}} | {{files}} | {{bySeverity.critical}} | {{bySeverity.warning}} | {{bySeverity.info}} |
{{/each}}

## Top 遗留模式

{{#each topPatterns}}
{{severity}} **{{name}}** [{{dimension}}] — 出现 {{count}} 次
{{/each}}

## 风险评估

- **整体风险**: {{risk.level}}
- **原因**: {{risk.reason}}
- **推荐迁移顺序**: {{#each risk.recommendedOrder}}{{label}}{{#unless @last}} → {{/unless}}{{/each}}
- **预估工时**: {{risk.estimatedEffort}} 人天

## 💡 建议

1. 优先处理严重级别的遗留模式
2. 按推荐迁移顺序逐步推进
3. 每个维度完成后运行测试验证
4. 使用 `/modernize` 命令启动交互式迁移向导
