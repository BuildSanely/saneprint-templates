'use client';

import { ReactNode, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { Modal } from './Modal';
import { Button } from '../form/Button';

type ConfirmIntent = 'primary' | 'danger';

export interface ConfirmDialogProps {
	trigger: ReactNode;
	title: ReactNode;
	description?: ReactNode;
	confirmLabel?: string;
	cancelLabel?: string;
	intent?: ConfirmIntent;
	children?: ReactNode;
	onConfirm?: () => void | Promise<void>;
}

export function ConfirmDialog({
	cancelLabel = 'Cancel',
	children,
	confirmLabel = 'Confirm',
	description,
	intent = 'primary',
	onConfirm,
	title,
	trigger,
}: ConfirmDialogProps) {
	const [isConfirming, setIsConfirming] = useState(false);

	async function handleConfirm() {
		if (!onConfirm) {
			return;
		}

		try {
			setIsConfirming(true);
			await onConfirm();
		} finally {
			setIsConfirming(false);
		}
	}

	return (
		<Modal
			trigger={trigger}
			title={title}
			description={description}
			footer={
				<>
					<Dialog.Close asChild>
						<Button variant='ghost' intent='secondary'>
							{cancelLabel}
						</Button>
					</Dialog.Close>
					<Button
						intent={intent}
						loading={isConfirming}
						loadingText={confirmLabel}
						onClick={handleConfirm}
					>
						{confirmLabel}
					</Button>
				</>
			}
		>
			{children ? (
				children
			) : (
				<p className='body text-muted'>
					Confirm this action to continue. This dialog is intended for destructive or
					irreversible workflows.
				</p>
			)}
		</Modal>
	);
}
