'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ReactNode } from 'react';
import { cn } from '@utils/cn';

export interface DropdownMenuItem {
	label: ReactNode;
	onSelect?: () => void;
	shortcut?: ReactNode;
	disabled?: boolean;
	tone?: 'default' | 'danger';
}

export interface DropdownMenuProps {
	trigger: ReactNode;
	items: DropdownMenuItem[];
	label?: string;
	align?: 'start' | 'center' | 'end';
	sideOffset?: number;
	contentClassName?: string;
}

export function DropdownMenu({
	align = 'end',
	contentClassName,
	items,
	label,
	sideOffset = 8,
	trigger,
}: DropdownMenuProps) {
	return (
		<DropdownMenuPrimitive.Root>
			<DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>
			<DropdownMenuPrimitive.Portal>
				<DropdownMenuPrimitive.Content
					align={align}
					sideOffset={sideOffset}
					aria-label={label}
					className={cn(
						'border-border bg-surface z-50 min-w-52 rounded-xl border p-1 shadow-lg outline-none',
						contentClassName,
					)}
				>
					{items.map((item, index) => (
						<DropdownMenuPrimitive.Item
							key={
								typeof item.label === 'string'
									? item.label
									: `${index}-${String(item.shortcut ?? 'menu-item')}`
							}
							disabled={item.disabled}
							onSelect={item.onSelect}
							className={cn(
								'body data-[highlighted]:bg-background flex min-h-10 cursor-pointer items-center justify-between gap-6 rounded-md px-4 py-2 transition-colors outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
								item.tone === 'danger' ? 'text-danger' : 'text-foreground',
							)}
						>
							<span>{item.label}</span>
							{item.shortcut ? (
								<span className='label-sm text-muted'>{item.shortcut}</span>
							) : null}
						</DropdownMenuPrimitive.Item>
					))}
				</DropdownMenuPrimitive.Content>
			</DropdownMenuPrimitive.Portal>
		</DropdownMenuPrimitive.Root>
	);
}
