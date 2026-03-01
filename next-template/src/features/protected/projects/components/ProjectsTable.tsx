'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import { DataTable, DataTableSortState, SearchBar, Select, sortRows } from '@core';
import { projectColumns } from '../table-columns/project-listing-columns';
import { useProjects } from '../hooks/useProjects';

const PAGE_SIZE = 12;

interface ProjectsTableProps {
	searchLabel?: string;
	searchPlaceholder?: string;
}

export function ProjectsTable({
	searchLabel = 'Search projects',
	searchPlaceholder = 'Search by project, owner, or status',
}: ProjectsTableProps) {
	const [page, setPage] = useState(1);
	const [query, setQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [sortState, setSortState] = useState<DataTableSortState | null>({
		columnId: 'visitors',
		direction: 'desc',
	});
	const deferredQuery = useDeferredValue(query);
	const projectsQuery = useProjects();

	const filteredRows = useMemo(() => {
		const rows = projectsQuery.data ?? [];
		const normalizedQuery = deferredQuery.trim().toLowerCase();

		return rows.filter(
			(row) =>
				(statusFilter === 'all' || row.status === statusFilter) &&
				(!normalizedQuery ||
					[row.name, row.owner, row.status].some((value) =>
						value.toLowerCase().includes(normalizedQuery),
					)),
		);
	}, [deferredQuery, projectsQuery.data, statusFilter]);

	const sortedRows = useMemo(
		() => sortRows(filteredRows, projectColumns, sortState),
		[filteredRows, sortState],
	);

	const totalPages = Math.max(1, Math.ceil(sortedRows.length / PAGE_SIZE));
	const currentPage = Math.min(page, totalPages);
	const paginatedRows = sortedRows.slice(
		(currentPage - 1) * PAGE_SIZE,
		currentPage * PAGE_SIZE,
	);

	function handleQueryChange(nextQuery: string) {
		setQuery(nextQuery);
		setPage(1);
	}

	function handleStatusFilterChange(nextStatus: string) {
		setStatusFilter(nextStatus);
		setPage(1);
	}

	return (
		<div className='grid gap-6'>
			<div className='grid gap-2 md:grid-cols-[minmax(0,1fr)_14rem]'>
				<SearchBar
					label={searchLabel}
					placeholder={searchPlaceholder}
					value={query}
					onChange={handleQueryChange}
					onSearch={handleQueryChange}
				/>
				<Select
					label='Status filter'
					options={[
						{ label: 'All statuses', value: 'all' },
						{ label: 'Active', value: 'Active' },
						{ label: 'Draft', value: 'Draft' },
						{ label: 'Paused', value: 'Paused' },
					]}
					value={statusFilter}
					onValueChange={handleStatusFilterChange}
				/>
			</div>
			<DataTable
				columns={projectColumns}
				data={paginatedRows}
				rowKey={(row) => row.id}
				mode='pagination'
				loading={projectsQuery.isLoading}
				emptyState='No projects match the current filter.'
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setPage}
				sortState={sortState}
				onSortChange={setSortState}
			/>
		</div>
	);
}
