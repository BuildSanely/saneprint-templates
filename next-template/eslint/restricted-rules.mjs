export const restrictedImports = [
	{
		name: '@phosphor-icons/react',
		message:
			'Import icons from per-icon paths, e.g. @phosphor-icons/react/dist/csr/House.',
	},
	{
		name: 'react-icons',
		message: 'Use @phosphor-icons/react as the standard icon library.',
	},
	{
		name: 'lucide-react',
		message: 'Use @phosphor-icons/react as the standard icon library.',
	},
	{
		name: '@heroicons/react',
		message: 'Use @phosphor-icons/react as the standard icon library.',
	},
];

export const restrictedImportPatterns = [
	{
		group: [
			'react-icons/*',
			'lucide-react/*',
			'@heroicons/react/*',
			'@tabler/icons-react',
			'@tabler/icons-react/*',
		],
		message: 'Use @phosphor-icons/react unless an exception is approved.',
	},
];

export const restrictedColorSyntax = [
	{
		selector:
			'Literal[value=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/]',
		message: 'Use semantic design tokens from globals.css instead of color literals.',
	},
	{
		selector: 'Literal[value=/^(?:rgb|rgba|hsl|hsla|oklch)\\(/]',
		message: 'Use semantic design tokens from globals.css instead of color literals.',
	},
];
