import { defineConfig } from 'rolldown'

export default defineConfig({
	input: 'src/index.ts',
	output: [
		{
			format: 'esm',
			dir: 'dist',
			entryFileNames: '[name].mjs',
			sourcemap: false,
		},
		{
			format: 'cjs',
			dir: 'dist',
			entryFileNames: '[name].js',
			sourcemap: false,
		},
	],
	platform: 'node',
	tsconfig: 'tsconfig.json',
})
