import { BookOpen, CheckCircle, WarningCircle } from '@phosphor-icons/react/dist/ssr';

import { StyleguideSection } from './StyleguidePrimitives';

const dos = [
	'Use semantic color tokens for consistent theming',
	'Maintain proper spacing and hierarchy',
	'Test components',
	'Follow accessibility guidelines (WCAG 2.1)',
];

const donts = [
	'Avoid hardcoding color values directly',
	"Don't mix different button styles inconsistently",
	'Never skip focus states for keyboard navigation',
	"Avoid using colors that don't meet contrast ratios",
];

export function BestPracticesSection() {
	return (
		<StyleguideSection
			title='Best Practices'
			icon={BookOpen}
			description='Guidelines for implementing the design system effectively.'
		>
			<div className='grid gap-6 lg:grid-cols-2'>
				<div className='border-border bg-surface space-y-4 rounded-2xl border p-6'>
					<div className='flex items-center gap-3'>
						<div className='bg-brand/10 text-brand flex h-10 w-10 items-center justify-center rounded-full'>
							<CheckCircle size={22} weight='bold' />
						</div>
						<h4 className='heading-6 text-foreground'>Do&apos;s</h4>
					</div>
					<ul className='body-sm text-muted space-y-2'>
						{dos.map((item) => (
							<li key={item} className='flex items-start gap-2'>
								<span className='text-brand'>•</span>
								{item}
							</li>
						))}
					</ul>
				</div>

				<div className='border-border bg-surface space-y-4 rounded-2xl border p-6'>
					<div className='flex items-center gap-3'>
						<div className='bg-danger/10 text-danger flex h-10 w-10 items-center justify-center rounded-full'>
							<WarningCircle size={22} weight='bold' />
						</div>
						<h4 className='heading-6 text-foreground'>Don&apos;ts</h4>
					</div>
					<ul className='body-sm text-muted space-y-2'>
						{donts.map((item) => (
							<li key={item} className='flex items-start gap-2'>
								<span className='text-danger'>•</span>
								{item}
							</li>
						))}
					</ul>
				</div>
			</div>
		</StyleguideSection>
	);
}
