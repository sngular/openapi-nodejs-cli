module.exports = {
	branches: ['main'],
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		'@semantic-release/changelog',
		'@semantic-release/npm',
		'@semantic-release/github',
		[
			'@semantic-release/git',
			{
				assets: ['package-lock.json', 'package.json', 'CHANGELOG.md'],
			},
		],
	],
};
