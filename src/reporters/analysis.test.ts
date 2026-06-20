import type { AnalysisReport } from '../types'
import { describe, expect, it } from 'vitest'
import { renderAnalysisReport } from './analysis'

const fixture: AnalysisReport = {
	projectRoot: '/tmp/demo',
	scannedAt: '2026-06-20T12:00:00.000Z',
	totalFiles: 10,
	totalPatterns: 5,
	patterns: [
		{ id: 'vue2-filters', name: 'filters:{} option', dimension: 'vue2-to-vue3', severity: 'critical', file: 'src/App.vue', line: 5 as any, snippet: 'filters', suggestion: 'Use computed' },
		{ id: 'vue2-this-refs', name: 'this.$refs', dimension: 'vue2-to-vue3', severity: 'warning', file: 'src/Form.vue', line: 10 as any, snippet: 'this.$refs.input', suggestion: 'useTemplateRef()' },
	],
	dimensions: [
		{ dimension: 'vue2-to-vue3', count: 2, files: 2, bySeverity: { critical: 1, warning: 1, info: 0 } },
	],
	risk: { level: 'low', reason: 'Small project', recommendedOrder: ['vue2-to-vue3'], estimatedEffort: 1 },
	duration: 120,
}

describe('renderAnalysisReport', () => {
	it('renders Chinese report by default', () => {
		const md = renderAnalysisReport(fixture)
		expect(md).toContain('分析报告')
		expect(md).toContain('项目概览')
		expect(md).toContain('维度统计')
		expect(md).toContain('风险评估')
	})

	it('renders English report when locale=en', () => {
		const md = renderAnalysisReport(fixture, 'en')
		expect(md).toContain('Analysis Report')
		expect(md).toContain('Overview')
		expect(md).toContain('Dimensions')
		expect(md).toContain('Risk Assessment')
	})

	it('includes all dimension stats', () => {
		const md = renderAnalysisReport(fixture, 'en')
		expect(md).toContain('Vue 2 → 3')
		expect(md).toContain('1')
	})

	it('includes risk level', () => {
		const md = renderAnalysisReport(fixture, 'en')
		expect(md).toContain('LOW')
	})
})
