import {
	ComponentPropsWithoutRef,
	CSSProperties,
	ReactNode,
	forwardRef,
	useId,
} from 'react';

import { cn } from '@utils/cn';

type TextAreaSize = 'sm' | 'md' | 'lg';

export interface TextAreaProps extends Omit<
	ComponentPropsWithoutRef<'textarea'>,
	'size'
> {
	label?: ReactNode;
	description?: ReactNode;
	errorMessage?: ReactNode;
	size?: TextAreaSize;
	textareaClassName?: string;
}

const sizeClasses: Record<TextAreaSize, string> = {
	sm: 'min-h-28 px-2 py-2 body-sm',
	md: 'min-h-32 px-4 py-2 body',
	lg: 'min-h-40 px-6 py-4 body',
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
	{
		className,
		description,
		errorMessage,
		id,
		label,
		size = 'md',
		style: styleProp,
		textareaClassName,
		...props
	},
	ref,
) {
	const generatedId = useId();
	const textAreaId = id ?? generatedId;
	const descriptionId = description ? `${textAreaId}-description` : undefined;
	const errorId = errorMessage ? `${textAreaId}-error` : undefined;
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
				<label htmlFor={textAreaId} className='label text-foreground'>
					{label}
				</label>
			) : null}
			<textarea
				{...props}
				ref={ref}
				id={textAreaId}
				aria-invalid={hasError || undefined}
				aria-describedby={describedBy}
				className={cn('input w-full resize-y', sizeClasses[size], textareaClassName)}
				style={style}
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
