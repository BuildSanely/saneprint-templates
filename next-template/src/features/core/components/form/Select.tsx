'use client';

import { CaretDown, Check } from '@phosphor-icons/react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { CSSProperties, ReactNode, forwardRef, useId } from 'react';
import { cn } from '@utils/cn';

type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
	label: string;
	value: string;
	disabled?: boolean;
}

export interface SelectProps {
	label?: ReactNode;
	description?: ReactNode;
	errorMessage?: ReactNode;
	size?: SelectSize;
	options: SelectOption[];
	placeholder?: string;
	selectClassName?: string;
	className?: string;
	id?: string;
	name?: string;
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	disabled?: boolean;
	required?: boolean;
	style?: CSSProperties;
}

const sizeClasses: Record<SelectSize, string> = {
	sm: 'min-h-9 px-2 py-1 body-sm',
	md: 'min-h-11 px-4 py-2 body',
	lg: 'min-h-12 px-6 py-2 body',
};

export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
	{
		className,
		defaultValue,
		description,
		disabled = false,
		errorMessage,
		id,
		label,
		name,
		onValueChange,
		options,
		placeholder,
		required = false,
		selectClassName,
		size = 'md',
		style: styleProp,
		value,
	},
	ref,
) {
	const generatedId = useId();
	const selectId = id ?? generatedId;
	const descriptionId = description ? `${selectId}-description` : undefined;
	const errorId = errorMessage ? `${selectId}-error` : undefined;
	const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;
	const hasError = Boolean(errorMessage);
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
				<label htmlFor={selectId} className='label text-foreground'>
					{label}
				</label>
			) : null}
			<div className='relative'>
				<SelectPrimitive.Root
					name={name}
					value={value}
					defaultValue={defaultValue}
					onValueChange={onValueChange}
					disabled={disabled}
					required={required}
				>
					<SelectPrimitive.Trigger
						ref={ref}
						id={selectId}
						aria-invalid={hasError || undefined}
						aria-describedby={describedBy}
						className={cn(
							'input flex w-full items-center justify-between gap-2 text-left',
							sizeClasses[size],
							selectClassName,
						)}
						style={style}
					>
						<SelectPrimitive.Value placeholder={placeholder} />
						<SelectPrimitive.Icon className='text-muted shrink-0'>
							<CaretDown aria-hidden='true' size={16} weight='bold' />
						</SelectPrimitive.Icon>
					</SelectPrimitive.Trigger>
					<SelectPrimitive.Portal>
						<SelectPrimitive.Content
							position='popper'
							sideOffset={8}
							className='border-border bg-surface z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border shadow-lg'
						>
							<SelectPrimitive.Viewport className='p-1'>
								{options.map((option) => (
									<SelectPrimitive.Item
										key={option.value}
										value={option.value}
										disabled={option.disabled}
										className='body text-foreground data-[highlighted]:bg-background relative flex min-h-10 cursor-pointer items-center rounded-md px-4 py-2 transition-colors outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
									>
										<SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
										<SelectPrimitive.ItemIndicator className='text-brand absolute right-4'>
											<Check aria-hidden='true' size={16} weight='bold' />
										</SelectPrimitive.ItemIndicator>
									</SelectPrimitive.Item>
								))}
							</SelectPrimitive.Viewport>
						</SelectPrimitive.Content>
					</SelectPrimitive.Portal>
				</SelectPrimitive.Root>
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
