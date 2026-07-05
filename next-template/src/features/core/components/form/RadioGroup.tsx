'use client';

import { InputHTMLAttributes, ReactNode, useId } from 'react';

import { cn } from '@utils/cn';

export interface RadioOption extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'type' | 'value'
> {
	value: string;
	label: ReactNode;
	description?: ReactNode;
}

export interface RadioGroupProps {
	name: string;
	label?: ReactNode;
	description?: ReactNode;
	errorMessage?: ReactNode;
	options: RadioOption[];
	value?: string;
	onChange?: (value: string) => void;
	className?: string;
	orientation?: 'vertical' | 'horizontal';
}

export function RadioGroup({
	className,
	description,
	errorMessage,
	label,
	name,
	onChange,
	options,
	orientation = 'vertical',
	value,
}: RadioGroupProps) {
	const groupId = useId();
	const descriptionId = description ? `${groupId}-description` : undefined;
	const errorId = errorMessage ? `${groupId}-error` : undefined;
	const hasError = Boolean(errorMessage);

	return (
		<fieldset className={cn('flex w-full flex-col gap-1', className)}>
			{label ? <legend className='label text-foreground'>{label}</legend> : null}
			{description ? (
				<p id={descriptionId} className='body-sm text-muted'>
					{description}
				</p>
			) : null}
			<div
				className={cn('gap-2', orientation === 'horizontal' ? 'flex flex-wrap' : 'grid')}
				aria-invalid={hasError || undefined}
				aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
			>
				{options.map((option) => (
					<label
						key={option.value}
						htmlFor={`${groupId}-${option.value}`}
						className='border-border bg-background hover:border-brand/50 flex cursor-pointer items-start gap-2 rounded-md border p-4 transition-colors'
					>
						<span className='relative mt-0.5 flex shrink-0'>
							<input
								{...option}
								id={`${groupId}-${option.value}`}
								type='radio'
								name={name}
								value={option.value}
								checked={value === option.value}
								onChange={() => onChange?.(option.value)}
								className='peer sr-only'
							/>
							<span
								aria-hidden='true'
								className={cn(
									'bg-background flex min-h-5 w-5 items-center justify-center rounded-full border transition-colors',
									hasError ? 'border-danger' : 'border-border',
									'peer-focus-visible:ring-brand/20 peer-focus-visible:ring-offset-background peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2',
									'peer-checked:border-brand',
									'peer-disabled:cursor-not-allowed peer-disabled:opacity-60',
								)}
							>
								<span className='bg-brand min-h-2.5 w-2.5 rounded-full opacity-0 transition-opacity peer-checked:opacity-100' />
							</span>
						</span>
						<span className='flex flex-col gap-0.5'>
							<span className='label text-foreground'>{option.label}</span>
							{option.description ? (
								<span className='body-sm text-muted'>{option.description}</span>
							) : null}
						</span>
					</label>
				))}
			</div>
			{errorMessage ? (
				<p id={errorId} className='body-sm text-danger'>
					{errorMessage}
				</p>
			) : null}
		</fieldset>
	);
}
