'use client';

import { ReactNode } from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@utils/cn';

export interface TooltipProps {
	trigger: ReactNode;
	content: ReactNode;
	side?: 'top' | 'right' | 'bottom' | 'left';
	sideOffset?: number;
	contentClassName?: string;
}

export function Tooltip({
	content,
	contentClassName,
	side = 'top',
	sideOffset = 8,
	trigger,
}: TooltipProps) {
	return (
		<TooltipPrimitive.Provider delayDuration={150}>
			<TooltipPrimitive.Root>
				<TooltipPrimitive.Trigger asChild>{trigger}</TooltipPrimitive.Trigger>
				<TooltipPrimitive.Portal>
					<TooltipPrimitive.Content
						side={side}
						sideOffset={sideOffset}
						className={cn(
							'bg-neutral-1000 body-sm text-neutral-0 z-50 max-w-64 rounded-md px-2 py-1 shadow-lg',
							contentClassName,
						)}
					>
						{content}
						<TooltipPrimitive.Arrow className='fill-neutral-1000' />
					</TooltipPrimitive.Content>
				</TooltipPrimitive.Portal>
			</TooltipPrimitive.Root>
		</TooltipPrimitive.Provider>
	);
}
