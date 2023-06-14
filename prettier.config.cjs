module.exports = {
	printWidth: 120,
	tabWidth: 2,
	useTabs: true,
	semi: true,
	singleQuote: true,
	quoteProps: 'as-needed',
	trailingComma: 'es5',
	bracketSpacing: true,
	bracketSameLine: true,
	overrides: [
		{
			files: ['*.yml'],
			options: {
				useTabs: false,
			},
		},
	],
};
