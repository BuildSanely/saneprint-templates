export type StyleguideBadgeVariant =
	| 'neutral'
	| 'brand'
	| 'success'
	| 'warning'
	| 'danger';

export type StyleguideIcon = React.ComponentType<{
	size?: number;
	weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
	className?: string;
}>;

export function StyleguideBadge({
	children,
	variant = 'neutral',
}: {
	children: React.ReactNode;
	variant?: StyleguideBadgeVariant;
}) {
	const variants: Record<StyleguideBadgeVariant, React.CSSProperties> = {
		neutral: {
			backgroundColor: 'color-mix(in srgb, var(--color-border) 70%, var(--color-surface))',
			color: 'var(--color-muted)',
		},
		brand: {
			backgroundColor: 'color-mix(in srgb, var(--color-brand) 14%, transparent)',
			color: 'var(--color-brand)',
		},
		success: {
			backgroundColor: 'color-mix(in srgb, var(--color-success-500) 14%, transparent)',
			color: 'var(--color-success-500)',
		},
		warning: {
			backgroundColor: 'color-mix(in srgb, var(--color-warning-500) 14%, transparent)',
			color: 'var(--color-warning-500)',
		},
		danger: {
			backgroundColor: 'color-mix(in srgb, var(--color-danger) 14%, transparent)',
			color: 'var(--color-danger)',
		},
	};

	return (
		<span
			className='inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase'
			style={variants[variant]}
		>
			{children}
		</span>
	);
}

export function StyleguideColorSwatch({
	name,
	token,
	description,
}: {
	name: string;
	token: string;
	description?: string;
}) {
	return (
		<div className='group border-border/50 bg-surface hover:border-brand/30 flex items-center gap-4 rounded-xl border p-4 transition-all hover:shadow-md'>
			<div
				className='h-14 w-14 shrink-0 rounded-lg shadow-sm ring-1 ring-black/5 transition-transform group-hover:scale-110'
				style={{ backgroundColor: `var(${token})` }}
			/>
			<div className='flex flex-col gap-1'>
				<p className='label text-foreground'>{name}</p>
				<code className='caption text-muted font-mono'>{token}</code>
				{description ? (
					<p className='caption text-muted/70'>{description}</p>
				) : null}
			</div>
		</div>
	);
}

export function StyleguideSection({
	title,
	description,
	icon: Icon,
	children,
	badge,
}: {
	title: string;
	description: string;
	icon: StyleguideIcon;
	children: React.ReactNode;
	badge?: string;
}) {
	return (
		<section className='group space-y-8'>
			<div className='flex flex-col gap-4'>
				<div className='flex items-center gap-3'>
					<div
						className='flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg'
						style={{
							backgroundImage:
								'linear-gradient(to bottom right, var(--color-brand), var(--color-brand-hover))',
							boxShadow:
								'0 20px 40px color-mix(in srgb, var(--color-brand) 20%, transparent)',
						}}
					>
						<Icon size={24} weight='duotone' />
					</div>
					<div className='flex flex-col gap-1'>
						<div className='flex items-center gap-3'>
							<h2 className='heading-3 text-foreground'>{title}</h2>
							{badge ? <StyleguideBadge variant='brand'>{badge}</StyleguideBadge> : null}
						</div>
						<p className='body-sm text-muted'>{description}</p>
					</div>
				</div>
			</div>
			<div
				className='border-border/50 group-hover:border-brand/20 rounded-3xl border p-8 shadow-xl shadow-black/5 backdrop-blur-sm transition-all lg:p-12'
				style={{
					backgroundImage:
						'linear-gradient(to bottom right, var(--color-surface), color-mix(in srgb, var(--color-background) 84%, white))',
				}}
			>
				{children}
			</div>
		</section>
	);
}
