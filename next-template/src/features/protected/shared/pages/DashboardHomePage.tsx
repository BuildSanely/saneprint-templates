import { ChartLine, Cube, Users } from '@phosphor-icons/react/dist/ssr';

export function DashboardHomePage() {
	return (
		<div className='space-y-8'>
			{/* Welcome Section */}
			<section className='space-y-4'>
				<div className='flex items-center gap-2'>
					<div className='from-primary-500 to-primary-600 h-1 w-12 rounded-full bg-gradient-to-r' />
					<span className='label-sm text-primary-600 tracking-wider uppercase'>
						Dashboard Overview
					</span>
				</div>
				<h1 className='heading-2 text-foreground'>Welcome to your workspace</h1>
				<p className='body text-muted max-w-3xl'>
					This is your central hub for managing projects, teams, and resources. All
					authenticated features share this protected shell for a consistent experience.
				</p>
			</section>

			{/* Architecture Cards */}
			<section className='grid gap-6 lg:grid-cols-3'>
				<div className='group border-border/50 from-surface relative overflow-hidden rounded-2xl border bg-gradient-to-br to-neutral-50/50 p-6 shadow-sm transition-all hover:shadow-md'>
					<div className='from-primary-100/50 absolute top-0 right-0 h-24 w-24 rounded-full bg-gradient-to-br to-transparent blur-2xl' />
					<div className='relative space-y-4'>
						<div className='from-primary-500 to-primary-600 shadow-primary-500/20 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md'>
							<Cube size={24} weight='duotone' />
						</div>
						<div className='space-y-2'>
							<h3 className='heading-6 text-foreground'>Shared Shell</h3>
							<p className='body-sm text-muted leading-relaxed'>
								Header, sidebar, footer, and protected layout wrappers live in one unified
								location.
							</p>
						</div>
					</div>
				</div>

				<div className='group border-border/50 from-surface relative overflow-hidden rounded-2xl border bg-gradient-to-br to-neutral-50/50 p-6 shadow-sm transition-all hover:shadow-md'>
					<div className='from-primary-100/50 absolute top-0 right-0 h-24 w-24 rounded-full bg-gradient-to-br to-transparent blur-2xl' />
					<div className='relative space-y-4'>
						<div className='from-primary-500 to-primary-600 shadow-primary-500/20 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md'>
							<Users size={24} weight='duotone' />
						</div>
						<div className='space-y-2'>
							<h3 className='heading-6 text-foreground'>Feature Domains</h3>
							<p className='body-sm text-muted leading-relaxed'>
								Each protected domain maintains its own pages, services, hooks, and UI
								components.
							</p>
						</div>
					</div>
				</div>

				<div className='group border-border/50 from-surface relative overflow-hidden rounded-2xl border bg-gradient-to-br to-neutral-50/50 p-6 shadow-sm transition-all hover:shadow-md'>
					<div className='from-primary-100/50 absolute top-0 right-0 h-24 w-24 rounded-full bg-gradient-to-br to-transparent blur-2xl' />
					<div className='relative space-y-4'>
						<div className='from-primary-500 to-primary-600 shadow-primary-500/20 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md'>
							<ChartLine size={24} weight='duotone' />
						</div>
						<div className='space-y-2'>
							<h3 className='heading-6 text-foreground'>Server Prefetch</h3>
							<p className='body-sm text-muted leading-relaxed'>
								The projects example demonstrates HydrationBoundary with TanStack Query.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
