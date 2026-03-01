import { Skeleton } from '../feedback/Skeleton';
import { cn } from '@utils/cn';

interface DataTableSkeletonProps {
	columnCount?: number;
	rowCount?: number;
	gridTemplateColumns?: string;
}

export function DataTableSkeleton({
	columnCount = 4,
	rowCount = 8,
	gridTemplateColumns,
}: DataTableSkeletonProps) {
	const gridTemplate = gridTemplateColumns ?? `repeat(${columnCount}, minmax(0, 1fr))`;

	return (
		<div className={cn('grid gap-2 p-4')}>
			{Array.from({ length: rowCount }, (_, rowIndex) => (
				<div
					key={rowIndex}
					className='border-border/70 grid min-h-14 items-center gap-2 rounded-lg border-b pb-2'
					style={{ gridTemplateColumns: gridTemplate }}
				>
					{Array.from({ length: columnCount }, (_, columnIndex) => (
						<Skeleton key={columnIndex} className='h-4 w-full max-w-32' />
					))}
				</div>
			))}
		</div>
	);
}
