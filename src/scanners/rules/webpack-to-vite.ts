import type { PatternRule } from '../../types'


export const webpackToViteRules: PatternRule[] = [
	{ id: 'webpack-config', name: 'webpack.config file', dimension: 'webpack-to-vite', severity: 'info', regex: /require\s*\(\s*['"]webpack['"]\s*\)/, suggestion: '迁移为 vite.config.ts' },
	{ id: 'webpack-require-context', name: 'require.context', dimension: 'webpack-to-vite', severity: 'warning', regex: /require\.context\s*\(/, suggestion: 'Vite 使用 import.meta.glob 替代' },
	{ id: 'webpack-process-env', name: 'process.env usage', dimension: 'webpack-to-vite', severity: 'info', regex: /process\.env\./, suggestion: 'Vite 使用 import.meta.env 替代' },
]
