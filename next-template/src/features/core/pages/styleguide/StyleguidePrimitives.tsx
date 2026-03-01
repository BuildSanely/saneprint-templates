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
	const variants: Record<StyleguideBadgeVariant, string> = {
		neutral: 'bg-neutral-100 text-neutral-600',
		brand: 'bg-primary-100 text-primary-700',
		success: 'bg-green-100 text-green-700',
		warning: 'bg-amber-100 text-amber-700',
		danger: 'bg-red-100 text-red-700',
	};

	return (
		<span
			className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase ${variants[variant]}`}
		>
			{children}
		</span>
	);
}

export function StyleguideColorSwatch({
	name,
	value,
	description,
}: {
	name: string;
	value: string;
	description?: string;
}) {
	return (
		<div className='group border-border/50 bg-surface hover:border-brand/30 flex items-center gap-4 rounded-xl border p-4 transition-all hover:shadow-md'>
			<div
				className='h-14 w-14 shrink-0 rounded-lg shadow-sm ring-1 ring-black/5 transition-transform group-hover:scale-110'
				style={{ backgroundColor: value }}
			/>
			<div className='flex flex-col gap-1'>
				<p className='label text-foreground'>{name}</p>
				<code className='caption text-muted font-mono'>{value}</code>
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
					<div className='from-primary-500 to-primary-600 shadow-primary-500/20 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg'>
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
			<div className='border-border/50 from-surface group-hover:border-brand/20 rounded-3xl border bg-gradient-to-br to-neutral-50/50 p-8 shadow-xl shadow-black/5 backdrop-blur-sm transition-all lg:p-12'>
				{children}
			</div>
		</section>
	);
}
