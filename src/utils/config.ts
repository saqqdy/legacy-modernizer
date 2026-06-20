/**
 * Configuration management
 */

import type { DimensionConfig, MigrationDimension, ModernizerConfig } from '../types'

/** Default include globs per dimension */
const DEFAULT_INCLUDES: Record<MigrationDimension, string[]> = {
	'vue2-to-vue3': ['**/*.vue', '**/*.js', '**/*.ts'],
	'js-to-ts': ['**/*.js', '**/*.jsx', '**/*.vue'],
	'webpack-to-vite': ['webpack.config.*', '**/webpack.*.config.*'],
	'jest-to-vitest': ['jest.config.*', '**/*.test.*', '**/*.spec.*'],
	'vuex-to-pinia': ['**/store/**', '**/vuex/**', '**/*.vue'],
	'eslint-modernize': ['.eslintrc.*', 'eslint.config.*'],
}

const DEFAULT_DIMENSION: DimensionConfig = {
	enabled: true,
	include: [],
	exclude: ['node_modules/**', 'dist/**', 'coverage/**'],
}

const DEFAULT_CONFIG: ModernizerConfig = {
	dimensions: {
		'vue2-to-vue3': { ...DEFAULT_DIMENSION, include: DEFAULT_INCLUDES['vue2-to-vue3'] },
		'js-to-ts': { ...DEFAULT_DIMENSION, include: DEFAULT_INCLUDES['js-to-ts'] },
		'webpack-to-vite': { ...DEFAULT_DIMENSION, include: DEFAULT_INCLUDES['webpack-to-vite'] },
		'jest-to-vitest': { ...DEFAULT_DIMENSION, include: DEFAULT_INCLUDES['jest-to-vitest'] },
		'vuex-to-pinia': { ...DEFAULT_DIMENSION, include: DEFAULT_INCLUDES['vuex-to-pinia'] },
		'eslint-modernize': { ...DEFAULT_DIMENSION, include: DEFAULT_INCLUDES['eslint-modernize'] },
	},
	maxFiles: 0,
	includeSuggestions: true,
}

const VALID_DIMENSIONS = new Set<string>(Object.keys(DEFAULT_CONFIG.dimensions))

/** Deep merge user config with defaults (Issue #9: guard unknown dimension keys) */
export function mergeConfig(user: Partial<ModernizerConfig>): ModernizerConfig {
	const merged: ModernizerConfig = {
		...DEFAULT_CONFIG,
		...user,
		dimensions: { ...DEFAULT_CONFIG.dimensions },
	}

	if (user.dimensions) {
		for (const dim of Object.keys(user.dimensions) as MigrationDimension[]) {
			if (!VALID_DIMENSIONS.has(dim)) {
				console.warn(`[legacy-modernizer] Unknown dimension key "${dim}" in config — skipping`)
				continue
			}
			merged.dimensions[dim] = {
				...DEFAULT_CONFIG.dimensions[dim],
				...user.dimensions[dim],
			}
		}
	}

	return merged
}

/** Get default configuration */
export function getDefaultConfig(): ModernizerConfig {
	return structuredClone(DEFAULT_CONFIG)
}
