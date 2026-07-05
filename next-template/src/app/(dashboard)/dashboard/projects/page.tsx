import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { ProjectsPage, projectsQueryOptions } from '@projects';
import { createPageMetadata } from '@utils/seo';

export const metadata = createPageMetadata({
	title: 'Projects',
	description: 'Protected projects example with server-prefetched query data.',
	path: '/dashboard/projects',
});

export default async function ProjectsRoute() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(projectsQueryOptions());

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ProjectsPage />
		</HydrationBoundary>
	);
}
