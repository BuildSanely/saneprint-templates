import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react';
import { LoadingIndicator } from '@core/components/feedback/LoadingIndicator';
import { cn } from '@utils/cn';

type ButtonIntent = 'primary' | 'secondary' | 'danger';
type ButtonVariant = 'filled' | 'outlined' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<
	ComponentPropsWithoutRef<'button'>,
	'children'
> {
	children: ReactNode;
	intent?: ButtonIntent;
	variant?: ButtonVariant;
	size?: ButtonSize;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	loading?: boolean;
	loadingText?: string;
	fullWidth?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
	sm: 'min-h-9 px-4 py-1 label-sm',
	md: 'min-h-11 px-6 py-2 label',
	lg: 'min-h-12 px-8 py-2 label',
};

export const buttonClassName = ({
	intent = 'primary',
	variant = 'filled',
	size = 'md',
	fullWidth = false,
	className,
}: Pick<ButtonProps, 'intent' | 'variant' | 'size' | 'fullWidth' | 'className'>) =>
	cn(
		'btn relative shrink-0 flex items-center justify-center rounded-lg transition-colors disabled:pointer-events-none disabled:opacity-50',
		`btn-${intent}-${variant}`,
		sizeClasses[size],
		fullWidth && 'w-full',
		className,
	);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
	{
		children,
		className,
		disabled,
		fullWidth = false,
		intent = 'primary',
		leftIcon,
		loading = false,
		loadingText,
		rightIcon,
		size = 'md',
		type = 'button',
		variant = 'filled',
		...props
	},
	ref,
) {
	const isDisabled = disabled || loading;
	const spinnerOnly = loading && !loadingText;
	const content = loading ? (loadingText ?? children) : children;

	return (
		<button
			{...props}
			ref={ref}
			type={type}
			disabled={isDisabled}
			aria-busy={loading || undefined}
			className={buttonClassName({
				intent,
				variant,
				size,
				fullWidth,
				className,
			})}
		>
			<span className='inline-flex items-center gap-2'>
				{loading ? <LoadingIndicator label='Loading button' /> : leftIcon}
				<span className={cn(spinnerOnly && 'sr-only')}>{content}</span>
				{!loading ? rightIcon : null}
			</span>
		</button>
	);
});
