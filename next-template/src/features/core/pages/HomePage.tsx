import { LinkAsButton } from '../components/form/LinkAsButton';

export function HomePage() {
	return (
		<main className='from-background via-primary-50/20 to-primary-100/30 relative flex min-h-screen items-center justify-center bg-gradient-to-br px-6 py-16'>
			{/* Decorative background elements */}
			<div className='fixed inset-0 -z-10'>
				<div className='from-primary-200/40 absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br to-transparent blur-3xl' />
				<div className='from-primary-300/30 absolute right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tl to-transparent blur-3xl' />
			</div>

			<section className='w-full max-w-6xl'>
				<div className='border-border/50 bg-surface/80 rounded-3xl border p-8 shadow-2xl shadow-black/5 backdrop-blur-xl lg:p-16'>
					<div className='grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16'>
						{/* Left column - Main content */}
						<div className='space-y-8'>
							<div className='space-y-6'>
								<h1 className='heading-1 from-foreground to-primary-600 bg-gradient-to-br bg-clip-text text-transparent'>
									Next.js Scaffolding that makes sense.
								</h1>
								<p className='body text-muted text-lg leading-relaxed'>
									A production-grade design system with semantic color roles, and
									AI-assisted scaffolding. Built on Tailwind v4 with OKLCH color space for
									perceptual consistency.
								</p>
							</div>

							{/* CTA Buttons */}
							<div className='flex flex-wrap gap-3'>
								<LinkAsButton
									href='/styleguide'
									title='Explore Components'
									variant='filled'
									intent='primary'
								/>
								<LinkAsButton
									href='/dashboard'
									variant='outlined'
									title='View Dashboard'
								/>
								<LinkAsButton
									href='/login'
									variant='ghost'
									intent='secondary'
									title='Sign In'
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
