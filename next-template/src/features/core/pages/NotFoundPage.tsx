import { LinkAsButton } from '../components/form/LinkAsButton';

export function NotFoundPage() {
	return (
		<main className='from-background relative flex min-h-screen items-center justify-center bg-gradient-to-br via-neutral-50/30 to-neutral-100/20 px-6 py-16'>
			{/* Decorative background */}
			<div className='fixed inset-0 -z-10'>
				<div className='absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-neutral-200/40 to-transparent blur-3xl' />
			</div>

			<section className='w-full max-w-2xl text-center'>
				<div className='border-border/50 bg-surface/80 rounded-3xl border p-12 shadow-2xl shadow-black/5 backdrop-blur-xl lg:p-16'>
					<div className='space-y-8'>
						{/* 404 Illustration */}
						<div className='mx-auto flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-neutral-100 to-neutral-200 shadow-xl'>
							<svg
								className='h-16 w-16 text-neutral-400'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={1.5}
									d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
						</div>

						{/* Content */}
						<div className='space-y-4'>
							<div className='inline-flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-600'>
								<span className='font-mono'>404</span> • Not Found
							</div>
							<h1 className='heading-2 text-foreground'>Page not found</h1>
							<p className='body text-muted mx-auto max-w-md'>
								The page you're looking for doesn't exist or has been moved. Let's get you
								back on track.
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
