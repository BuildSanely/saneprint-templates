'use client';

import { CaretDown, Check } from '@phosphor-icons/react';
import * as Popover from '@radix-ui/react-popover';
import { ReactNode, useId, useState } from 'react';
import { Button } from './Button';
import { SearchBar } from './SearchBar';
import { UnstyledButton } from './UnstyledButton';
import { cn } from '@utils/cn';

export interface MultiSelectOption {
	label: string;
	value: string;
	description?: ReactNode;
	disabled?: boolean;
}

export interface MultiSelectProps {
	label?: ReactNode;
	description?: ReactNode;
	errorMessage?: ReactNode;
	options: MultiSelectOption[];
	value?: string[];
	defaultValue?: string[];
	onValueChange?: (value: string[]) => void;
	placeholder?: string;
	searchPlaceholder?: string;
	emptyStateMessage?: string;
	className?: string;
	disabled?: boolean;
	searchable?: boolean;
	maxPreviewItems?: number;
}

function getVisibleLabels(
	options: MultiSelectOption[],
	selectedValues: string[],
	maxPreviewItems: number,
) {
	const labels = options
		.filter((option) => selectedValues.includes(option.value))
		.map((option) => option.label);

	if (labels.length <= maxPreviewItems) {
		return labels;
	}

	return [...labels.slice(0, maxPreviewItems), `+${labels.length - maxPreviewItems}`];
}

export function MultiSelect({
	className,
	defaultValue = [],
	description,
	disabled = false,
	emptyStateMessage = 'No options match your search.',
	errorMessage,
	label,
	maxPreviewItems = 2,
	onValueChange,
	options,
	placeholder = 'Select options',
	searchPlaceholder = 'Search options',
	searchable = true,
	value,
}: MultiSelectProps) {
	const generatedId = useId();
	const descriptionId = description ? `${generatedId}-description` : undefined;
	const errorId = errorMessage ? `${generatedId}-error` : undefined;
	const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;
	const hasError = Boolean(errorMessage);
	const isControlled = Array.isArray(value);
	const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
	const [query, setQuery] = useState('');
	const selectedValues = isControlled ? value : internalValue;
	const visibleLabels = getVisibleLabels(options, selectedValues, maxPreviewItems);
	const filteredOptions = options.filter((option) => {
		const normalizedQuery = query.trim().toLowerCase();

		if (!normalizedQuery) {
			return true;
		}

		return (
			option.label.toLowerCase().includes(normalizedQuery) ||
			(typeof option.description === 'string' &&
				option.description.toLowerCase().includes(normalizedQuery))
		);
	});

	function updateValue(nextValue: string[]) {
		if (!isControlled) {
			setInternalValue(nextValue);
		}

		onValueChange?.(nextValue);
	}

	function toggleOption(nextValue: string) {
		const isSelected = selectedValues.includes(nextValue);
		const updatedValue = isSelected
			? selectedValues.filter((valueItem) => valueItem !== nextValue)
			: [...selectedValues, nextValue];

		updateValue(updatedValue);
	}

	return (
		<div className={cn('flex w-full flex-col gap-1', className)}>
			{label ? <p className='label text-foreground'>{label}</p> : null}
			<Popover.Root>
				<Popover.Trigger asChild>
					<UnstyledButton
						type='button'
						disabled={disabled}
						aria-describedby={describedBy}
						className={cn(
							'input flex min-h-11 w-full items-center justify-between gap-2 px-4 py-2 text-left',
							hasError && 'border-danger',
							disabled && 'cursor-not-allowed opacity-60',
						)}
						>
							<span className='flex min-w-0 flex-1 flex-wrap items-center gap-1'>
							{visibleLabels.length ? (
								visibleLabels.map((item) => (
									<span
										key={item}
										className='bg-background label-sm text-foreground inline-flex items-center rounded-full px-2 py-0.5'
									>
										{item}
									</span>
								))
							) : (
								<span className='body text-muted'>{placeholder}</span>
							)}
						</span>
						<CaretDown
							aria-hidden='true'
							className='text-muted shrink-0'
							size={16}
							weight='bold'
						/>
					</UnstyledButton>
				</Popover.Trigger>
				<Popover.Portal>
					<Popover.Content
						align='start'
						sideOffset={8}
						className='border-border bg-surface z-50 w-[var(--radix-popover-trigger-width)] min-w-64 rounded-lg border p-2 shadow-lg'
					>
						<div className='flex flex-col gap-2'>
							{searchable ? (
								<SearchBar
									placeholder={searchPlaceholder}
									value={query}
									onChange={setQuery}
									debounceMs={150}
								/>
							) : null}
							<div className='flex flex-wrap gap-1'>
								{selectedValues.length ? (
									<Button
										type='button'
										variant='ghost'
										intent='secondary'
										size='sm'
										onClick={() => updateValue([])}
									>
										Clear all
									</Button>
								) : null}
							</div>
							<div className='max-h-64 overflow-y-auto'>
								{filteredOptions.length ? (
									<div className='flex flex-col gap-1'>
										{filteredOptions.map((option) => {
											const isSelected = selectedValues.includes(option.value);

											return (
												<UnstyledButton
													key={option.value}
													type='button'
													disabled={option.disabled}
													className='hover:bg-background flex w-full items-start gap-2 rounded-md px-4 py-2 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50'
													onClick={() => toggleOption(option.value)}
												>
													<span
														aria-hidden='true'
														className={cn(
															'mt-0.5 flex min-h-5 w-5 shrink-0 items-center justify-center rounded-sm border text-transparent transition-colors',
															isSelected
																? 'border-brand bg-brand text-on-brand'
																: 'border-border bg-background',
														)}
													>
														<Check aria-hidden='true' size={14} weight='bold' />
													</span>
													<span className='flex flex-col gap-0.5'>
														<span className='label text-foreground'>{option.label}</span>
														{option.description ? (
															<span className='body-sm text-muted'>
																{option.description}
															</span>
														) : null}
													</span>
												</UnstyledButton>
											);
										})}
									</div>
								) : (
									<p className='body-sm text-muted px-4 py-2'>{emptyStateMessage}</p>
								)}
							</div>
						</div>
					</Popover.Content>
				</Popover.Portal>
			</Popover.Root>
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
}
