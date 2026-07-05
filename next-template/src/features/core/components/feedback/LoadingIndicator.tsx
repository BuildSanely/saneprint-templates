import { CSSProperties } from 'react';

import { cn } from '@utils/cn';

interface LoadingIndicatorProps {
	className?: string;
	label?: string;
	size?: string;
	thickness?: string;
}

export function LoadingIndicator({
	className,
	label = 'Loading',
	size = '1em',
	thickness = '2px',
}: LoadingIndicatorProps) {
	const style = {
		width: size,
		height: size,
		borderWidth: thickness,
		borderColor: 'currentColor',
		borderBottomColor: 'transparent',
	} as CSSProperties;

	return (
		<span
			role='status'
			aria-label={label}
			className={cn('loader shrink-0', className)}
			style={style}
		/>
	);
}
