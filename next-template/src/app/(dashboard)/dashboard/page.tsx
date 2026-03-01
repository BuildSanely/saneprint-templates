import { DashboardHomePage } from '@dashboard/shared';
import { createPageMetadata } from '@utils/seo';

export const metadata = createPageMetadata({
	title: 'Dashboard',
	description: 'Protected shell overview for authenticated features.',
	path: '/dashboard',
});

export default function DashboardRoute() {
	return <DashboardHomePage />;
}
