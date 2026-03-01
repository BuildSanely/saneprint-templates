'use client';

import { RefObject, useEffect, useRef } from 'react';
import { Virtualizer, useVirtualizer } from '@tanstack/react-virtual';

interface UseDataTableVirtualizerOptions {
	count: number;
	estimateRowHeight: number;
	mode: 'pagination' | 'infinite';
	hasMore: boolean;
	isFetchingMore: boolean;
	onLoadMore?: () => void;
}

export function useDataTableVirtualizer({
	count,
	estimateRowHeight,
	hasMore,
	isFetchingMore,
	mode,
	onLoadMore,
}: UseDataTableVirtualizerOptions): {
	scrollRef: RefObject<HTMLDivElement | null>;
	rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
} {
	const scrollRef = useRef<HTMLDivElement>(null);
	const rowVirtualizer = useVirtualizer({
		count,
		getScrollElement: () => scrollRef.current,
		estimateSize: () => estimateRowHeight,
		overscan: 8,
	});

	useEffect(() => {
		if (mode !== 'infinite' || !hasMore || isFetchingMore || !onLoadMore) {
			return;
		}

		const virtualItems = rowVirtualizer.getVirtualItems();
		const lastItem = virtualItems.at(-1);

		if (!lastItem) {
			return;
		}

		if (lastItem.index >= count - 3) {
			onLoadMore();
		}
	}, [count, hasMore, isFetchingMore, mode, onLoadMore, rowVirtualizer]);

	return {
		scrollRef,
		rowVirtualizer,
	};
}
