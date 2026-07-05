'use client';

import { ReactNode } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { cn } from '@utils/cn';

import { Button } from '../form/Button';

export interface ModalProps {
	trigger: ReactNode;
	children: ReactNode;
	title: ReactNode;
	description?: ReactNode;
	footer?: ReactNode;
	className?: string;
	contentClassName?: string;
}

export function Modal({
	children,
	className,
	contentClassName,
	description,
	footer,
	title,
	trigger,
}: ModalProps) {
	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className='bg-neutral-1000/50 fixed inset-0 z-50 backdrop-blur-sm' />
				<Dialog.Content
					className={cn(
						'border-border bg-surface fixed top-1/2 left-1/2 z-50 flex w-[min(32rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-2xl border p-12 shadow-xl outline-none',
						contentClassName,
					)}
				>
					<div className={cn('flex flex-col gap-6', className)}>
						<div className='flex items-start justify-between gap-4'>
							<div className='flex flex-col gap-1'>
								<Dialog.Title className='heading-5 text-foreground'>{title}</Dialog.Title>
								{description ? (
									<Dialog.Description className='body text-muted'>
										{description}
									</Dialog.Description>
								) : null}
							</div>
							<Dialog.Close asChild>
								<Button
									type='button'
									variant='ghost'
									intent='secondary'
									size='sm'
									className='min-h-8 px-2 py-1'
									aria-label='Close modal'
								>
									✕
								</Button>
							</Dialog.Close>
						</div>
						<div>{children}</div>
						{footer ? (
							<div className='flex flex-wrap justify-end gap-2'>{footer}</div>
						) : null}
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
