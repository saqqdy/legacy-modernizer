/**
 * Legacy pattern scanner — detects Vue 2 / JS / Webpack legacy patterns using AI-semantic rules
 */

import type {
	AnalysisReport,
	DimensionStats,
	LegacyPattern,
	MigrationDimension,

	PatternSeverity,
	RiskAssessment,
	RiskLevel,
	RiskThresholds,
	ScannerOptions,
} from '../types'
import { glob, readFile  } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'
import { createPatternLine } from '../types'
import { PATTERN_RULES } from './rules/index'

// ─── Defaults ─────────────────────────────────────────────────

const DEFAULT_RISK_THRESHOLDS: RiskThresholds = {
	criticalHigh: 20,
	criticalMedium: 5,
	warningMedium: 30,
	filesHigh: 200,
	filesMedium: 50,
	effortHigh: 15,
	effortMedium: 25,
	effortLow: 40,
}

const DEFAULT_MAX_MATCHES_PER_RULE = 10
const CONCURRENT_READ_LIMIT = 50

// ─── Glob Matching ────────────────────────────────────────────

/**
 * Check whether a relative path matches any of the exclude patterns.
 * Handles `**` (any depth), `*` (single segment), and literal segments.
 */
function isExcluded(rel: string, excludes: string[]): boolean {
	const segments = rel.split(sep)
	for (const pattern of excludes) {
		const parts = pattern.split('/')
		if (matchGlobSegments(segments, parts, 0, 0)) return true
	}
	return false
}

/** Recursive glob segment matcher */
function matchGlobSegments(
	pathSegs: string[],
	patternParts: string[],
	pi: number,
	ppi: number
): boolean {
	if (ppi === patternParts.length) return pi === pathSegs.length

	const pat = patternParts[ppi]!

	if (pat === '**') {
		let nextPPi = ppi + 1
		while (nextPPi < patternParts.length && patternParts[nextPPi] === '**') nextPPi++
		if (nextPPi === patternParts.length) return true
		for (let i = pi; i <= pathSegs.length; i++) {
			if (matchGlobSegments(pathSegs, patternParts, i, nextPPi)) return true
		}
		return false
	}

	if (pi === pathSegs.length) return false

	const seg = pathSegs[pi]!

	if (pat === '*') {
		return matchGlobSegments(pathSegs, patternParts, pi + 1, ppi + 1)
	}

	if (seg === pat) {
		return matchGlobSegments(pathSegs, patternParts, pi + 1, ppi + 1)
	}

	return false
}

// ─── Vue SFC Extraction (Fix #5) ─────────────────────────────

/** Extract `<script>` / `<script setup>` content from a Vue SFC, excluding `<style>` and `<template>` */
function extractScriptContent(content: string, filePath: string): string {
	if (!filePath.endsWith('.vue')) return content

	// Strip <template> blocks
	let result = content.replace(/<template[\s\S]*?<\/template>/gi, '')
	// Strip <style> blocks
	result = result.replace(/<style[\s\S]*?<\/style>/gi, '')
	return result
}

// ─── Concurrent File Reads (Fix #7) ──────────────────────────

async function readFilesConcurrently(
	filePaths: string[],
	root: string,
	limit: number
): Promise<Map<string, string>> {
	const results = new Map<string, string>()
	const batch: Promise<void>[] = []

	for (const rel of filePaths) {
		const p = readFile(join(root, rel), 'utf-8')
			.then((content) => { results.set(rel, content) })
			.catch(() => { /* skip unreadable */ })

		batch.push(p)
		if (batch.length >= limit) {
			await Promise.allSettled(batch)
			batch.length = 0
		}
	}

	if (batch.length > 0) {
		await Promise.allSettled(batch)
	}

	return results
}

// ─── Scanner ──────────────────────────────────────────────────

/**
 * Scan a single file for legacy patterns.
 * Fix #5: strips <style>/<template> from .vue files before scanning.
 */
export function scanFileContent(
	content: string,
	filePath: string,
	maxMatchesPerRule = DEFAULT_MAX_MATCHES_PER_RULE
): LegacyPattern[] {
	const scanContent = extractScriptContent(content, filePath)
	const patterns: LegacyPattern[] = []

	for (const rule of PATTERN_RULES) {
		// Skip JS-to-TS rules for .ts/.tsx files
		if (rule.dimension === 'js-to-ts' && /\.(ts|tsx)$/.test(filePath)) continue

		// Force `g` flag for exec loop
		const flags = rule.regex.flags.includes('g') ? rule.regex.flags : `${rule.regex.flags  }g`
		const regex = new RegExp(rule.regex.source, flags)

		let match: RegExpExecArray | null = regex.exec(scanContent),
		 matchCount = 0
		while (match !== null && matchCount < maxMatchesPerRule) {



			const line = scanContent.slice(0, match.index).split('\n').length
			patterns.push({
				id: rule.id,
				name: rule.name,
				dimension: rule.dimension,
				severity: rule.severity,
				file: filePath,
				line: createPatternLine(line),
				snippet: match[0].slice(0, 120),
				suggestion: rule.suggestion,
			})
			matchCount++
			if (match[0].length === 0) regex.lastIndex++
			match = regex.exec(scanContent)
		}
	}

	return patterns
}

