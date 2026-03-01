'use client';

import { CaretLeft, CaretRight, SignOut, StarIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { cn } from '@utils/cn';
import { useAuth } from '@auth';
import { Button, IconButton } from '@core';
import { useProtectedNav } from '../hooks/useProtectedNav';
import { useSidebarState } from '../hooks/useSidebarState';

export function ProtectedSidebar() {
	const { logout, isLoggingOut } = useAuth();
	const navItems = useProtectedNav();
	const { isCollapsed, toggleSidebar } = useSidebarState();

	return (
		<aside
			className={cn(
				'border-border/50 bg-surface/50 relative flex h-full flex-col border-r backdrop-blur-sm transition-all duration-300',
				isCollapsed ? 'w-20' : 'w-72',
			)}
		>
			<div className='flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-4'>
				<div className='flex items-center gap-3 pb-4'>
					<div className='from-primary-500 to-primary-600 shadow-primary-500/30 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg'>
						<StarIcon size={20} weight='fill' className='text-white' />
					</div>
					{!isCollapsed && (
						<div className='flex flex-col'>
							<p className='label text-foreground'>Name</p>
							<p className='caption text-muted'>Dashboard</p>
						</div>
					)}
				</div>

				<nav className='flex flex-1 flex-col gap-1.5'>
					{navItems.map((item) => {
						const Icon = item.icon;

						return (
							<Link
								key={item.href}
								href={item.href}
								title={isCollapsed ? item.label : undefined}
								className={cn(
									'group label relative inline-flex items-center gap-3 rounded-xl px-2 py-2 transition-all',
									item.isActive
										? 'from-primary-500 to-primary-600 shadow-primary-500/30 bg-gradient-to-r text-white shadow-lg'
										: 'text-muted hover:text-foreground hover:bg-background',
									isCollapsed && 'justify-center',
								)}
							>
								<Icon
									aria-hidden='true'
									size={20}
									weight={item.isActive ? 'fill' : 'duotone'}
								/>
								{!isCollapsed && <span>{item.label}</span>}
								{item.isActive && !isCollapsed && (
									<span className='ring-primary-500/20 ring-offset-surface/50 absolute inset-0 rounded-xl ring-2 ring-offset-2' />
								)}
							</Link>
						);
					})}
				</nav>
			</div>

			<div className='border-border/50 shrink-0 border-t p-4'>
				<Button
					type='button'
					variant='outlined'
					intent='secondary'
					size='md'
					fullWidth
					className={cn(isCollapsed && 'px-2')}
					onClick={() => {
						void logout();
					}}
					loading={isLoggingOut}
					loadingText='Signing out...'
					title={isCollapsed ? 'Sign out' : undefined}
					leftIcon={<SignOut aria-hidden='true' size={18} weight='bold' />}
				>
					{!isCollapsed ? 'Sign out' : <span className='sr-only'>Sign out</span>}
				</Button>
			</div>

			<IconButton
				type='button'
				onClick={toggleSidebar}
				size='sm'
				className='hover:bg-surface absolute top-18 -right-3 z-10'
				aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
				icon={
					isCollapsed ? (
						<CaretRight size={14} weight='bold' />
					) : (
						<CaretLeft size={14} weight='bold' />
					)
				}
			/>
		</aside>
	);
}
