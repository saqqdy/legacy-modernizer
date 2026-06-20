import type { PatternRule } from '../../types'


export const vuexToPiniaRules: PatternRule[] = [
	{ id: 'vuex-store', name: 'Vuex store usage', dimension: 'vuex-to-pinia', severity: 'info', regex: /new\s+Vuex\.Store|from\s*['"]vuex['"]/, suggestion: '迁移为 Pinia defineStore()' },
	{ id: 'vuex-map-state', name: 'mapState / mapGetters', dimension: 'vuex-to-pinia', severity: 'warning', regex: /map(State|Getters|Mutations|Actions)\s*\(/, suggestion: 'Pinia 使用 storeToRefs() 替代 map 辅助函数' },
]
