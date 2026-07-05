'use client';

import { usePathname } from 'next/navigation';

import { NAV_ITEMS, ProtectedNavItem } from '../utils/navItems';

function matchesNavItem(pathname: string, item: ProtectedNavItem) {
	if (item.matchMode === 'prefix') {
		return pathname === item.href || pathname.startsWith(`${item.href}/`);
	}

	return pathname === item.href;
}

export function useProtectedNav() {
	const pathname = usePathname();

	return NAV_ITEMS.map((item) => ({
		...item,
		isActive: matchesNavItem(pathname, item),
	}));
}
