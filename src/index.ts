/**
 * Legacy Modernizer — 遗留代码现代化
 *
 * 入口模块，导出所有公开 API
 */

// 报告渲染
export { renderAnalysisReport } from './reporters/analysis'

// 扫描器
export { scanFileContent, scanProject } from './scanners/legacy-scanner'
export type { ScannerOptions } from './types'

// 类型
export type {
	AnalysisReport,
	DimensionConfig,
	DimensionStats,
	LegacyPattern,
	MigrationDimension,
	ModernizerConfig,
	PatternLine,
	PatternRule,
	PatternSeverity,
	RiskAssessment,
	RiskLevel,
	RiskThresholds,
} from './types'
export { createPatternLine, VERSION } from './types'
export { getDefaultConfig, mergeConfig } from './utils/config'

// 工具
export {
	dimensionLabel,
	formatDuration,
	patternToMarkdown,
	severityBadge,
} from './utils/format'
