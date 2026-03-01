import type { DataTableColumn } from '@core';
import type { ProjectRecord } from '../services/getProjects';

export const projectColumns: DataTableColumn<ProjectRecord>[] = [
	{
		id: 'name',
		header: 'Project',
		accessor: 'name',
		width: 'minmax(14rem, 2fr)',
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
