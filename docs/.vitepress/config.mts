import { defineConfig } from 'vitepress'

export default defineConfig({
	base: '/legacy-modernizer/',
	head: [
		['link', { href: '/legacy-modernizer/logo.svg', rel: 'icon' }],
		['meta', { name: 'theme-color', content: '#0d9488' }],
	],

	locales: {
		root: {
			description: 'AI-powered legacy code modernization — Vue 2→3, JS→TS, Webpack→Vite',
			label: 'English',
			lang: 'en',
			themeConfig: {
				darkModeSwitchLabel: 'Theme',
				docFooter: { next: 'Next', prev: 'Previous' },
				editLink: {
					pattern: 'https://github.com/saqqdy/legacy-modernizer/edit/main/docs/:path',
					text: 'Edit this page on GitHub',
				},
				footer: {
					copyright: 'Copyright © 2024-present saqqdy',
					message: 'Released under the MIT License.',
				},
				nav: [
					{ activeMatch: '/guide/', link: '/guide/', text: 'Guide' },
					{ activeMatch: '/api/', link: '/api/', text: 'API' },
					{ link: '/playground/', text: 'Playground' },
					{
						items: [
							{ link: 'https://github.com/saqqdy/legacy-modernizer', text: 'GitHub' },
							{ link: 'https://www.npmjs.com/package/legacy-modernizer', text: 'NPM' },
						],
						text: 'Links',
					},
				],
				outline: { label: 'On this page' },
				sidebar: {
					'/api/': [
						{ items: [{ link: '/api/', text: 'Overview' }], text: 'API Reference' },
						{
							collapsed: false,
							items: [
								{ link: '/api/scan-file-content', text: 'scanFileContent()' },
								{ link: '/api/scan-project', text: 'scanProject()' },
								{ link: '/api/render-analysis-report', text: 'renderAnalysisReport()' },
							],
							text: 'Functions',
						},
						{
							collapsed: false,
							items: [
								{ link: '/api/types/legacy-pattern', text: 'LegacyPattern' },
								{ link: '/api/types/analysis-report', text: 'AnalysisReport' },
								{ link: '/api/types/dimension-stats', text: 'DimensionStats' },
								{ link: '/api/types/risk-assessment', text: 'RiskAssessment' },
								{ link: '/api/types/modernizer-config', text: 'ModernizerConfig' },
							],
							text: 'Types',
						},
					],
					'/guide/': [
						{
							items: [
								{ link: '/guide/', text: 'Introduction' },
								{ link: '/guide/installation', text: 'Installation' },
								{ link: '/guide/quick-start', text: 'Quick Start' },
								{ link: '/guide/roadmap', text: 'Version Roadmap' },
							],
							text: 'Getting Started',
						},
						{
							items: [
								{ link: '/guide/vue2-to-vue3', text: 'Vue 2 → 3' },
								{ link: '/guide/js-to-ts', text: 'JS → TypeScript' },
								{ link: '/guide/webpack-to-vite', text: 'Webpack → Vite' },
							],
							text: 'Migration Dimensions',
						},
						{
							items: [
								{ link: '/guide/semantic-migration', text: 'Semantic Migration' },
								{ link: '/guide/interactive-workflow', text: 'Interactive Workflow' },
							],
							text: 'Advanced',
						},
					],
				},
			},
			title: 'Legacy Modernizer',
		},
		zh: {
			description: 'AI 驱动的遗留代码现代化 — Vue 2→3、JS→TS、Webpack→Vite',
			label: '简体中文',
			lang: 'zh-CN',
			link: '/zh/',
			themeConfig: {
				darkModeSwitchLabel: '主题',
				docFooter: { next: '下一页', prev: '上一页' },
				editLink: {
					pattern: 'https://github.com/saqqdy/legacy-modernizer/edit/main/docs/:path',
					text: '在 GitHub 上编辑此页',
				},
				footer: {
					copyright: '版权所有 © 2024-present saqqdy',
					message: '基于 MIT 许可发布',
				},
				nav: [
					{ activeMatch: '/zh/guide/', link: '/zh/guide/', text: '指南' },
					{ activeMatch: '/zh/api/', link: '/zh/api/', text: 'API' },
					{ link: '/playground/', text: 'Playground' },
					{
						items: [
							{ link: 'https://github.com/saqqdy/legacy-modernizer', text: 'GitHub' },
							{ link: 'https://www.npmjs.com/package/legacy-modernizer', text: 'NPM' },
						],
						text: '链接',
					},
				],
				outline: { label: '页面导航' },
				sidebar: {
					'/zh/api/': [
						{ items: [{ link: '/zh/api/', text: '概览' }], text: 'API 参考' },
						{
							collapsed: false,
							items: [
								{ link: '/zh/api/scan-file-content', text: 'scanFileContent()' },
								{ link: '/zh/api/scan-project', text: 'scanProject()' },
								{ link: '/zh/api/render-analysis-report', text: 'renderAnalysisReport()' },
							],
							text: '函数',
						},
						{
							collapsed: false,
							items: [
								{ link: '/zh/api/types/legacy-pattern', text: 'LegacyPattern' },
								{ link: '/zh/api/types/analysis-report', text: 'AnalysisReport' },
								{ link: '/zh/api/types/dimension-stats', text: 'DimensionStats' },
								{ link: '/zh/api/types/risk-assessment', text: 'RiskAssessment' },
								{ link: '/zh/api/types/modernizer-config', text: 'ModernizerConfig' },
							],
							text: '类型',
						},
					],
					'/zh/guide/': [
						{
							items: [
								{ link: '/zh/guide/', text: '介绍' },
								{ link: '/zh/guide/installation', text: '安装' },
								{ link: '/zh/guide/quick-start', text: '快速上手' },
								{ link: '/zh/guide/roadmap', text: '版本路线图' },
							],
							text: '开始',
						},
						{
							items: [
								{ link: '/zh/guide/vue2-to-vue3', text: 'Vue 2 → 3' },
								{ link: '/zh/guide/js-to-ts', text: 'JS → TypeScript' },
								{ link: '/zh/guide/webpack-to-vite', text: 'Webpack → Vite' },
							],
							text: '迁移维度',
						},
						{
							items: [
								{ link: '/zh/guide/semantic-migration', text: '语义级迁移' },
								{ link: '/zh/guide/interactive-workflow', text: '交互式工作流' },
							],
							text: '进阶',
						},
					],
				},
			},
			title: 'Legacy Modernizer',
		},
	},

	themeConfig: {
		logo: '/logo.svg',
		search: { provider: 'local' },
		siteTitle: 'Legacy Modernizer',
		socialLinks: [{ icon: 'github', link: 'https://github.com/saqqdy/legacy-modernizer' }],
	},
})
