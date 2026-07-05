/** @type {import('stylelint').Config} */
const config = {
	extends: ['stylelint-config-standard'],
	rules: {
		'import-notation': 'string',
		'lightness-notation': 'number',
		'hue-degree-notation': 'number',
		'color-hex-length': 'long',
		'at-rule-no-unknown': [
			true,
			{ ignoreAtRules: ['theme', 'utility', 'layer', 'apply', 'variant'] },
		],
		'color-no-hex': true,
		'custom-property-pattern': [
			'^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:--[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$',
			{ message: 'Use kebab-case custom properties.' },
		],
		'declaration-block-no-duplicate-custom-properties': true,
		'declaration-block-no-duplicate-properties': [
			true,
			{ ignore: ['consecutive-duplicates-with-different-values'] },
		],
		'declaration-property-unit-disallowed-list': {
			'font-size': ['px'],
			'line-height': ['em', 'px', 'rem'],
			'/^(?:border-radius|border-(?:top|right|bottom|left)-(?:left|right)-radius)$/': [
				'px',
			],
			'/^(?:gap|row-gap|column-gap|margin|padding)(?:-.+)?$/': ['px'],
		},
		'keyframes-name-pattern': '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$',
		'no-duplicate-selectors': true,
		'selector-max-id': 0,
		'selector-class-pattern': '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$',
	},
};

export default config;
