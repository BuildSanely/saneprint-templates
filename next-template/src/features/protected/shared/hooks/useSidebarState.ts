'use client';

import { useState } from 'react';

const SIDEBAR_COLLAPSED_STORAGE_KEY = 'sidebar-collapsed';

function getInitialSidebarState() {
	if (typeof window === 'undefined') {
		return false;
	}

	return window.localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY) === 'true';
}

export function useSidebarState() {
	const [isCollapsed, setIsCollapsed] = useState(getInitialSidebarState);

	function toggleSidebar() {
		setIsCollapsed((currentValue) => {
			const nextValue = !currentValue;
			window.localStorage.setItem(
				SIDEBAR_COLLAPSED_STORAGE_KEY,
				String(nextValue),
			);
			return nextValue;
		});
	}

	return {
		isCollapsed,
		toggleSidebar,
	};
}
