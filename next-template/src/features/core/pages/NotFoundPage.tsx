import { SmileySadIcon } from '@phosphor-icons/react/dist/ssr/SmileySad';

import { LinkAsButton } from '../components/form/LinkAsButton';

export function NotFoundPage() {
	return (
		<main className='from-background via-surface/30 to-surface/20 relative flex min-h-screen items-center justify-center bg-gradient-to-br px-6 py-16'>
			{/* Decorative background */}
			<div className='fixed inset-0 -z-10'>
				<div className='from-surface/40 absolute top-1/2 left-1/2 size-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br to-transparent blur-3xl' />
			</div>

			<section className='w-full max-w-2xl text-center'>
				<div className='border-border/50 bg-surface/80 rounded-3xl border p-12 shadow-2xl shadow-black/5 backdrop-blur-xl lg:p-16'>
					<div className='space-y-8'>
						{/* 404 Illustration */}
						<div className='from-surface to-border mx-auto flex size-32 items-center justify-center rounded-3xl bg-gradient-to-br shadow-xl'>
							<SmileySadIcon className='text-muted size-16' weight='light' />
						</div>

						{/* Content */}
						<div className='space-y-4'>
							<div className='bg-surface text-muted inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold'>
								<span className='font-mono'>404</span> • Not Found
							</div>
							<h1 className='heading-2 text-foreground'>Page not found</h1>
							<p className='body text-muted mx-auto max-w-md'>
								The page you&apos;re looking for doesn&apos;t exist or has been moved.
								Let&apos;s get you back on track.
							</p>
						</div>

						{/* Actions */}
						<div className='flex flex-wrap items-center justify-center gap-3'>
							<LinkAsButton href='/' className='rounded-xl px-6'>
								← Back Home
							</LinkAsButton>
							<LinkAsButton
								href='/styleguide'
								variant='outlined'
								className='rounded-xl px-6'
							>
								Browse Components
							</LinkAsButton>
						</div>

						{/* Help text */}
						<p className='caption text-muted'>
							Need help? Check our{' '}
							<a href='/styleguide' className='text-primary-600 underline'>
								documentation
							</a>
						</p>
					</div>
				</div>
			</section>
		</main>
	);
}
