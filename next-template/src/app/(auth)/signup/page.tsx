import { SignupPage } from '@auth';
import { createPageMetadata } from '@utils/seo';

export const metadata = createPageMetadata({
	title: 'Sign up',
	description: 'Create your account and verify your email.',
	path: '/signup',
});

export default function SignupRoute() {
	return <SignupPage />;
}
