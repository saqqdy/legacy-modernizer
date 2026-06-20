import type { PatternRule } from '../../types'


export const vue2ToVue3Rules: PatternRule[] = [
	{ id: 'vue2-options-api', name: 'Options API component', dimension: 'vue2-to-vue3', severity: 'info', regex: /export\s+default\s*\{[\s\S]*?data\s*\(\)/, suggestion: '使用 <script setup> + Composition API 重写' },
	{ id: 'vue2-data-function', name: 'data() option', dimension: 'vue2-to-vue3', severity: 'info', regex: /\bdata\s*\(\)\s*\{/, suggestion: '使用 ref() / reactive() 替代' },
	{ id: 'vue2-computed-option', name: 'computed:{} option', dimension: 'vue2-to-vue3', severity: 'info', regex: /\bcomputed\s*:\s*\{/, suggestion: '使用 computed(() => ...) 替代' },
	{ id: 'vue2-methods-option', name: 'methods:{} option', dimension: 'vue2-to-vue3', severity: 'info', regex: /\bmethods\s*:\s*\{/, suggestion: '改写为普通函数' },
	{ id: 'vue2-watch-option', name: 'watch:{} option', dimension: 'vue2-to-vue3', severity: 'info', regex: /\bwatch\s*:\s*\{/, suggestion: '使用 watch() / watchEffect() 替代' },
	{ id: 'vue2-this-refs', name: 'this.$refs', dimension: 'vue2-to-vue3', severity: 'warning', regex: /this\.\$refs\./, suggestion: '使用 useTemplateRef() 替代' },
	{ id: 'vue2-this-emit', name: 'this.$emit', dimension: 'vue2-to-vue3', severity: 'warning', regex: /this\.\$emit/, suggestion: '使用 defineEmits() 替代' },
	{ id: 'vue2-this-router', name: 'this.$router / this.$route', dimension: 'vue2-to-vue3', severity: 'warning', regex: /this\.\$(router|route)\b/, suggestion: '使用 useRouter() / useRoute() 替代' },
	{ id: 'vue2-this-store', name: 'this.$store', dimension: 'vue2-to-vue3', severity: 'warning', regex: /this\.\$store/, suggestion: '使用 useStore() 或迁移到 Pinia' },
	{ id: 'vue2-filters', name: 'filters:{} option', dimension: 'vue2-to-vue3', severity: 'critical', regex: /\bfilters\s*:\s*\{/, suggestion: 'Vue 3 已移除 filters，改为 computed 或方法' },
	{ id: 'vue2-event-bus', name: '$on / $off / $once', dimension: 'vue2-to-vue3', severity: 'critical', regex: /\.\$(on|off|once)\s*\(/, suggestion: 'Vue 3 已移除事件总线，使用 mitt 或 tiny-emitter' },
	{ id: 'vue2-destroyed', name: 'destroyed / beforeDestroy', dimension: 'vue2-to-vue3', severity: 'warning', regex: /\b(destroyed|beforeDestroy)\s*[:(]/, suggestion: '改为 unmounted / beforeUnmount' },
	{ id: 'vue2-mixins', name: 'mixins:[] option', dimension: 'vue2-to-vue3', severity: 'warning', regex: /\bmixins\s*:\s*\[/, suggestion: '使用 Composables 替代 mixins' },
	{ id: 'vue2-v-bind-sync', name: 'v-bind.sync modifier', dimension: 'vue2-to-vue3', severity: 'critical', regex: /v-bind\.\w+\.sync/, suggestion: '改为 v-model:xxx (Vue 3 移除了 .sync)' },
	{ id: 'vue2-v-on-native', name: 'v-on.native modifier', dimension: 'vue2-to-vue3', severity: 'warning', regex: /v-on\.native|@\.native/, suggestion: 'Vue 3 移除了 .native，在 emits 中声明即可' },
]
