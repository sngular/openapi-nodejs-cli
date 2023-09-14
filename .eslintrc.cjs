module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:prettier/recommended',
		'plugin:import/recommended',
		'plugin:markdown/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	plugins: ['@typescript-eslint', 'prettier', 'import', 'html', 'markdown'],
	env: {
		browser: true,
		node: true,
		es2022: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	ignorePatterns: ['output', 'outputTest', '**/*d.ts'],
	rules: {
		'@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
		indent: ['error', 'tab', { SwitchCase: 1 }],
	},
	overrides: [
		{
			files: ['**/*.cjs'],
			env: {
				commonjs: true,
			},
			parserOptions: {
				sourceType: 'script',
			},
		},
		{
			// Enable the Markdown processor for all .md files.
			files: ['**/*.md'],
			processor: 'markdown/markdown',
		},
		{
			// Target ```js code blocks in .md files.
			files: ['**/*.md/*.js'],
			rules: {
				'no-console': 'off',
				'import/no-unresolved': 'off',
			},
		},
	],
};
