import { ProjectsClientPage } from '@projects';
import { createPageMetadata } from '@utils/seo';

export const metadata = createPageMetadata({
	title: 'Projects Client Example',
	description: 'Protected projects example with client-side TanStack Query fetching.',
	path: '/dashboard/projects/client',
});

export default function ProjectsClientRoute() {
	return <ProjectsClientPage />;
}
