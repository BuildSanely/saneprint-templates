import {
	ComponentPropsWithoutRef,
	CSSProperties,
	ReactNode,
	forwardRef,
	useId,
} from 'react';
import { LoadingIndicator } from '@core/components/feedback/LoadingIndicator';
import { cn } from '@utils/cn';

type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
	label?: ReactNode;
	description?: ReactNode;
	errorMessage?: ReactNode;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	loading?: boolean;
	size?: InputSize;
	inputClassName?: string;
}

const sizeClasses: Record<InputSize, string> = {
	sm: 'min-h-9 px-2 py-1 body-sm',
	md: 'min-h-11 px-4 py-2 body',
	lg: 'min-h-12 px-6 py-2 body',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{
		className,
		description,
		errorMessage,
		id,
		inputClassName,
		leftIcon,
		loading = false,
		label,
		rightIcon,
		size = 'md',
		style: styleProp,
		type = 'text',
		...props
	},
	ref,
) {
	const generatedId = useId();
	const inputId = id ?? generatedId;
	const descriptionId = description ? `${inputId}-description` : undefined;
	const errorId = errorMessage ? `${inputId}-error` : undefined;
	const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;
	const hasError = Boolean(errorMessage);
	const slotEnd = loading ? (
		<LoadingIndicator
			label='Loading input'
			size='1rem'
			thickness='0.125rem'
			className='text-muted'
		/>
	) : (
		rightIcon
	);
	const style = {
		...(hasError
			? {
					'--color-input-border': 'var(--color-danger)',
					'--color-focus-ring': 'var(--color-danger)',
				}
			: {}),
		...styleProp,
	} as CSSProperties;

	return (
		<div className={cn('flex w-full flex-col gap-1', className)}>
			{label ? (
				<label htmlFor={inputId} className='label text-foreground'>
					{label}
				</label>
			) : null}
			<div className='relative'>
				{leftIcon ? (
					<span className='text-muted pointer-events-none absolute inset-y-0 left-4 flex items-center'>
						{leftIcon}
					</span>
				) : null}
				<input
					{...props}
					ref={ref}
					id={inputId}
					type={type}
					aria-invalid={hasError || undefined}
					aria-describedby={describedBy}
					className={cn(
						'input w-full',
						sizeClasses[size],
						Boolean(leftIcon) && 'pl-16',
						Boolean(slotEnd) && 'pr-16',
						inputClassName,
					)}
					style={style}
				/>
				{slotEnd ? (
					<span className='text-muted pointer-events-none absolute inset-y-0 right-4 flex items-center'>
						{slotEnd}
					</span>
				) : null}
			</div>
			{errorMessage ? (
				<p id={errorId} className='body-sm text-danger'>
					{errorMessage}
				</p>
			) : description ? (
				<p id={descriptionId} className='body-sm text-muted'>
					{description}
				</p>
			) : null}
		</div>
	);
});
