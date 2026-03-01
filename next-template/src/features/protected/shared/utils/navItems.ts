import { House, FolderSimple, Browser } from '@phosphor-icons/react';

export type ProtectedNavMatchMode = 'exact' | 'prefix';

export interface ProtectedNavItem {
	href: string;
	label: string;
	icon: typeof House;
	matchMode: ProtectedNavMatchMode;
}

export const NAV_ITEMS: ProtectedNavItem[] = [
	{ href: '/dashboard', label: 'Overview', icon: House, matchMode: 'exact' },
	{
		href: '/dashboard/projects',
		label: 'Projects',
		icon: FolderSimple,
		matchMode: 'prefix',
	},
	{
		href: '/dashboard/projects/client',
		label: 'Projects Client',
		icon: Browser,
		matchMode: 'exact',
	},
];
