/** @type {import("prettier").Config} */
const prettierConfig = {
	useTabs: true,
	singleQuote: true,
	jsxSingleQuote: true,
	trailingComma: 'all',
	printWidth: 90,
	plugins: ['prettier-plugin-tailwindcss'],
};

export default prettierConfig;
