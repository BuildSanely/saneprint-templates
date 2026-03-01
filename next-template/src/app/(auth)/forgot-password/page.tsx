import { ForgotPasswordPage } from '@auth';
import { createPageMetadata } from '@utils/seo';

export const metadata = createPageMetadata({
	title: 'Forgot password',
	description: 'Request a reset code and choose a new password.',
	path: '/forgot-password',
	noIndex: true,
});

export default function ForgotPasswordRoute() {
	return <ForgotPasswordPage />;
}
