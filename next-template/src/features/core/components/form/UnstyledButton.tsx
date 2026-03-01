'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@utils/cn';

export type UnstyledButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const UnstyledButton = forwardRef<HTMLButtonElement, UnstyledButtonProps>(
	function UnstyledButton({ className, type = 'button', ...props }, ref) {
		return (
			<button
				{...props}
				ref={ref}
				type={type}
				className={cn(className)}
			/>
		);
	},
);
