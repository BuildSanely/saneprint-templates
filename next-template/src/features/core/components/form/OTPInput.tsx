'use client';

import { OTPInput as BaseOTPInput } from 'input-otp';
import { ReactNode, forwardRef } from 'react';
import { cn } from '@utils/cn';

export interface OTPInputProps {
	value: string;
	onChange: (value: string) => void;
	length?: number;
	label?: ReactNode;
	description?: ReactNode;
	errorMessage?: ReactNode;
	disabled?: boolean;
	name?: string;
}

export const OTPInput = forwardRef<HTMLInputElement, OTPInputProps>(function OTPInput(
	{
		description,
		disabled = false,
		errorMessage,
		label,
		length = 6,
		name = 'otp',
		onChange,
		value,
	},
	ref,
) {
	const hasError = Boolean(errorMessage);
	const descriptionId = description ? `${name}-description` : undefined;
	const errorId = errorMessage ? `${name}-error` : undefined;

	return (
		<div className='flex w-full flex-col gap-1'>
			{label ? <p className='label text-foreground'>{label}</p> : null}
			<BaseOTPInput
				ref={ref}
				name={name}
				maxLength={length}
				value={value}
				onChange={onChange}
				disabled={disabled}
				pattern='^[0-9]+$'
				inputMode='numeric'
				autoComplete='one-time-code'
				aria-invalid={hasError || undefined}
				aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
				containerClassName='flex gap-2'
				render={({ slots }) => (
					<>
						{slots.map((slot, index) => (
							<div
								key={`${name}-${index}`}
								aria-label={`Digit ${index + 1}`}
								className={cn(
									'bg-background heading-6 text-foreground relative flex min-h-12 w-12 items-center justify-center rounded-md border text-center transition-colors',
									hasError ? 'border-danger' : 'border-border',
									slot.isActive && !hasError && 'border-brand ring-brand/20 ring-1',
									disabled && 'opacity-60',
								)}
							>
								<span className='leading-none'>
									{slot.char ?? slot.placeholderChar ?? ''}
								</span>
								{slot.hasFakeCaret ? (
									<span className='bg-foreground pointer-events-none absolute inset-y-2 left-1/2 w-0.5 -translate-x-1/2 rounded-full' />
								) : null}
							</div>
						))}
					</>
				)}
			/>
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
