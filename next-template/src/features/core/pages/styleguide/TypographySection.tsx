import { Code } from '@phosphor-icons/react/dist/ssr';
import { StyleguideBadge, StyleguideSection } from './StyleguidePrimitives';

export function TypographySection() {
	return (
		<StyleguideSection
			title='Typography System'
			icon={Code}
			description='Hierarchical type scale with optimized readability and visual rhythm.'
		>
			<div className='space-y-12'>
				<div className='space-y-6'>
					<div className='border-border/50 flex items-center justify-between border-b pb-2'>
						<StyleguideBadge>Headings</StyleguideBadge>
						<span className='caption text-muted'>Geist Sans</span>
					</div>
					<div className='space-y-8'>
						<div className='space-y-2'>
							<h1 className='heading-1 text-foreground'>Heading 1 - Hero Title</h1>
							<code className='caption text-muted font-mono'>
								48px / 700 / -0.02em
							</code>
						</div>
						<div className='space-y-2'>
							<h2 className='heading-2 text-foreground'>Heading 2 - Section Title</h2>
							<code className='caption text-muted font-mono'>
								36px / 700 / -0.01em
							</code>
						</div>
						<div className='space-y-2'>
							<h3 className='heading-3 text-foreground'>Heading 3 - Subsection</h3>
							<code className='caption text-muted font-mono'>
								30px / 700 / -0.01em
							</code>
						</div>
						<div className='space-y-2'>
							<h4 className='heading-4 text-foreground'>Heading 4 - Component Title</h4>
							<code className='caption text-muted font-mono'>
								24px / 600 / -0.005em
							</code>
						</div>
					</div>
				</div>

				<div className='space-y-6'>
					<div className='border-border/50 flex items-center justify-between border-b pb-2'>
						<StyleguideBadge>Body Text</StyleguideBadge>
						<span className='caption text-muted'>Optimal for reading</span>
					</div>
					<div className='space-y-4'>
						<div className='space-y-2'>
							<p className='body text-foreground max-w-3xl'>
								This is body text. It&apos;s designed for optimal readability with a
								comfortable line height and letter spacing. Perfect for longer
								content blocks, descriptions, and paragraphs. The type scale ensures
								visual hierarchy while maintaining consistency.
							</p>
							<code className='caption text-muted font-mono'>
								16px / 400 / 1.5 line-height
							</code>
						</div>
						<div className='space-y-2'>
							<p className='body-sm text-muted max-w-3xl'>
								This is small body text. Used for secondary information, captions,
								and metadata. Still highly readable but takes up less visual space.
							</p>
							<code className='caption text-muted font-mono'>
								14px / 400 / 1.5 line-height
							</code>
						</div>
					</div>
				</div>
			</div>
		</StyleguideSection>
	);
}
