const AuthWrapper = ({
	title,
	subtitle,
	children,
}: {
	title: string;
	subtitle?: string;
	children: React.ReactNode;
}) => {
	return (
		<div className='from-background via-primary-50/20 to-primary-100/30 relative flex min-h-screen items-center justify-center bg-gradient-to-br px-6 py-16'>
			{/* Decorative background elements */}
			<div className='fixed inset-0 -z-10'>
				<div className='from-primary-200/40 absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br to-transparent blur-3xl' />
				<div className='from-primary-300/30 absolute right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tl to-transparent blur-3xl' />
			</div>

			<section className='w-full max-w-md'>
				{/* Auth Card */}
				<div className='border-border/50 bg-surface/80 rounded-2xl border p-8 shadow-2xl shadow-black/5 backdrop-blur-xl lg:p-10'>
					<div className='space-y-6'>
						<div className='space-y-2'>
							<h1 className='heading-3 text-foreground'>{title}</h1>
							<p className='body-sm text-muted'>{subtitle}</p>
						</div>
						{children}
					</div>
				</div>
			</section>
		</div>
	);
};

export default AuthWrapper;
