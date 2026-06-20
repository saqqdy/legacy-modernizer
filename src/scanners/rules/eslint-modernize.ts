import type { PatternRule } from '../../types'

/** Detect legacy ESLint config patterns that should migrate to flat config */
export const eslintModernizeRules: PatternRule[] = [
	{
		id: 'eslint-legacy-config',
		name: 'Legacy ESLint config format',
		dimension: 'eslint-modernize',
		severity: 'info',
		regex: /module\.exports\s*=\s*\{[\s\S]*?(extends|parser|plugins|rules)\s*:/,
		suggestion: '迁移为 ESLint 9 flat config (eslint.config.mjs)，使用 export default 替代 module.exports',
	},
	{
		id: 'eslint-override-array',
		name: 'ESLint overrides array (flat config uses different pattern)',
		dimension: 'eslint-modernize',
		severity: 'info',
		regex: /\boverrides\s*:\s*\[/,
		suggestion: 'ESLint flat config 不再使用 overrides，改为多个配置对象组合',
	},
]
