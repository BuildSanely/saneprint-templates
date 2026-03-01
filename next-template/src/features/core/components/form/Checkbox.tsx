import { ComponentPropsWithoutRef, ReactNode, forwardRef, useId } from 'react';
import { cn } from '@utils/cn';

export interface CheckboxProps extends Omit<
	ComponentPropsWithoutRef<'input'>,
	'size' | 'type'
> {
	label?: ReactNode;
	description?: ReactNode;
	errorMessage?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
	{ className, description, errorMessage, id, label, ...props },
	ref,
) {
	const generatedId = useId();
	const inputId = id ?? generatedId;
	const descriptionId = description ? `${inputId}-description` : undefined;
	const errorId = errorMessage ? `${inputId}-error` : undefined;
	const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;
	const hasError = Boolean(errorMessage);

	return (
		<div className={cn('flex w-full flex-col gap-1', className)}>
			<label
				htmlFor={inputId}
				className='flex cursor-pointer items-start gap-2 rounded-md'
			>
				<span className='relative mt-0.5 flex shrink-0'>
					<input
						{...props}
						ref={ref}
						id={inputId}
						type='checkbox'
						aria-invalid={hasError || undefined}
						aria-describedby={describedBy}
						className='peer sr-only'
					/>
					<span
						aria-hidden='true'
						className={cn(
							'bg-background flex min-h-5 w-5 items-center justify-center rounded-sm border text-transparent transition-colors',
							hasError ? 'border-danger' : 'border-border',
							'peer-focus-visible:ring-brand/20 peer-focus-visible:ring-offset-background peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2',
							'peer-checked:border-brand peer-checked:bg-brand peer-checked:text-on-brand',
							'peer-disabled:cursor-not-allowed peer-disabled:opacity-60',
						)}
					>
						<span className='label-sm leading-none'>✓</span>
					</span>
				</span>
				<span className='flex flex-col gap-0.5'>
					{label ? <span className='label text-foreground'>{label}</span> : null}
					{description ? (
						<span id={descriptionId} className='body-sm text-muted'>
							{description}
						</span>
					) : null}
				</span>
			</label>
			{errorMessage ? (
				<p id={errorId} className='body-sm text-danger'>
					{errorMessage}
				</p>
			) : null}
		</div>
	);
});
