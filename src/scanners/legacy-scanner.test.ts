import { describe, expect, it } from 'vitest'
import { scanFileContent } from './legacy-scanner'
import { PATTERN_RULES } from './rules/index'

describe('scanFileContent', () => {
	it('detects Vue 2 Options API patterns', () => {
		const code = `
export default {
  data() {
    return { count: 0 }
  },
  computed: {
    double() { return this.count * 2 }
  },
  methods: {
    increment() { this.count++ }
  }
}`
		const patterns = scanFileContent(code, 'src/components/Counter.vue')
		expect(patterns.length).toBeGreaterThanOrEqual(3)
		expect(patterns.some(p => p.id === 'vue2-data-function')).toBe(true)
		expect(patterns.some(p => p.id === 'vue2-computed-option')).toBe(true)
		expect(patterns.some(p => p.id === 'vue2-methods-option')).toBe(true)
	})

	it('detects this.$refs usage', () => {
		const patterns = scanFileContent(`this.$refs.input.focus()`, 'src/components/Form.vue')
		expect(patterns.some(p => p.id === 'vue2-this-refs')).toBe(true)
	})

	it('detects Vue 2 destroyed lifecycle', () => {
		const code = `
export default {
  destroyed() { clearTimeout(this.timer) },
  beforeDestroy() { this.cleanup() }
}`
		const patterns = scanFileContent(code, 'src/App.vue')
		const destroyed = patterns.filter(p => p.id === 'vue2-destroyed')
		expect(destroyed.length).toBeGreaterThanOrEqual(1)
	})

	it('detects Vue 2 filters', () => {
		const code = `export default { filters: { currency(val) { return '¥' + val } } }`
		const patterns = scanFileContent(code, 'src/utils.js')
		expect(patterns.some(p => p.id === 'vue2-filters')).toBe(true)
	})

	it('detects Webpack patterns', () => {
		const code =
			"const webpack = require('webpack')\nconst modules = require.context('./modules', false, /.js$/)"
		const patterns = scanFileContent(code, 'webpack.config.js')
		expect(patterns.some(p => p.id === 'webpack-config')).toBe(true)
		expect(patterns.some(p => p.id === 'webpack-require-context')).toBe(true)
	})

	it('detects process.env usage', () => {
		const patterns = scanFileContent(`const apiKey = process.env.VUE_APP_KEY`, 'src/config.js')
		expect(patterns.some(p => p.id === 'webpack-process-env')).toBe(true)
	})

	it('detects Vuex patterns', () => {
		const code = `import Vuex from 'vuex'\nexport default new Vuex.Store({ state: { user: null } })`
		const patterns = scanFileContent(code, 'src/store/index.js')
		expect(patterns.some(p => p.id === 'vuex-store')).toBe(true)
	})

	it('detects Jest globals', () => {
		const code = `describe('X', () => { it('works', () => { expect(1).toBe(1) }) })`
		const patterns = scanFileContent(code, 'src/App.test.js')
		expect(patterns.some(p => p.id === 'jest-global')).toBe(true)
	})

	it('skips js-to-ts rules for .ts files', () => {
		const code = `export const x = 1\nmodule.exports = { x }`
		const patterns = scanFileContent(code, 'src/utils.ts')
		expect(patterns.some(p => p.dimension === 'js-to-ts')).toBe(false)
	})

	it('reports multiple matches per rule', () => {
		const code = `this.$refs.a.focus()\nthis.$refs.b.scroll()\nthis.$refs.c.click()`
		const patterns = scanFileContent(code, 'src/Form.vue')
		const refs = patterns.filter(p => p.id === 'vue2-this-refs')
		expect(refs.length).toBe(3)
	})

	it('does not match "majestic" as Jest config', () => {
		const code = `// This is majestic and great`
		const patterns = scanFileContent(code, 'src/app.js')
		expect(patterns.some(p => p.id === 'jest-config')).toBe(false)
	})

	it('strips Vue <style> blocks to avoid false matches', () => {
		const code = `<style>.filters { opacity: 0.5 }</style>\n<script>export default { data() {} }</script>`
		const patterns = scanFileContent(code, 'src/Comp.vue')
		// filters class in CSS should NOT trigger vue2-filters
		expect(patterns.some(p => p.id === 'vue2-filters')).toBe(false)
		// but data() in script should still be detected
		expect(patterns.some(p => p.id === 'vue2-data-function')).toBe(true)
	})

	it('returns minimal patterns for clean Composition API code', () => {
		const code = `import { ref, computed } from 'vue'\nconst count = ref(0)\nconst double = computed(() => count.value * 2)`
		const patterns = scanFileContent(code, 'src/composables/useCounter.ts')
		expect(patterns.filter(p => p.dimension === 'vue2-to-vue3')).toHaveLength(0)
	})
})

describe('PATTERN_RULES', () => {
	it('has unique ids across all rules (Fix #11)', () => {
		const ids = PATTERN_RULES.map(r => r.id)
		const unique = new Set(ids)
		expect(unique.size).toBe(ids.length)
	})

	it('has at least 20 rules', () => {
		expect(PATTERN_RULES.length).toBeGreaterThanOrEqual(20)
	})
})
