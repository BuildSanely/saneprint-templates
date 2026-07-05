import { AnchorHTMLAttributes, ReactNode, forwardRef } from 'react';

import Link, { LinkProps } from 'next/link';

import { cn } from '@utils/cn';

import { ButtonIntent, buttonClassName } from './Button';

type LinkButtonProps = LinkProps &
	Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href'> & {
		children?: ReactNode;
		intent?: ButtonIntent;
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
