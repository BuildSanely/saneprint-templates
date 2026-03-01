import { DataTableColumn, DataTableSortState } from './DataTable';

type SortableValue = string | number | null;

function getSortableValue<TData>(
	row: TData,
	column: DataTableColumn<TData>,
): SortableValue {
	if (typeof column.sortAccessor === 'function') {
		return column.sortAccessor(row);
	}

	if (typeof column.sortAccessor === 'string') {
		return (row[column.sortAccessor] as SortableValue) ?? null;
	}

	if (column.accessor) {
		return (row[column.accessor] as SortableValue) ?? null;
	}

	return null;
}

function compareValues(leftValue: SortableValue, rightValue: SortableValue) {
	if (leftValue == null && rightValue == null) {
		return 0;
	}

	if (leftValue == null) {
		return 1;
	}

	if (rightValue == null) {
		return -1;
	}

	if (typeof leftValue === 'number' && typeof rightValue === 'number') {
		return leftValue - rightValue;
	}

	return String(leftValue).localeCompare(String(rightValue), undefined, {
		numeric: true,
		sensitivity: 'base',
	});
}

export function sortRows<TData>(
	rows: TData[],
	columns: DataTableColumn<TData>[],
	sortState?: DataTableSortState | null,
) {
	if (!sortState) {
		return rows;
	}

	const activeColumn = columns.find((column) => column.id === sortState.columnId);

	if (!activeColumn?.sortable) {
		return rows;
	}

	const directionFactor = sortState.direction === 'asc' ? 1 : -1;

	return [...rows].sort((leftRow, rightRow) => {
		const leftValue = getSortableValue(leftRow, activeColumn);
		const rightValue = getSortableValue(rightRow, activeColumn);

		return compareValues(leftValue, rightValue) * directionFactor;
	});
}
