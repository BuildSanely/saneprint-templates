export function ProtectedFooter() {
	return (
		<footer className='border-border/50 bg-surface/80 border-t px-6 py-4 backdrop-blur-sm lg:px-8'>
			<div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
				<p className='body-sm text-muted'>
					© 2026 PixScaffold. Built with precision and care.
				</p>
				<div className='flex items-center gap-4'>
					<a
						href='/styleguide'
						className='caption text-primary-600 hover:text-primary-700 transition-colors'
					>
						Design System
					</a>
					<span className='text-border'>•</span>
					<a
						href='/dashboard'
						className='caption text-primary-600 hover:text-primary-700 transition-colors'
					>
						Dashboard
					</a>
				</div>
			</div>
		</footer>
	);
}
