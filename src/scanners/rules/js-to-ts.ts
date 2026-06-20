import type { PatternRule } from '../../types'


/** JS→TS rules — deliberately excludes js-no-type to avoid noise; JS file stats are computed separately */
export const jsToTsRules: PatternRule[] = [
	{ id: 'js-prop-types', name: 'PropTypes validation', dimension: 'js-to-ts', severity: 'warning', regex: /PropTypes\./, suggestion: '使用 TypeScript interface 替代 PropTypes' },
	{ id: 'js-jsdoc-types', name: 'JSDoc type annotations', dimension: 'js-to-ts', severity: 'info', regex: /@type\s*\{/, suggestion: '将 JSDoc 类型迁移为内联 TypeScript 类型' },
	{ id: 'js-commonjs-export', name: 'CommonJS exports', dimension: 'js-to-ts', severity: 'info', regex: /module\.exports\s*=|exports\.\w+\s*=/, suggestion: '使用 ES module export 替代 CommonJS' },
	{ id: 'js-require-import', name: 'require() import', dimension: 'js-to-ts', severity: 'info', regex: /\brequire\s*\(\s*['"][^'"]+['"]\s*\)/, suggestion: '使用 ES import 替代 require()' },
]
