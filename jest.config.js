module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	rootDir: './',
	roots: ['<rootDir>/src/'],
	coverageReporters: ['clover', 'json', 'lcov', 'text', 'text-summary'],
};
