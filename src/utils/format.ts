/**
 * Formatting utility functions
 */

import type { LegacyPattern, MigrationDimension, PatternSeverity } from '../types'

/** Pattern severity → emoji badge */
const SEVERITY_BADGE: Record<PatternSeverity, string> = {
	critical: '🔴',
	warning: '🟡',
	info: '🔵',
}

/** Migration dimension → display label */
const DIMENSION_LABEL: Record<MigrationDimension, string> = {
	'vue2-to-vue3': 'Vue 2 → 3',
	'js-to-ts': 'JS → TS',
	'webpack-to-vite': 'Webpack → Vite',
	'jest-to-vitest': 'Jest → Vitest',
	'vuex-to-pinia': 'Vuex → Pinia',
	'eslint-modernize': 'ESLint 现代化',
}

/** Format a legacy pattern as a Markdown list item */
export function patternToMarkdown(p: LegacyPattern): string {
	const badge = SEVERITY_BADGE[p.severity] ?? '❓'
	const dim = DIMENSION_LABEL[p.dimension] ?? p.dimension
	const loc = p.line > 0 ? `:${p.line}` : ''
	const line = `- ${badge} **${p.name}** [${dim}] \`${p.file}${loc}\``
	return p.suggestion ? `${line}\n  → ${p.suggestion}` : line
}

/** Get emoji badge for severity */
export function severityBadge(severity: PatternSeverity): string {
	return SEVERITY_BADGE[severity] ?? '❓'
}

/** Get display label for dimension */
export function dimensionLabel(dimension: MigrationDimension): string {
	return DIMENSION_LABEL[dimension] ?? dimension
}

/** Format duration in ms to human-readable */
export function formatDuration(ms: number): string {
	if (ms < 1000) return `${ms}ms`
	const seconds = Math.round(ms / 1000)
	if (seconds < 60) return `${seconds}s`
	const minutes = Math.floor(seconds / 60)
	const secs = seconds % 60
	return secs > 0 ? `${minutes}m ${secs}s` : `${minutes}m`
}
