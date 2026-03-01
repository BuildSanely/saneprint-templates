import { ProjectsTable } from '../components/ProjectsTable';

export function ProjectsClientPage() {
	return (
		<div className='grid gap-6'>
			<section className=''>
				<h2 className='heading-4 text-foreground mt-2'>
					Client-side TanStack Query fetching inside the protected shell
				</h2>
				<p className='body text-muted mt-2 max-w-3xl'>
					This route intentionally skips server prefetching so teams can compare the
					client-fetch pattern against the hydrated example. Use it for features that do
					not need server-rendered data on first paint.
				</p>
			</section>
			<ProjectsTable />
		</div>
	);
}
