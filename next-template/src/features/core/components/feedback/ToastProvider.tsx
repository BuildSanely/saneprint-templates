'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
	return (
		<Toaster
			position='top-right'
			richColors
			closeButton
			toastOptions={{
				classNames: {
					toast: 'border border-border bg-surface text-foreground shadow-lg',
					description: 'text-muted',
					actionButton: 'btn btn-primary-filled label min-h-9 px-4 py-1',
					cancelButton: 'btn btn-secondary-ghost label min-h-9 px-4 py-1',
				},
			}}
		/>
	);
}
