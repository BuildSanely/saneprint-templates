export const boundariesSettings = {
	'boundaries/elements': [
		{ type: 'app', pattern: 'src/app/**' },
		{ type: 'config', pattern: 'src/config/**' },
		{ type: 'services', pattern: 'src/services/**' },
		{ type: 'store', pattern: 'src/store/**' },
		{ type: 'utils', pattern: 'src/utils/**' },
		{ type: 'core', pattern: 'src/features/core/**' },
		{
			type: 'feature',
			pattern: 'src/features/*/**',
			capture: ['featureName'],
		},
	],
};

export const boundariesRules = {
	'boundaries/dependencies': [
		'error',
		{
			default: 'allow',
			rules: [
				{
					from: {
						type: ['config', 'services', 'store', 'utils', 'core', 'feature'],
					},
					disallow: { to: { type: 'app' } },
					message:
						'Routes compose lower-level modules; lower-level modules must not import from src/app.',
				},
			],
		},
	],
};
