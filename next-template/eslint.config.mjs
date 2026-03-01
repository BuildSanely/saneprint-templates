import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import saneprintRules from './eslint/saneprint-rules.mjs';

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	{
		plugins: {
			saneprint: saneprintRules,
		},
		rules: {
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['react-icons', 'react-icons/*', 'lucide-react', '@heroicons/*'],
							message: 'Use @phosphor-icons/react for iconography in saneprint.',
						},
					],
				},
			],
			'saneprint/no-hardcoded-design-values': 'error',
			'saneprint/enforce-feature-boundaries': 'error',
			'saneprint/no-raw-svg-icons': 'error',
		},
	},
	{
		files: ['src/features/core/hooks/useDataTableVirtualizer.ts'],
		rules: {
			'react-hooks/incompatible-library': 'off',
		},
	},
	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts',
	]),
]);

export default eslintConfig;
