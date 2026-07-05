/** @type {import('lint-staged').Configuration} */
const config = {
	'*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
	'*.css': (files) => {
		const stylelint = `stylelint --fix ${files.join(' ')}`;
		const prettierTargets = files.filter((file) => !file.endsWith('globals.css'));
		const prettier = prettierTargets.length
			? `prettier --write ${prettierTargets.join(' ')}`
			: null;
		return [stylelint, prettier].filter(Boolean);
	},
	'*.{json,jsonc,md,yml,yaml}': ['prettier --write'],
};

export default config;
