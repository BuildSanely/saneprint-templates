'use client';

import { useEffect, useState } from 'react';

import { PaletteIcon as Palette } from '@phosphor-icons/react/dist/csr/Palette';

import {
	StyleguideBadge,
	StyleguideColorSwatch,
	StyleguideSection,
} from './StyleguidePrimitives';

type PaletteFamily = {
	name: string;
	tokens: string[];
};

const ROLE_COLOR_VARIABLES = new Set([
	'background',
	'surface',
	'foreground',
	'muted',
	'border',
	'brand',
	'brand-hover',
	'accent',
	'accent-hover',
	'danger',
	'danger-hover',
	'on-brand',
	'on-accent',
	'on-danger',
	'input',
	'input-border',
	'focus-ring',
]);

const CORE_ROLE_SWATCHES = [
	{
		name: 'Brand',
		token: '--color-brand',
		description: 'Primary action color',
	},
	{
		name: 'Brand Hover',
		token: '--color-brand-hover',
		description: 'Primary hover state',
	},
	{
		name: 'Accent',
		token: '--color-accent',
		description: 'Secondary action color',
	},
	{
		name: 'Accent Hover',
		token: '--color-accent-hover',
		description: 'Secondary hover state',
	},
	{
		name: 'Danger',
		token: '--color-danger',
		description: 'Destructive actions',
	},
	{
		name: 'Focus Ring',
		token: '--color-focus-ring',
		description: 'Accessible focus indicator',
	},
] as const;

function sortTokenNames(left: string, right: string): number {
	const leftNumber = Number(left);
	const rightNumber = Number(right);

	if (!Number.isNaN(leftNumber) && !Number.isNaN(rightNumber)) {
		return leftNumber - rightNumber;
	}

	if (!Number.isNaN(leftNumber)) {
		return -1;
	}

	if (!Number.isNaN(rightNumber)) {
		return 1;
	}

	return left.localeCompare(right);
}

function formatFamilyName(name: string): string {
	return name
		.split('-')
		.map((segment) =>
			segment.length > 0 ? segment[0].toUpperCase() + segment.slice(1) : segment,
		)
		.join(' ');
}

function readPaletteFamilies(): PaletteFamily[] {
	const styles = getComputedStyle(document.documentElement);
	const families = new Map<string, Set<string>>();

	for (let index = 0; index < styles.length; index += 1) {
		const propertyName = styles[index];
		if (!propertyName.startsWith('--color-')) {
			continue;
		}

		const colorName = propertyName.slice('--color-'.length);
		if (ROLE_COLOR_VARIABLES.has(colorName)) {
			continue;
		}

		const lastHyphenIndex = colorName.lastIndexOf('-');
		if (lastHyphenIndex === -1) {
			continue;
		}

		const familyName = colorName.slice(0, lastHyphenIndex);
		const tokenName = colorName.slice(lastHyphenIndex + 1);
		if (!familyName || !tokenName) {
			continue;
		}

		if (!families.has(familyName)) {
			families.set(familyName, new Set());
		}

		families.get(familyName)?.add(tokenName);
	}

	return Array.from(families.entries())
		.map(([name, tokens]) => ({
			name,
			tokens: Array.from(tokens).sort(sortTokenNames),
		}))
		.sort((left, right) => left.name.localeCompare(right.name));
}

export function ColorSystemSection() {
	const [paletteFamilies, setPaletteFamilies] = useState<PaletteFamily[]>([]);

	useEffect(() => {
		const animationFrame = requestAnimationFrame(() => {
			setPaletteFamilies(readPaletteFamilies());
		});

		return () => cancelAnimationFrame(animationFrame);
	}, []);

	return (
		<StyleguideSection
			title='Color System'
			icon={Palette}
			description='Generated directly from your active theme tokens and semantic roles.'
			badge='Live Tokens'
		>
			<div className='space-y-10'>
				<div className='space-y-4'>
					<div className='flex items-center gap-2'>
						<h3 className='heading-5 text-foreground'>Semantic Roles</h3>
						<StyleguideBadge variant='brand'>Theme Driven</StyleguideBadge>
					</div>
					<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						{CORE_ROLE_SWATCHES.map((swatch) => (
							<StyleguideColorSwatch
								key={swatch.token}
								name={swatch.name}
								token={swatch.token}
								description={swatch.description}
							/>
						))}
					</div>
				</div>

				<div className='space-y-4'>
					<h3 className='heading-5 text-foreground'>Generated Palette Families</h3>
					<p className='body-sm text-muted'>
						Every <code className='font-mono'>colors.*</code> entry from your theme is
						exposed here, including custom families like tertiary or brand-alt.
					</p>
					<div className='space-y-8'>
						{paletteFamilies.map((family) => (
							<div key={family.name} className='space-y-4'>
								<div className='flex items-center gap-2'>
									<h4 className='heading-6 text-foreground'>
										{formatFamilyName(family.name)}
									</h4>
									<StyleguideBadge>{family.name}</StyleguideBadge>
								</div>
								<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
									{family.tokens.map((token) => (
										<StyleguideColorSwatch
											key={`${family.name}-${token}`}
											name={`${formatFamilyName(family.name)} ${token}`}
											token={`--color-${family.name}-${token}`}
										/>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</StyleguideSection>
	);
}
