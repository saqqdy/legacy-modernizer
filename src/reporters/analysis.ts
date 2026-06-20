/**
 * Analysis report renderer — produces full Markdown from an AnalysisReport
 * Fix #3: locale parameter for i18n output
 */

import type { AnalysisReport } from '../types'
import { dimensionLabel, formatDuration, severityBadge } from '../utils/format'
import { LABELS, type Locale } from './locale'

/** Render a full AnalysisReport into Markdown */
export function renderAnalysisReport(
	report: AnalysisReport,
	locale: Locale = 'zh'
): string {
	const t = LABELS[locale]
	const lines: string[] = []

	// Header
	lines.push(t.title)
	lines.push('')

	// Overview
	lines.push(t.overview)
	lines.push('')
	lines.push(`- **${t.projectRoot}**: \`${report.projectRoot}\``)
	lines.push(`- **${t.scannedAt}**: ${report.scannedAt}`)
	lines.push(`- **${t.totalFiles}**: ${report.totalFiles}`)
	lines.push(`- **${t.totalPatterns}**: ${report.totalPatterns}`)
	lines.push(`- **${t.duration}**: ${formatDuration(report.duration)}`)
	lines.push('')

	// Dimension stats table
	lines.push(t.dimensions)
	lines.push('')
	lines.push(`| ${t.dimension} | ${t.count} | ${t.affectedFiles} | 🔴${t.critical} | 🟡${t.warning} | 🔵${t.info} |`)
	lines.push('|------|--------|-----------|--------|--------|--------|')
	for (const d of report.dimensions) {
		lines.push(
			`| ${dimensionLabel(d.dimension)} | ${d.count} | ${d.files} | ${d.bySeverity.critical} | ${d.bySeverity.warning} | ${d.bySeverity.info} |`
		)
	}
	lines.push('')

	// Top patterns
	lines.push(t.topPatterns)
	lines.push('')
	const sorted = [...report.patterns]
		.sort((a, b) => {
			const sev: Record<string, number> = { critical: 0, warning: 1, info: 2 }
			return (sev[a.severity] ?? 9) - (sev[b.severity] ?? 9)
		})
		.slice(0, 20)
	for (const p of sorted) {
		const badge = severityBadge(p.severity)
		const dim = dimensionLabel(p.dimension)
		const loc = p.line > 0 ? `:${p.line}` : ''
		lines.push(`${badge} **${p.name}** [${dim}] \`${p.file}${loc}\``)
		if (p.suggestion) lines.push(`  → ${p.suggestion}`)
	}
	lines.push('')

	// Risk assessment
	lines.push(t.riskAssessment)
	lines.push('')
	lines.push(`- **${t.riskLevel}**: **${report.risk.level.toUpperCase()}**`)
	lines.push(`- **${t.reason}**: ${report.risk.reason}`)
	lines.push(`- **${t.recommendedOrder}**: ${report.risk.recommendedOrder.map(dimensionLabel).join(' → ')}`)
	lines.push(`- **${t.estimatedEffort}**: ${report.risk.estimatedEffort} ${t.personDays}`)
	lines.push('')

	// Suggestions
	lines.push(t.suggestions)
	lines.push('')
	lines.push(`1. ${t.suggestion1}`)
	lines.push(`2. ${t.suggestion2}`)
	lines.push(`3. ${t.suggestion3}`)
	lines.push(`4. ${t.suggestion4}`)

	return lines.join('\n')
}
