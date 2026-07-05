'use client';

import { startTransition, useMemo, useState } from 'react';

import { DataTable, DataTableColumn, DataTableSortState } from './DataTable';
import { sortRows } from './sortRows';
import { Select } from '../form/Select';

interface ProjectRow {
	id: string;
	name: string;
	owner: string;
	status: string;
	visitors: number;
}

const ALL_PROJECTS: ProjectRow[] = Array.from({ length: 120 }, (_, index) => ({
	id: `project-${index + 1}`,
	name: `Project ${index + 1}`,
	owner: index % 2 === 0 ? 'Karishma' : 'Product Team',
	status: index % 3 === 0 ? 'Active' : index % 3 === 1 ? 'Draft' : 'Paused',
	visitors: 1200 + index * 17,
}));

const columns: DataTableColumn<ProjectRow>[] = [
	{
		id: 'name',
		header: 'Project',
		accessor: 'name',
		width: 'minmax(12rem, 2fr)',
		sortable: true,
	},
	{
		id: 'owner',
		header: 'Owner',
		accessor: 'owner',
		width: 'minmax(10rem, 1.2fr)',
		sortable: true,
	},
	{
		id: 'status',
		header: 'Status',
		accessor: 'status',
		width: 'minmax(8rem, 1fr)',
		sortable: true,
	},
	{
		id: 'visitors',
		header: 'Visitors',
		accessor: 'visitors',
		align: 'right',
		width: 'minmax(8rem, 1fr)',
		sortable: true,
		cell: (row) => row.visitors.toLocaleString(),
	},
];

const PAGE_SIZE = 12;

export function DataTableShowcase() {
	const [page, setPage] = useState(1);
	const [sortState, setSortState] = useState<DataTableSortState | null>({
		columnId: 'name',
		direction: 'asc',
	});
	const [statusFilter, setStatusFilter] = useState('all');
	const [infiniteCount, setInfiniteCount] = useState(24);
	const [isFetchingMore, setIsFetchingMore] = useState(false);
	const filteredRows = useMemo(
		() =>
			statusFilter === 'all'
				? ALL_PROJECTS
				: ALL_PROJECTS.filter((row) => row.status === statusFilter),
		[statusFilter],
	);
	const sortedRows = useMemo(
		() => sortRows(filteredRows, columns, sortState),
		[filteredRows, sortState],
	);
	const paginatedRows = useMemo(
		() => sortedRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
		[page, sortedRows],
	);
	const infiniteRows = useMemo(
		() => sortedRows.slice(0, infiniteCount),
		[infiniteCount, sortedRows],
	);
	const totalPages = Math.max(1, Math.ceil(sortedRows.length / PAGE_SIZE));
	const hasMore = infiniteCount < sortedRows.length;

	function handleLoadMore() {
		if (!hasMore || isFetchingMore) {
			return;
		}

		setIsFetchingMore(true);
		window.setTimeout(() => {
			startTransition(() => {
				setInfiniteCount((currentCount) =>
					Math.min(currentCount + 18, ALL_PROJECTS.length),
				);
				setIsFetchingMore(false);
			});
		}, 500);
	}

	return (
		<div className='grid gap-8'>
			<div className='grid gap-2'>
				<div className='space-y-1'>
					<p className='label text-foreground'>Pagination mode</p>
					<p className='body-sm text-muted'>
						Use this for admin views with stable page counts and explicit navigation.
					</p>
				</div>
				<div className='ms-auto'>
					<Select
						label='Status filter'
						options={[
							{ label: 'All statuses', value: 'all' },
							{ label: 'Active', value: 'Active' },
							{ label: 'Draft', value: 'Draft' },
							{ label: 'Paused', value: 'Paused' },
						]}
						value={statusFilter}
						onValueChange={(nextValue) => {
							setStatusFilter(nextValue);
							setPage(1);
							setInfiniteCount(24);
						}}
					/>
				</div>
				<DataTable
					columns={columns}
					data={paginatedRows}
					rowKey={(row) => row.id}
					mode='pagination'
					currentPage={page}
					totalPages={totalPages}
					onPageChange={setPage}
					sortState={sortState}
					onSortChange={setSortState}
				/>
			</div>
			<hr className='border-border/50 my-6' />
			<div className='grid gap-2'>
				<div className='space-y-1'>
					<p className='label text-foreground'>Infinite mode</p>
					<p className='body-sm text-muted'>
						Use this for dense operational feeds backed by incremental fetching.
					</p>
				</div>
				<DataTable
					columns={columns}
					data={infiniteRows}
					rowKey={(row) => row.id}
					mode='infinite'
					hasMore={hasMore}
					isFetchingMore={isFetchingMore}
					onLoadMore={handleLoadMore}
					sortState={sortState}
					onSortChange={setSortState}
				/>
			</div>
		</div>
	);
}
