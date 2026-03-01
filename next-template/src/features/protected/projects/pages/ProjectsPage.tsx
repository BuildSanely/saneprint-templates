import { ProjectsTable } from '../components/ProjectsTable';

export function ProjectsPage() {
	return (
		<div className='grid gap-6'>
			<section className=''>
				<h2 className='heading-4 text-foreground mt-2'>
					Server-prefetched query data rendered inside the protected shell
				</h2>
				<p className='body text-muted mt-2 max-w-3xl'>
					This example is intentionally a real domain feature, not a generic `users` page.
					It demonstrates how protected features should consume shared primitives and
					server-prefetched TanStack Query data.
				</p>
			</section>
			<ProjectsTable />
		</div>
	);
}
