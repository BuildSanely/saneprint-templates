import { Palette } from '@phosphor-icons/react/dist/ssr';
import {
	StyleguideBadge,
	StyleguideColorSwatch,
	StyleguideSection,
} from './StyleguidePrimitives';

const neutralStops = [
	'50',
	'100',
	'200',
	'300',
	'400',
	'500',
	'600',
	'700',
	'800',
	'900',
];

export function ColorSystemSection() {
	return (
		<StyleguideSection
			title='Color System'
			icon={Palette}
			description='Carefully crafted color palette with semantic meaning and accessibility in mind.'
			badge='New'
		>
			<div className='space-y-10'>
				<div className='space-y-4'>
					<div className='flex items-center gap-2'>
						<h3 className='heading-5 text-foreground'>Primary Palette</h3>
						<StyleguideBadge variant='brand'>Teal/Cyan</StyleguideBadge>
					</div>
					<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						<StyleguideColorSwatch
							name='Primary 500'
							value='#14b8a6'
							description='Main brand color'
						/>
						<StyleguideColorSwatch
							name='Primary 600'
							value='#0d9488'
							description='Hover states'
						/>
						<StyleguideColorSwatch
							name='Primary 50'
							value='#f0fdfa'
							description='Backgrounds'
						/>
					</div>
				</div>

				<div className='space-y-4'>
					<h3 className='heading-5 text-foreground'>Semantic Colors</h3>
					<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
						<StyleguideColorSwatch name='Success' value='#22c55e' />
						<StyleguideColorSwatch name='Warning' value='#f59e0b' />
						<StyleguideColorSwatch name='Error' value='#ef4444' />
						<StyleguideColorSwatch name='Info' value='#3b82f6' />
					</div>
				</div>

				<div className='space-y-4'>
					<h3 className='heading-5 text-foreground'>Neutral Scale</h3>
					<div className='grid grid-cols-5 gap-2 lg:grid-cols-10'>
						<div className='flex flex-col items-center gap-2'>
							<div
								className={`h-16 w-full rounded-lg bg-neutral-50 shadow-sm ring-1 ring-black/5`}
							/>
							<span className='caption text-muted font-mono'>50</span>
						</div>
						<div className='flex flex-col items-center gap-2'>
							<div
								className={`h-16 w-full rounded-lg bg-neutral-100 shadow-sm ring-1 ring-black/5`}
							/>
							<span className='caption text-muted font-mono'>100</span>
						</div>
						<div className='flex flex-col items-center gap-2'>
							<div
								className={`h-16 w-full rounded-lg bg-neutral-200 shadow-sm ring-1 ring-black/5`}
							/>
							<span className='caption text-muted font-mono'>200</span>
						</div>
						<div className='flex flex-col items-center gap-2'>
							<div
								className={`h-16 w-full rounded-lg bg-neutral-300 shadow-sm ring-1 ring-black/5`}
							/>
							<span className='caption text-muted font-mono'>300</span>
						</div>
						<div className='flex flex-col items-center gap-2'>
							<div
								className={`h-16 w-full rounded-lg bg-neutral-400 shadow-sm ring-1 ring-black/5`}
							/>
							<span className='caption text-muted font-mono'>400</span>
						</div>
						<div className='flex flex-col items-center gap-2'>
							<div
								className={`h-16 w-full rounded-lg bg-neutral-500 shadow-sm ring-1 ring-black/5`}
							/>
							<span className='caption text-muted font-mono'>500</span>
						</div>
						<div className='flex flex-col items-center gap-2'>
							<div
								className={`h-16 w-full rounded-lg bg-neutral-600 shadow-sm ring-1 ring-black/5`}
							/>
							<span className='caption text-muted font-mono'>600</span>
						</div>
						<div className='flex flex-col items-center gap-2'>
							<div
								className={`h-16 w-full rounded-lg bg-neutral-700 shadow-sm ring-1 ring-black/5`}
							/>
							<span className='caption text-muted font-mono'>700</span>
						</div>
						<div className='flex flex-col items-center gap-2'>
							<div
								className={`h-16 w-full rounded-lg bg-neutral-800 shadow-sm ring-1 ring-black/5`}
							/>
							<span className='caption text-muted font-mono'>800</span>
						</div>
						<div className='flex flex-col items-center gap-2'>
							<div
								className={`h-16 w-full rounded-lg bg-neutral-900 shadow-sm ring-1 ring-black/5`}
							/>
							<span className='caption text-muted font-mono'>{900}</span>
						</div>
					</div>
				</div>
			</div>
		</StyleguideSection>
	);
}
