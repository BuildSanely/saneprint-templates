import { defineConfig, globalIgnores } from 'eslint/config';
import boundariesPlugin from 'eslint-plugin-boundaries';
import importPlugin from 'eslint-plugin-import';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

import { boundariesRules, boundariesSettings } from './eslint/boundaries-rules.mjs';
import {
	frontendComponentRules,
	frontendQualityRules,
	frontendQualitySettings,
} from './eslint/frontend-quality-rules.mjs';
import { importRules } from './eslint/import-rules.mjs';
import { projectPlugin } from './eslint/project-plugin.mjs';
import {
	restrictedColorSyntax,
	restrictedImportPatterns,
	restrictedImports,
} from './eslint/restricted-rules.mjs';
import saneprintPlugin from './eslint/saneprint-rules.mjs';

export default defineConfig([
	...nextVitals,
	...nextTs,
	{
		files: ['src/**/*.{ts,tsx,js,jsx}'],
		plugins: {
			boundaries: boundariesPlugin,
			import: importPlugin,
			project: projectPlugin,
			saneprint: saneprintPlugin,
			sonarjs: sonarjsPlugin,
		},
		settings: { ...boundariesSettings, ...frontendQualitySettings },
		rules: {
			...boundariesRules,
			...frontendQualityRules,
			...importRules,
			'no-console': ['error', { allow: ['warn', 'error'] }],
			'no-restricted-imports': [
				'error',
				{ paths: restrictedImports, patterns: restrictedImportPatterns },
			],
			'no-restricted-syntax': ['error', ...restrictedColorSyntax],
			'project/no-direct-process-env': 'error',
			'project/no-inline-styles': 'off',
			'saneprint/no-hardcoded-design-values': 'error',
			'saneprint/enforce-feature-boundaries': 'error',
			'saneprint/no-raw-svg-icons': 'error',
		},
	},
	{
		files: ['src/config/client-env.ts'],
		rules: {
			'project/client-env-public-variables-only': 'error',
			'project/no-direct-process-env': 'off',
		},
	},
	{
		files: ['src/config/server-env.ts'],
		rules: { 'project/no-direct-process-env': 'off' },
	},
	{
		files: ['src/utils/logger.ts'],
		rules: { 'no-console': 'off' },
	},
	{
		files: ['src/features/**/components/**/*.{ts,tsx,js,jsx}'],
		rules: frontendComponentRules,
	},
	{
		files: ['src/features/core/hooks/useDataTableVirtualizer.ts'],
		rules: { 'react-hooks/incompatible-library': 'off' },
	},
	globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
