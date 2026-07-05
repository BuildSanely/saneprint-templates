function isProcessEnv(node) {
	return (
		node?.type === 'MemberExpression' &&
		node.object.type === 'Identifier' &&
		node.object.name === 'process' &&
		((node.property.type === 'Identifier' && node.property.name === 'env') ||
			(node.property.type === 'Literal' && node.property.value === 'env'))
	);
}

function isEmptyString(node) {
	return node?.type === 'Literal' && node.value === '';
}

function propertyName(property) {
	if (property.type !== 'Property') return null;
	if (property.key.type === 'Identifier') return property.key.name;
	if (property.key.type === 'Literal') return String(property.key.value);
	return null;
}

export const projectRules = {
	'client-env-public-variables-only': {
		meta: {
			type: 'problem',
			schema: [],
			messages: {
				dynamic:
					'Use a static process.env.NEXT_PUBLIC_* reference so Next.js can inline it.',
				private: 'Client environment modules may only read NEXT_PUBLIC_* variables.',
			},
		},
		create(context) {
			return {
				MemberExpression(node) {
					if (isProcessEnv(node)) {
						if (node.parent?.type !== 'MemberExpression' || node.parent.object !== node) {
							context.report({ node, messageId: 'dynamic' });
						}
						return;
					}
					if (!isProcessEnv(node.object)) return;
					if (node.computed || node.property.type !== 'Identifier') {
						context.report({ node, messageId: 'dynamic' });
					} else if (!node.property.name.startsWith('NEXT_PUBLIC_')) {
						context.report({ node, messageId: 'private' });
					}
				},
			};
		},
	},
	'no-direct-process-env': {
		meta: {
			type: 'problem',
			schema: [],
			messages: {
				direct:
					'Use the validated clientEnv or serverEnv module. process.env.NODE_ENV is the only runtime exception.',
			},
		},
		create(context) {
			return {
				MemberExpression(node) {
					if (isProcessEnv(node)) {
						if (node.parent?.type !== 'MemberExpression' || node.parent.object !== node) {
							context.report({ node, messageId: 'direct' });
						}
						return;
					}
					if (!isProcessEnv(node.object)) return;
					const isNodeEnv =
						!node.computed &&
						node.property.type === 'Identifier' &&
						node.property.name === 'NODE_ENV';
					if (!isNodeEnv) context.report({ node, messageId: 'direct' });
				},
			};
		},
	},
	'no-api-in-components': {
		meta: {
			type: 'problem',
			schema: [],
			messages: {
				api: 'Move request logic out of components and into a service or data hook.',
			},
		},
		create(context) {
			const clientNames = new Set();
			return {
				ImportDeclaration(node) {
					const source = String(node.source.value);
					if (
						source !== 'axios' &&
						source !== '@services' &&
						!source.startsWith('@services/') &&
						!source.includes('/services/')
					)
						return;
					for (const specifier of node.specifiers) {
						if (specifier.local?.name) clientNames.add(specifier.local.name);
					}
					context.report({ node, messageId: 'api' });
				},
				CallExpression(node) {
					if (node.callee.type === 'Identifier' && node.callee.name === 'fetch') {
						context.report({ node, messageId: 'api' });
					} else if (
						node.callee.type === 'MemberExpression' &&
						node.callee.object.type === 'Identifier' &&
						clientNames.has(node.callee.object.name)
					) {
						context.report({ node, messageId: 'api' });
					}
				},
			};
		},
	},
	'no-empty-jsx-handlers': {
		meta: {
			type: 'problem',
			schema: [],
			messages: { empty: 'Implement, disable, or remove this empty event handler.' },
		},
		create(context) {
			return {
				JSXAttribute(node) {
					const expression =
						node.value?.type === 'JSXExpressionContainer' ? node.value.expression : null;
					if (
						node.name.type === 'JSXIdentifier' &&
						/^on[A-Z]/.test(node.name.name) &&
						(expression?.type === 'ArrowFunctionExpression' ||
							expression?.type === 'FunctionExpression') &&
						expression.body.type === 'BlockStatement' &&
						expression.body.body.length === 0
					)
						context.report({ node, messageId: 'empty' });
				},
			};
		},
	},
	'no-empty-meta-content': {
		meta: {
			type: 'problem',
			schema: [],
			messages: { empty: 'Provide meaningful metadata or remove the meta tag.' },
		},
		create(context) {
			return {
				JSXOpeningElement(node) {
					if (
						node.name.type !== 'JSXIdentifier' ||
						node.name.name.toLowerCase() !== 'meta'
					)
						return;
					for (const attribute of node.attributes) {
						if (
							attribute.type === 'JSXAttribute' &&
							attribute.name.type === 'JSXIdentifier' &&
							attribute.name.name === 'content' &&
							(isEmptyString(attribute.value) ||
								(attribute.value?.type === 'JSXExpressionContainer' &&
									isEmptyString(attribute.value.expression)))
						)
							context.report({ node: attribute, messageId: 'empty' });
					}
				},
			};
		},
	},
	'no-empty-next-metadata': {
		meta: {
			type: 'problem',
			schema: [],
			messages: { empty: 'Provide a descriptive metadata value or omit the property.' },
		},
		create(context) {
			function checkObject(node) {
				for (const property of node.properties) {
					const name = propertyName(property);
					if (['title', 'description'].includes(name) && isEmptyString(property.value)) {
						context.report({ node: property.value, messageId: 'empty' });
					}
					if (
						property.type === 'Property' &&
						property.value.type === 'ObjectExpression'
					) {
						checkObject(property.value);
					}
				}
			}
			return {
				ExportNamedDeclaration(node) {
					if (node.declaration?.type !== 'VariableDeclaration') return;
					for (const declaration of node.declaration.declarations) {
						if (
							declaration.id.type === 'Identifier' &&
							declaration.id.name === 'metadata' &&
							declaration.init?.type === 'ObjectExpression'
						)
							checkObject(declaration.init);
					}
				},
				CallExpression(node) {
					if (
						node.callee.type === 'Identifier' &&
						['createPageMetadata', 'createSiteMetadata'].includes(node.callee.name) &&
						node.arguments[0]?.type === 'ObjectExpression'
					)
						checkObject(node.arguments[0]);
				},
			};
		},
	},
	'no-inline-styles': {
		meta: {
			type: 'suggestion',
			schema: [],
			messages: {
				avoid: 'Prefer shared utilities or component contracts over inline styles.',
			},
		},
		create(context) {
			return {
				JSXAttribute(node) {
					if (node.name.type === 'JSXIdentifier' && node.name.name === 'style') {
						context.report({ node, messageId: 'avoid' });
					}
				},
			};
		},
	},
	'no-placeholder-href': {
		meta: {
			type: 'problem',
			schema: [],
			messages: { placeholder: 'Use a real route, a button, or remove this link.' },
		},
		create(context) {
			const placeholder = (node) =>
				isEmptyString(node) ||
				(node?.type === 'Literal' && ['#', 'javascript:void(0)'].includes(node.value));
			return {
				JSXAttribute(node) {
					if (node.name.type !== 'JSXIdentifier' || node.name.name !== 'href') return;
					if (
						placeholder(node.value) ||
						(node.value?.type === 'JSXExpressionContainer' &&
							placeholder(node.value.expression))
					) {
						context.report({ node, messageId: 'placeholder' });
					}
				},
			};
		},
	},
};

export const projectPlugin = { rules: projectRules };
