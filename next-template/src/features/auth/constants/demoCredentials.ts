export const DEMO_AUTH_CREDENTIALS = {
	email: 'demo@pixscaffold.dev',
	password: 'Demo@123456',
} as const;

export function shouldShowDemoCredentials() {
	return process.env.NODE_ENV !== 'production';
}
