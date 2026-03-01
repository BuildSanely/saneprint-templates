'use client';

import * as Popover from '@radix-ui/react-popover';
import { ReactNode } from 'react';
import { cn } from '@utils/cn';

export interface PopoverCardProps {
	trigger: ReactNode;
	children: ReactNode;
	title?: ReactNode;
	description?: ReactNode;
	align?: 'start' | 'center' | 'end';
	sideOffset?: number;
	className?: string;
	contentClassName?: string;
}

export function PopoverCard({
	align = 'center',
	children,
	className,
	contentClassName,
	description,
	sideOffset = 8,
	title,
	trigger,
}: PopoverCardProps) {
	return (
		<Popover.Root>
			<Popover.Trigger asChild>{trigger}</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					align={align}
					sideOffset={sideOffset}
					className={cn(
						'border-border bg-surface z-50 w-80 max-w-[calc(100vw-2rem)] rounded-xl border p-6 shadow-lg outline-none',
						contentClassName,
					)}
				>
					<div className={cn('flex flex-col gap-4', className)}>
						{title || description ? (
							<div className='flex flex-col gap-1'>
								{title ? <h3 className='heading-6 text-foreground'>{title}</h3> : null}
								{description ? <p className='body-sm text-muted'>{description}</p> : null}
							</div>
						) : null}
						<div>{children}</div>
					</div>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
