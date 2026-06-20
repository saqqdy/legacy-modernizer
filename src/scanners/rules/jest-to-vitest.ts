import type { PatternRule } from '../../types'


export const jestToVitestRules: PatternRule[] = [
	{ id: 'jest-config', name: 'Jest config detected', dimension: 'jest-to-vitest', severity: 'info', regex: /jest\.config|from\s*['"]@jest|require\s*\(\s*['"]@jest/, suggestion: '迁移为 vitest.config.ts' },
	{ id: 'jest-global', name: 'Jest global functions', dimension: 'jest-to-vitest', severity: 'warning', regex: /\b(describe|it|test|expect|beforeEach|afterEach|jest)\s*\(/, suggestion: '改为 vitest 导入 (vi, describe, it, expect)' },
]
