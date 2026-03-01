import { ArrowLeftIcon, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { LinkAsButton } from '@core';

export function StyleguideHeader() {
	return (
		<header className='mb-20 space-y-8'>
			<div className='flex items-center gap-2'>
				<div className='from-primary-500 to-primary-600 h-1 w-16 rounded-full bg-linear-to-r' />
				<p className='label-sm text-primary-600 font-bold tracking-[0.3em] uppercase'>
					Design System v2.0
				</p>
			</div>

			<div className='space-y-6'>
				<h1 className='heading-1 from-foreground via-foreground to-primary-600 max-w-4xl bg-linear-to-br bg-clip-text text-transparent'>
					Design Protocol
				</h1>
				<p className='body text-muted max-w-2xl text-xl leading-relaxed'>
					A comprehensive, production-ready design system built with precision. Features a
					modern teal/cyan palette, premium components.
				</p>
			</div>

			<div className='flex flex-wrap gap-4'>
				<LinkAsButton
					href='/'
					variant='outlined'
					intent='secondary'
					className='rounded-xl'
					leftIcon={<ArrowLeftIcon size={18} />}
					title='Back to Dashboard'
				/>

				<LinkAsButton
					title='View Live Demo'
					href='/dashboard'
					rightIcon={<ArrowRight size={18} />}
				/>
			</div>
		</header>
	);
}
