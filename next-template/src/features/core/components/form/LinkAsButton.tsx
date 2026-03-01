import Link, { LinkProps } from 'next/link';
import { AnchorHTMLAttributes, ReactNode, forwardRef } from 'react';
import { buttonClassName } from './Button';
import { cn } from '@utils/cn';

type LinkButtonProps = LinkProps &
	Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href'> & {
		children?: ReactNode;
		intent?: 'primary' | 'secondary' | 'danger';
		variant?: 'filled' | 'outlined' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		leftIcon?: ReactNode;
		rightIcon?: ReactNode;
		fullWidth?: boolean;
	};

export const LinkAsButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
	function LinkAsButton(
		{
			children,
			className,
			fullWidth = false,
			intent = 'primary',
			leftIcon,
			rightIcon,
			size = 'md',
			variant = 'filled',
			title,
			...props
		},
		ref,
	) {
		return (
			<Link
				{...props}
				ref={ref}
				className={buttonClassName({
					intent,
					variant,
					size,
					fullWidth,
					className: cn(className),
				})}
			>
				{leftIcon}
				{title ? <span>{title}</span> : children}
				{rightIcon}
			</Link>
		);
	},
);
