/**
 * Legacy Modernizer — Core type definitions
 */

// ─── Detection ───────────────────────────────────────────────

/** Migration dimension — each represents a major upgrade path */
export type MigrationDimension =
	| 'vue2-to-vue3'
	| 'js-to-ts'
	| 'webpack-to-vite'
	| 'jest-to-vitest'
	| 'vuex-to-pinia'
	| 'eslint-modernize'

/** Severity of a detected legacy pattern */
export type PatternSeverity = 'critical' | 'warning' | 'info'

/** Risk level for the overall migration */
export type RiskLevel = 'low' | 'medium' | 'high'

// ─── Branded Types (Fix #12) ──────────────────────────────────

/** Branded line number type — ensures non-negative values */
export type PatternLine = number & { readonly __brand: unique symbol }

/** Create a PatternLine, clamping negative values to 0 */
export function createPatternLine(n: number): PatternLine {
	return (n >= 0 ? n : 0) as PatternLine
}

// ─── Pattern Types ──────────────────────────────────────────────

/** A single detected legacy pattern in a file */
export interface LegacyPattern {
	/** Pattern identifier, e.g. "vue2-options-api" */
	id: string
	/** Human-readable name */
	name: string
	/** Which migration dimension this belongs to */
	dimension: MigrationDimension
	/** Severity level */
	severity: PatternSeverity
	/** File path (relative to project root) */
	file: string
	/** Line number (1-based, 0 if unknown) — branded to prevent negative values */
	line: PatternLine
	/** The matched text snippet */
	snippet: string
	/** Suggested replacement (optional) */
	suggestion?: string
}

/** A detection rule for legacy pattern scanning (Fix #1: centralized) */
export interface PatternRule {
	/** Unique rule identifier */
	id: string
	/** Human-readable name */
	name: string
	/** Which migration dimension this belongs to */
	dimension: MigrationDimension
	/** Severity level */
	severity: PatternSeverity
	/** Regex to detect the pattern */
	regex: RegExp
	/** Suggested replacement */
	suggestion: string
}

// ─── Analysis Report ──────────────────────────────────────────

/** Statistics grouped by dimension */
export interface DimensionStats {
	dimension: MigrationDimension
	/** Total patterns found */
	count: number
	/** Unique files affected */
	files: number
	/** Breakdown by severity */
	bySeverity: Record<PatternSeverity, number>
}

/** Full project analysis report */
export interface AnalysisReport {
	/** Project root path */
	projectRoot: string
	/** Scan time */
	scannedAt: string
	/** Total files scanned */
	totalFiles: number
	/** Total patterns found */
	totalPatterns: number
	/** All detected patterns */
	patterns: LegacyPattern[]
	/** Statistics by dimension */
	dimensions: DimensionStats[]
	/** Risk assessment */
	risk: RiskAssessment
	/** Scan duration in ms */
	duration: number
}

// ─── Risk Assessment ──────────────────────────────────────────

export interface RiskAssessment {
	/** Overall risk level */
	level: RiskLevel
	/** Reasoning */
	reason: string
	/** Recommended migration order (dimensions) */
	recommendedOrder: MigrationDimension[]
	/** Estimated effort (person-days) */
	estimatedEffort: number
}

/** Risk assessment thresholds (configurable, Fix #6) */
export interface RiskThresholds {
	/** Critical pattern count above which risk is high (default: 20) */
	criticalHigh: number
	/** Critical pattern count above which risk is medium (default: 5) */
	criticalMedium: number
	/** Warning count above which risk is medium (default: 30) */
	warningMedium: number
	/** Total file count above which risk is high (default: 200) */
	filesHigh: number
	/** Total file count above which risk is medium (default: 50) */
	filesMedium: number
	/** Effort divisor for high-risk (default: 15) */
	effortHigh: number
	/** Effort divisor for medium-risk (default: 25) */
	effortMedium: number
	/** Effort divisor for low-risk (default: 40) */
	effortLow: number
}

/** Scanner options derived from ModernizerConfig + runtime params (Fix #2) */
export interface ScannerOptions {
	/** Project root directory (always required at runtime) */
	root: string
	/** File globs to include */
	include?: string[]
	/** File globs to exclude */
	exclude?: string[]
	/** Max files to scan, 0 = unlimited */
	maxFiles?: number
	/** Max matches per rule per file (default: 10) */
	maxMatchesPerRule?: number
	/** Risk thresholds override */
	riskThresholds?: Partial<RiskThresholds>
}

// ─── Configuration ────────────────────────────────────────────

/** Scanner configuration per dimension */
export interface DimensionConfig {
	/** Whether this dimension is enabled */
	enabled: boolean
	/** File globs to scan */
	include: string[]
	/** File globs to exclude */
	exclude: string[]
}

export interface ModernizerConfig {
	/** Per-dimension configuration */
	dimensions: Record<MigrationDimension, DimensionConfig>
	/** Max files to scan (0 = unlimited) */
	maxFiles: number
	/** Whether to include suggestions in report */
	includeSuggestions: boolean
}
export const VERSION = '0.1.1' as const
