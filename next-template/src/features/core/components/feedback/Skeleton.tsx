import { HTMLAttributes } from 'react';

import { cn } from '@utils/cn';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
	circle?: boolean;
}

export function Skeleton({ circle = false, className, ...props }: SkeletonProps) {
	return (
		<div
			{...props}
			aria-hidden='true'
			className={cn(
				'bg-border animate-pulse',
				circle ? 'rounded-full' : 'rounded-md',
				className,
			)}
		/>
	);
}
