import { ReactNode } from 'react';

import { ProtectedFooter } from '../components/ProtectedFooter';
import { ProtectedHeader } from '../components/ProtectedHeader';
import { ProtectedSidebar } from '../components/ProtectedSidebar';

interface ProtectedShellProps {
	children: ReactNode;
}

export function ProtectedShell({ children }: ProtectedShellProps) {
	return (
		<div className='from-background to-primary-50/10 min-h-screen bg-gradient-to-br via-neutral-50/30'>
			{/* Subtle background decoration */}
			<div className='fixed inset-0 -z-10'>
				<div className='from-primary-100/30 absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-gradient-to-br to-transparent blur-3xl' />
				<div className='from-primary-50/20 absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-gradient-to-tr to-transparent blur-3xl' />
			</div>

			<div className='flex h-[calc(100vh)]'>
				<ProtectedSidebar />

				<main className='flex flex-1 flex-col overflow-auto'>
					<ProtectedHeader />
					<div className='flex-1 px-6 py-4'>{children}</div>
					<ProtectedFooter />
				</main>
			</div>
		</div>
	);
}
