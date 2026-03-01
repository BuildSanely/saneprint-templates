import { LoginPage } from '@auth';
import { createPageMetadata } from '@utils/seo';

export const metadata = createPageMetadata({
	title: 'Login',
	description: 'Sign in to your workspace.',
	path: '/login',
});

export default function LoginRoute() {
	return <LoginPage />;
}
