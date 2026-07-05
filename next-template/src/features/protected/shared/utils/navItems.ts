import { BrowserIcon as Browser } from '@phosphor-icons/react/dist/csr/Browser';
import { FolderSimpleIcon as FolderSimple } from '@phosphor-icons/react/dist/csr/FolderSimple';
import { HouseIcon as House } from '@phosphor-icons/react/dist/csr/House';

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
