/**
 * Formatting utility functions
 */

import type { Locale } from '../reporters/locale'
import type { LegacyPattern, MigrationDimension, PatternSeverity } from '../types'

/** Pattern severity → emoji badge */
const SEVERITY_BADGE: Record<PatternSeverity, string> = {
	critical: '🔴',
	warning: '🟡',
	info: '🔵',
}

/** Migration dimension → display label (i18n) */
const DIMENSION_LABELS: Record<MigrationDimension, Record<Locale, string>> = {
	'vue2-to-vue3': { en: 'Vue 2 → 3', zh: 'Vue 2 → 3' },
	'js-to-ts': { en: 'JS → TS', zh: 'JS → TS' },
	'webpack-to-vite': { en: 'Webpack → Vite', zh: 'Webpack → Vite' },
	'jest-to-vitest': { en: 'Jest → Vitest', zh: 'Jest → Vitest' },
	'vuex-to-pinia': { en: 'Vuex → Pinia', zh: 'Vuex → Pinia' },
	'eslint-modernize': { en: 'ESLint Modernize', zh: 'ESLint 现代化' },
}

/** Format a legacy pattern as a Markdown list item */
export function patternToMarkdown(p: LegacyPattern): string {
	const badge = SEVERITY_BADGE[p.severity] ?? '❓'
	const dim = DIMENSION_LABELS[p.dimension]?.zh ?? p.dimension
	const loc = p.line > 0 ? `:${p.line}` : ''
	const line = `- ${badge} **${p.name}** [${dim}] \`${p.file}${loc}\``
	return p.suggestion ? `${line}\n  → ${p.suggestion}` : line
}

/** Get emoji badge for severity */
export function severityBadge(severity: PatternSeverity): string {
	return SEVERITY_BADGE[severity] ?? '❓'
}

/** Get display label for dimension (locale-aware) */
export function dimensionLabel(dimension: MigrationDimension, locale: Locale = 'zh'): string {
	return DIMENSION_LABELS[dimension]?.[locale] ?? dimension
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
