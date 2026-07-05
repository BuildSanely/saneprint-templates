import type { Metadata } from 'next';

import { clientEnv } from '@/config/client-env';

const DEFAULT_SITE_NAME = 'name';
const DEFAULT_SITE_DESCRIPTION = 'The Professional Next.js Scaffolding Tool';
const DEFAULT_SITE_URL = clientEnv.NEXT_PUBLIC_APP_URL;

export interface PageMetadataInput {
	title: string;
	description?: string;
	path?: string;
	image?: string;
	noIndex?: boolean;
}

export function buildCanonicalUrl(path = '/') {
	return new URL(path, DEFAULT_SITE_URL).toString();
}

export function createPageMetadata({
	title,
	description = DEFAULT_SITE_DESCRIPTION,
	path = '/',
	image = '/og-image.png',
	noIndex = false,
}: PageMetadataInput): Metadata {
	const canonicalUrl = buildCanonicalUrl(path);

	return {
		title,
		description,
		alternates: {
			canonical: canonicalUrl,
		},
		openGraph: {
			type: 'website',
			title,
			description,
			url: canonicalUrl,
			siteName: DEFAULT_SITE_NAME,
			images: [
				{
					url: buildCanonicalUrl(image),
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [buildCanonicalUrl(image)],
		},
		robots: noIndex
			? {
					index: false,
					follow: false,
				}
			: undefined,
	};
}

export function createSiteMetadata({
	siteName = DEFAULT_SITE_NAME,
	description = DEFAULT_SITE_DESCRIPTION,
}: {
	siteName?: string;
	description?: string;
} = {}): Metadata {
	return {
		metadataBase: new URL(DEFAULT_SITE_URL),
		applicationName: siteName,
		title: {
			default: siteName,
			template: `%s | ${siteName}`,
		},
		description,
		openGraph: {
			type: 'website',
			siteName,
			title: siteName,
			description,
			url: DEFAULT_SITE_URL,
		},
		twitter: {
			card: 'summary_large_image',
			title: siteName,
			description,
		},
	};
}
