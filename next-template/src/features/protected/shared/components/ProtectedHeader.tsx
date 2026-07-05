'use client';

import { UserIcon as User } from '@phosphor-icons/react/dist/csr/User';

import { useAuth } from '@auth';

export function ProtectedHeader() {
	const { isAuthenticated, user } = useAuth();

	return (
		<header className='border-border/50 bg-surface sticky top-0 flex flex-wrap items-center justify-between gap-4 border-b px-6 py-2'>
			<div className='ms-auto flex items-center gap-3'>
				<div className='flex items-center gap-3 rounded-xl'>
					<div className='from-primary-400 to-primary-600 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-sm'>
						<User size={16} weight='bold' />
					</div>
					<div className='flex flex-col'>
						<p className='label-sm text-foreground'>
							{isAuthenticated ? user?.name || user?.email || 'Account' : 'Guest'}
						</p>
						<p className='caption text-muted'>
							{isAuthenticated ? 'Active' : 'No session'}
						</p>
					</div>
				</div>
			</div>
		</header>
	);
}
