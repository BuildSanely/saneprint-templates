import path from 'node:path';

const TAILWIND_PALETTE_PATTERN =
	/\b(?:bg|text|border|fill|stroke)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/u;
const ARBITRARY_COLOR_PATTERN = /\b(?:bg|text|border|fill|stroke)-\[[^\]]+\]/u;
const ARBITRARY_SPACING_PATTERN =
	/\b(?:p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|space-x|space-y)-\[[^\]]+\]/u;
const RAW_COLOR_PATTERN =
	/(?:#(?:[\da-fA-F]{3,8})\b|rgba?\(|hsla?\(|oklch\(|color-mix\()/u;
const SPACING_STYLE_KEYS = new Set([
	'gap',
	'columnGap',
	'rowGap',
	'padding',
	'paddingTop',
	'paddingRight',
	'paddingBottom',
	'paddingLeft',
	'paddingInline',
	'paddingBlock',
	'margin',
	'marginTop',
	'marginRight',
	'marginBottom',
	'marginLeft',
	'marginInline',
	'marginBlock',
]);
const COLOR_STYLE_KEYS = new Set([
	'color',
	'background',
	'backgroundColor',
	'borderColor',
	'borderTopColor',
	'borderRightColor',
	'borderBottomColor',
	'borderLeftColor',
	'fill',
	'stroke',
]);

function normalizePath(filePath) {
	return filePath.split(path.sep).join('/');
}

function getFeatureKeyFromFilename(filename) {
	const normalized = normalizePath(filename);
	const marker = '/src/features/';
	const markerIndex = normalized.indexOf(marker);

	if (markerIndex === -1) {
		return null;
	}

	const segments = normalized.slice(markerIndex + marker.length).split('/');

	if (segments[0] === 'protected' && segments[1]) {
		return `protected/${segments[1]}`;
	}

	return segments[0] ?? null;
}

function getFeatureImportInfo(source) {
	if (typeof source !== 'string') {
		return null;
	}

	if (source.startsWith('@/features/')) {
		const segments = source.slice('@/features/'.length).split('/');

		if (segments[0] === 'protected' && segments[1]) {
			return {
				key: `protected/${segments[1]}`,
				isBarrel: segments.length === 2,
			};
		}

		return {
			key: segments[0] ?? null,
			isBarrel: segments.length === 1,
		};
	}

	if (source === '@core' || source.startsWith('@core/')) {
		return {
			key: 'core',
			isBarrel: source === '@core',
		};
	}

	if (source === '@auth' || source.startsWith('@auth/')) {
		return {
			key: 'auth',
			isBarrel: source === '@auth',
		};
	}

	if (source === '@projects' || source.startsWith('@projects/')) {
		return {
			key: 'protected/projects',
			isBarrel: source === '@projects',
		};
	}

	if (source === '@dashboard/shared' || source.startsWith('@dashboard/shared/')) {
		return {
			key: 'protected/shared',
			isBarrel: source === '@dashboard/shared',
		};
	}

	return null;
}

function getStaticStringValue(node) {
	if (!node) {
		return null;
	}

	if (node.type === 'Literal' && typeof node.value === 'string') {
		return node.value;
	}

	if (
		node.type === 'TemplateLiteral' &&
		node.expressions.length === 0 &&
		node.quasis.length === 1
	) {
		return node.quasis[0]?.value.cooked ?? null;
	}

	return null;
}

function collectClassNameStrings(node, values = []) {
	if (!node) {
		return values;
	}

	const directValue = getStaticStringValue(node);

	if (typeof directValue === 'string') {
		values.push(directValue);
		return values;
	}

	switch (node.type) {
		case 'JSXExpressionContainer':
			return collectClassNameStrings(node.expression, values);
		case 'CallExpression':
			node.arguments.forEach((argument) => {
				collectClassNameStrings(argument, values);
			});
			return values;
		case 'ConditionalExpression':
			collectClassNameStrings(node.consequent, values);
			collectClassNameStrings(node.alternate, values);
			return values;
		case 'LogicalExpression':
			collectClassNameStrings(node.right, values);
			return values;
		case 'ArrayExpression':
			node.elements.forEach((element) => {
				collectClassNameStrings(element, values);
			});
			return values;
		default:
			return values;
	}
}

function getObjectPropertyName(node) {
	if (node.type !== 'Property' || node.computed) {
		return null;
	}

	if (node.key.type === 'Identifier') {
		return node.key.name;
	}

	if (node.key.type === 'Literal' && typeof node.key.value === 'string') {
		return node.key.value;
	}

	return null;
}

function isAllowedStyleValue(value) {
	return (
		value.startsWith('var(') ||
		value === 'transparent' ||
		value === 'currentColor' ||
		value === 'inherit'
	);
}

const saneprintRules = {
	'no-hardcoded-design-values': {
		meta: {
			type: 'problem',
			docs: {
				description:
					'Require semantic color tokens and avoid arbitrary spacing values in JSX.',
			},
			schema: [],
		},
		create(context) {
			return {
				JSXAttribute(node) {
					if (node.name.type !== 'JSXIdentifier') {
						return;
					}

					if (node.name.name === 'className' && node.value) {
						const classNameValues = collectClassNameStrings(node.value);

						classNameValues.forEach((classNameValue) => {
							if (
								TAILWIND_PALETTE_PATTERN.test(classNameValue) ||
								ARBITRARY_COLOR_PATTERN.test(classNameValue) ||
								ARBITRARY_SPACING_PATTERN.test(classNameValue)
							) {
								context.report({
									node,
									message:
										'Use saneprint theme tokens and spacing utilities instead of raw palette or arbitrary value classes.',
								});
							}
						});
					}

					if (
						node.name.name === 'style' &&
						node.value?.type === 'JSXExpressionContainer' &&
						node.value.expression.type === 'ObjectExpression'
					) {
						node.value.expression.properties.forEach((property) => {
							const propertyName = getObjectPropertyName(property);
							const propertyValue = getStaticStringValue(property.value);

							if (!propertyName || typeof propertyValue !== 'string') {
								return;
							}

							if (SPACING_STYLE_KEYS.has(propertyName)) {
								context.report({
									node: property.value,
									message:
										'Use saneprint spacing tokens or utility classes instead of inline spacing values.',
								});
							}

							if (
								COLOR_STYLE_KEYS.has(propertyName) &&
								RAW_COLOR_PATTERN.test(propertyValue) &&
								!isAllowedStyleValue(propertyValue)
							) {
								context.report({
									node: property.value,
									message:
										'Use saneprint color tokens instead of raw inline color values.',
								});
							}
						});
					}
				},
			};
		},
	},
	'enforce-feature-boundaries': {
		meta: {
			type: 'problem',
			docs: {
				description:
					"Disallow reaching into another feature's internal files. Import the feature barrel instead.",
			},
			schema: [],
		},
		create(context) {
			const importerKey = getFeatureKeyFromFilename(context.filename);

			if (!importerKey) {
				return {};
			}

			return {
				ImportDeclaration(node) {
					const targetInfo = getFeatureImportInfo(node.source.value);

					if (!targetInfo?.key) {
						return;
					}

					if (
						targetInfo.key === 'core' ||
						targetInfo.key === 'protected/shared' ||
						targetInfo.key === importerKey ||
						targetInfo.isBarrel
					) {
						return;
					}

					context.report({
						node,
						message:
							"Import from another feature's public barrel instead of its internal files.",
					});
				},
			};
		},
	},
	'no-raw-svg-icons': {
		meta: {
			type: 'problem',
			docs: {
				description: 'Use the shared icon library instead of embedding raw SVG markup.',
			},
			schema: [],
		},
		create(context) {
			return {
				JSXOpeningElement(node) {
					if (node.name.type === 'JSXIdentifier' && node.name.name === 'svg') {
						context.report({
							node,
							message:
								'Use @phosphor-icons/react instead of embedding raw SVG markup in app components.',
						});
					}
				},
			};
		},
	},
};

const saneprintPlugin = {
	meta: {
		name: 'eslint-plugin-saneprint',
	},
	rules: saneprintRules,
};

export default saneprintPlugin;
