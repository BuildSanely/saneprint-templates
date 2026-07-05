/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
	forbidden: [
		{
			name: 'no-circular',
			severity: 'error',
			from: {},
			to: { circular: true },
		},
		{
			name: 'no-unresolved',
			severity: 'error',
			from: {},
			to: { couldNotResolve: true },
		},
		{
			name: 'lower-layers-do-not-import-app',
			severity: 'error',
			from: { path: '^src/(config|features|services|store|utils)/' },
			to: { path: '^src/app/' },
		},
	],
	options: {
		doNotFollow: { path: 'node_modules' },
		exclude: {
			path: ['^\\.next/', '^build/', '^coverage/', '^out/', '^next-env\\.d\\.ts$'].join(
				'|',
			),
		},
		tsConfig: { fileName: 'tsconfig.json' },
		tsPreCompilationDeps: true,
	},
};
