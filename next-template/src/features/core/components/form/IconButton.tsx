'use client';

import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

import { cn } from '@utils/cn';

import { UnstyledButton } from './UnstyledButton';

type IconButtonSize = 'sm' | 'md';

export interface IconButtonProps extends Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	'children'
> {
	icon: ReactNode;
	size?: IconButtonSize;
}

const sizeClasses: Record<IconButtonSize, string> = {
	sm: 'h-6 w-6',
	md: 'h-8 w-8',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	function IconButton({ className, icon, size = 'md', type = 'button', ...props }, ref) {
		return (
			<UnstyledButton
				{...props}
				ref={ref}
				type={type}
				className={cn(
					'border-border/50 bg-surface text-muted hover:text-foreground hover:bg-background inline-flex items-center justify-center rounded-full border shadow-sm backdrop-blur-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50',
					sizeClasses[size],
					className,
				)}
			>
				{icon}
			</UnstyledButton>
		);
	},
);
