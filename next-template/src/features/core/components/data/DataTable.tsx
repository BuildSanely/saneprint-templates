'use client';

import { CSSProperties, ReactNode } from 'react';

import { ArrowsDownUpIcon as ArrowsDownUp } from '@phosphor-icons/react/dist/csr/ArrowsDownUp';
import { CaretDownIcon as CaretDown } from '@phosphor-icons/react/dist/csr/CaretDown';
import { CaretUpIcon as CaretUp } from '@phosphor-icons/react/dist/csr/CaretUp';

import { useDataTableVirtualizer } from '@core/hooks/useDataTableVirtualizer';

import { cn } from '@utils/cn';

import { DataTableSkeleton } from './DataTableSkeleton';
import { Button } from '../form/Button';
import { UnstyledButton } from '../form/UnstyledButton';

type DataTableMode = 'pagination' | 'infinite';
type DataTableAlign = 'left' | 'center' | 'right';

export interface DataTableColumn<TData> {
	id: string;
	header: ReactNode;
	width?: string;
	align?: DataTableAlign;
	accessor?: keyof TData;
	sortable?: boolean;
	sortAccessor?: keyof TData | ((row: TData) => string | number | null);
	cell?: (row: TData, rowIndex: number) => ReactNode;
}

export interface DataTableSortState {
	columnId: string;
	direction: 'asc' | 'desc';
}

export interface DataTableProps<TData> {
	columns: DataTableColumn<TData>[];
	data: TData[];
	rowKey: (row: TData, rowIndex: number) => string;
	height?: number;
	estimateRowHeight?: number;
	mode?: DataTableMode;
	loading?: boolean;
	emptyState?: ReactNode;
	className?: string;
	hasMore?: boolean;
	isFetchingMore?: boolean;
	onLoadMore?: () => void;
	currentPage?: number;
	totalPages?: number;
	onPageChange?: (nextPage: number) => void;
	sortState?: DataTableSortState | null;
	onSortChange?: (nextSortState: DataTableSortState | null) => void;
}

function getAlignmentClass(align: DataTableAlign = 'left') {
	if (align === 'center') {
		return 'text-center justify-center';
	}

	if (align === 'right') {
		return 'text-right justify-end';
	}

	return 'text-left justify-start';
}