/**
 * Scan a project directory and produce a full analysis report.
 * Fix #7: concurrent file reads.
 * Fix #4: simplified JS file counting.
 * Fix #6: configurable risk thresholds.
 */
export async function scanProject(options: ScannerOptions): Promise<AnalysisReport> {
	const startTime = performance.now()
	const root = options.root
	const include = options.include ?? ['**/*.{vue,js,ts,jsx,tsx}']
	const exclude = options.exclude ?? ['node_modules/**', 'dist/**', 'coverage/**', '.git/**']
	const maxPerRule = options.maxMatchesPerRule ?? DEFAULT_MAX_MATCHES_PER_RULE
	const thresholds: RiskThresholds = { ...DEFAULT_RISK_THRESHOLDS, ...options.riskThresholds }

	// Collect files
	const files: string[] = []
	for (const pattern of include) {
		const globIter = glob(join(root, pattern))
		for await (const file of globIter) {
			const rel = relative(root, file)
			if (!isExcluded(rel, exclude)) {
				files.push(rel)
			}
		}
	}

	if (options.maxFiles && options.maxFiles > 0) {
		files.splice(options.maxFiles)
	}

	// Concurrent file reads (Fix #7)
	const contents = await readFilesConcurrently(files, root, CONCURRENT_READ_LIMIT)

	// Scan each file
	const allPatterns: LegacyPattern[] = []
	let totalFiles = 0,
	 jsFiles = 0 // Fix #4: simple JS count

	for (const [rel, content] of contents) {
		const patterns = scanFileContent(content, rel, maxPerRule)
		allPatterns.push(...patterns)
		totalFiles++
		if (/\.(js|jsx|vue)$/.test(rel)) jsFiles++
	}

	// Compute dimension stats
	const dimensions = computeDimensionStats(allPatterns, jsFiles)

	// Risk assessment (Fix #6)
	const risk = assessRisk(allPatterns, dimensions, totalFiles, thresholds)

	return {
		projectRoot: root,
		scannedAt: new Date().toISOString(),
		totalFiles,
		totalPatterns: allPatterns.length,
		patterns: allPatterns,
		dimensions,
		risk,
		duration: Math.round(performance.now() - startTime),
	}
}

/** Compute statistics grouped by dimension + JS file count */
function computeDimensionStats(patterns: LegacyPattern[], jsFiles: number): DimensionStats[] {
	const map = new Map<MigrationDimension, { count: number; files: Set<string>; bySeverity: Record<PatternSeverity, number> }>()

	for (const p of patterns) {
		let entry = map.get(p.dimension)
		if (!entry) {
			entry = { count: 0, files: new Set(), bySeverity: { critical: 0, warning: 0, info: 0 } }
			map.set(p.dimension, entry)
		}
		entry.count++
		entry.bySeverity[p.severity]++
		entry.files.add(p.file)
	}

	const result: DimensionStats[] = Array.from(map, ([dimension, e]) => ({
		dimension,
		count: e.count,
		files: e.files.size,
		bySeverity: e.bySeverity,
	}))

	// Inject JS→TS dimension based on file count
	if (jsFiles > 0) {
		const existing = result.find(d => d.dimension === 'js-to-ts')
		if (existing) {
			existing.files = Math.max(existing.files, jsFiles)
			existing.count = Math.max(existing.count, jsFiles)
		} else {
			result.push({
				dimension: 'js-to-ts',
				count: jsFiles,
				files: jsFiles,
				bySeverity: { critical: 0, warning: 0, info: jsFiles },
			})
		}
	}

	return result
}

/** Assess migration risk with configurable thresholds (Fix #6) */
function assessRisk(
	patterns: LegacyPattern[],
	dimensions: DimensionStats[],
	totalFiles: number,
	thresholds: RiskThresholds
): RiskAssessment {
	const criticalCount = patterns.filter(p => p.severity === 'critical').length
	const warningCount = patterns.filter(p => p.severity === 'warning').length

	let level: RiskLevel,
	 estimatedEffort: number

	if (criticalCount > thresholds.criticalHigh || totalFiles > thresholds.filesHigh) {
		level = 'high'
		estimatedEffort = Math.ceil(totalFiles / thresholds.effortHigh)
	} else if (criticalCount > thresholds.criticalMedium || warningCount > thresholds.warningMedium || totalFiles > thresholds.filesMedium) {
		level = 'medium'
		estimatedEffort = Math.ceil(totalFiles / thresholds.effortMedium)
	} else {
		level = 'low'
		estimatedEffort = Math.max(1, Math.ceil(totalFiles / thresholds.effortLow))
	}

	const recommendedOrder = [...dimensions]
		.sort((a, b) => {
			const severityScore = (s: DimensionStats): number => s.bySeverity.critical * 3 + s.bySeverity.warning
			return severityScore(b) - severityScore(a)
		})
		.map(d => d.dimension)

	const reason =
		criticalCount > 0
			? `发现 ${criticalCount} 个严重问题需要优先处理（如已废弃 API、破坏性变更），${warningCount} 个警告`
			: warningCount > 0
				? `发现 ${warningCount} 个警告级别问题，建议逐步迁移`
				: '项目现代化程度较好，仅需少量调整'

	return { level, reason, recommendedOrder, estimatedEffort }
}
