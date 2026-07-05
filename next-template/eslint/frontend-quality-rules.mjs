export const frontendQualitySettings = {
	'jsx-a11y': { components: { Link: 'a' } },
};

export const frontendQualityRules = {
	'@next/next/no-img-element': 'error',
	'@typescript-eslint/no-empty-function': 'error',
	'sonarjs/no-all-duplicated-branches': 'error',
	'sonarjs/no-duplicated-branches': 'error',
	'sonarjs/no-identical-functions': 'error',
	'jsx-a11y/alt-text': 'error',
	'jsx-a11y/anchor-has-content': 'error',
	'jsx-a11y/anchor-is-valid': [
		'error',
		{
			components: ['Link'],
			specialLink: ['hrefLeft', 'hrefRight'],
			aspects: ['noHref', 'invalidHref', 'preferButton'],
		},
	],
	'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
	'jsx-a11y/aria-props': 'error',
	'jsx-a11y/aria-proptypes': 'error',
	'jsx-a11y/aria-role': 'error',
	'jsx-a11y/aria-unsupported-elements': 'error',
	'jsx-a11y/heading-has-content': 'error',
	'jsx-a11y/html-has-lang': 'error',
	'jsx-a11y/iframe-has-title': 'error',
	'jsx-a11y/interactive-supports-focus': 'error',
	'jsx-a11y/label-has-associated-control': 'error',
	'jsx-a11y/lang': 'error',
	'jsx-a11y/no-access-key': 'error',
	'jsx-a11y/no-aria-hidden-on-focusable': 'error',
	'jsx-a11y/no-autofocus': ['error', { ignoreNonDOM: true }],
	'jsx-a11y/no-distracting-elements': 'error',
	'jsx-a11y/no-interactive-element-to-noninteractive-role': 'error',
	'jsx-a11y/no-noninteractive-element-to-interactive-role': 'error',
	'jsx-a11y/no-noninteractive-tabindex': 'error',
	'jsx-a11y/role-has-required-aria-props': 'error',
	'jsx-a11y/role-supports-aria-props': 'error',
	'jsx-a11y/scope': 'error',
	'jsx-a11y/tabindex-no-positive': 'error',
	'project/no-empty-jsx-handlers': 'error',
	'project/no-empty-meta-content': 'error',
	'project/no-empty-next-metadata': 'error',
	'project/no-placeholder-href': 'error',
	'react-hooks/exhaustive-deps': 'error',
	'react-hooks/rules-of-hooks': 'error',
};

export const frontendComponentRules = {
	'project/no-api-in-components': 'error',
};