export function DataTable<TData>({
	columns,
	className,
	currentPage = 1,
	data,
	emptyState = 'No rows available.',
	estimateRowHeight = 56,
	hasMore = false,
	height = 360,
	isFetchingMore = false,
	loading = false,
	mode = 'pagination',
	onLoadMore,
	onPageChange,
	rowKey,
	sortState = null,
	onSortChange,
	totalPages = 1,
}: DataTableProps<TData>) {
	const gridTemplateColumns = columns
		.map((column) => column.width ?? 'minmax(0, 1fr)')
		.join(' ');
	const columnsWithIndex = columns.map((column, index) => ({
		...column,
		colIndex: index + 1,
	}));
	const ariaRowCount = mode === 'infinite' && hasMore ? -1 : data.length;
	const { rowVirtualizer, scrollRef } = useDataTableVirtualizer({
		count: data.length,
		estimateRowHeight,
		hasMore,
		isFetchingMore,
		mode,
		onLoadMore,
	});
	const virtualRows = rowVirtualizer.getVirtualItems();
	const shouldShowEmpty = data.length === 0;
	const contentHeight = shouldShowEmpty ? height : rowVirtualizer.getTotalSize();

	return (
		<div className={cn('flex flex-col gap-2', className)}>
			<div
				role='table'
				aria-colcount={columns.length}
				aria-rowcount={ariaRowCount}
				className='border-border bg-surface overflow-hidden rounded-xl border shadow-sm'
			>
				<div
					role='rowgroup'
					className='border-border bg-background grid min-h-12 items-center gap-2 border-b px-4 py-2'
					style={{ gridTemplateColumns }}
				>
					{columnsWithIndex.map((column) => (
						<div
							key={column.id}
							role='columnheader'
							aria-colindex={column.colIndex}
							aria-sort={
								column.sortable && sortState?.columnId === column.id
									? sortState.direction === 'asc'
										? 'ascending'
										: 'descending'
									: column.sortable
										? 'none'
										: undefined
							}
							className={cn('label text-muted', getAlignmentClass(column.align))}
						>
							{column.sortable && onSortChange ? (
								<UnstyledButton
									type='button'
									className='inline-flex items-center gap-1 transition-opacity hover:opacity-80'
									onClick={() => {
										const nextSortState =
											sortState?.columnId === column.id
												? sortState.direction === 'asc'
													? { columnId: column.id, direction: 'desc' as const }
													: null
												: { columnId: column.id, direction: 'asc' as const };

										onSortChange(nextSortState);
									}}
								>
									<span>{column.header}</span>
									{sortState?.columnId === column.id ? (
										sortState.direction === 'asc' ? (
											<CaretUp aria-hidden='true' size={14} weight='bold' />
										) : (
											<CaretDown aria-hidden='true' size={14} weight='bold' />
										)
									) : (
										<ArrowsDownUp aria-hidden='true' size={14} weight='bold' />
									)}
								</UnstyledButton>
							) : (
								column.header
							)}
						</div>
					))}
				</div>
				<div ref={scrollRef} role='rowgroup' className='overflow-auto' style={{ height }}>
					{loading ? (
						<DataTableSkeleton
							columnCount={columns.length}
							gridTemplateColumns={gridTemplateColumns}
							rowCount={Math.max(6, Math.floor(height / estimateRowHeight))}
						/>
					) : shouldShowEmpty ? (
						<div
							role='row'
							className='body text-muted flex h-full items-center justify-center px-6 py-16'
						>
							{emptyState}
						</div>
					) : (
						<div
							className='relative'
							style={{ height: contentHeight, width: '100%' } as CSSProperties}
						>
							{virtualRows.map((virtualRow) => {
								const row = data[virtualRow.index];

								return (
									<div
										key={rowKey(row, virtualRow.index)}
										role='row'
										aria-rowindex={virtualRow.index + 2}
										className='border-border/70 absolute top-0 left-0 grid min-h-14 w-full items-center gap-2 border-b px-4 py-2'
										style={{
											gridTemplateColumns,
											transform: `translateY(${virtualRow.start}px)`,
										}}
									>
										{columnsWithIndex.map((column) => {
											const content = column.cell
												? column.cell(row, virtualRow.index)
												: column.accessor
													? (row[column.accessor] as ReactNode)
													: null;

											return (
												<div
													key={column.id}
													role='cell'
													aria-colindex={column.colIndex}
													className={cn(
														'body text-foreground',
														getAlignmentClass(column.align),
													)}
												>
													{content}
												</div>
											);
										})}
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
			{mode === 'infinite' ? (
				<div className='flex items-center justify-between gap-2 px-1'>
					<p className='body-sm text-muted'>
						{hasMore ? 'Scroll to load more rows.' : 'All rows loaded.'}
					</p>
					{isFetchingMore ? <p className='body-sm text-muted'>Loading more...</p> : null}
				</div>
			) : totalPages > 1 && onPageChange ? (
				<div className='flex items-center justify-between gap-2 px-1'>
					<p className='body-sm text-muted'>
						Page {currentPage} of {totalPages}
					</p>
					<div className='flex gap-2'>
						<Button
							type='button'
							size='sm'
							variant='ghost'
							intent='secondary'
							disabled={currentPage <= 1}
							onClick={() => onPageChange(currentPage - 1)}
						>
							Previous
						</Button>
						<Button
							type='button'
							size='sm'
							variant='ghost'
							intent='secondary'
							disabled={currentPage >= totalPages}
							onClick={() => onPageChange(currentPage + 1)}
						>
							Next
						</Button>
					</div>
				</div>
			) : null}
		</div>
	);
}
