import type { PatternRule } from '../../types'
import { eslintModernizeRules } from './eslint-modernize'
import { jestToVitestRules } from './jest-to-vitest'
import { jsToTsRules } from './js-to-ts'
import { vue2ToVue3Rules } from './vue2-to-vue3'
import { vuexToPiniaRules } from './vuex-to-pinia'
import { webpackToViteRules } from './webpack-to-vite'

/** All detection rules combined from per-dimension modules */
export const PATTERN_RULES: PatternRule[] = [
	...vue2ToVue3Rules,
	...jsToTsRules,
	...webpackToViteRules,
	...jestToVitestRules,
	...vuexToPiniaRules,
	...eslintModernizeRules,
]
