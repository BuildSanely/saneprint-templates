const DEFAULT_API_BASE_URL = 'http://localhost:4000';

function getBaseUrl(value?: string) {
	return value?.trim() || DEFAULT_API_BASE_URL;
}

function withBaseUrl(baseUrl: string, path: string) {
	return new URL(path, baseUrl).toString();
}

const API_BASE_URL = getBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL);

export const SERVICE_BASE_URLS = {
	core: API_BASE_URL,
	auth: getBaseUrl(process.env.NEXT_PUBLIC_AUTH_API_BASE_URL),
	users: getBaseUrl(process.env.NEXT_PUBLIC_USERS_API_BASE_URL),
} as const;

export const ENDPOINTS = {
	AUTH: {
		LOGIN: withBaseUrl(SERVICE_BASE_URLS.auth, '/auth/login'),
		SIGN_UP: withBaseUrl(SERVICE_BASE_URLS.auth, '/auth/signup'),
		RESEND_SIGN_UP_OTP: withBaseUrl(
			SERVICE_BASE_URLS.auth,
			'/auth/signup/resend-email-code',
		),
		VERIFY_SIGN_UP_OTP: withBaseUrl(SERVICE_BASE_URLS.auth, '/auth/signup/verify-email'),
		FORGOT_PASSWORD_REQUEST: withBaseUrl(
			SERVICE_BASE_URLS.auth,
			'/auth/forgot-password/request',
		),
		FORGOT_PASSWORD_VERIFY_OTP: withBaseUrl(
			SERVICE_BASE_URLS.auth,
			'/auth/forgot-password/verify-otp',
		),
		FORGOT_PASSWORD_RESET: withBaseUrl(
			SERVICE_BASE_URLS.auth,
			'/auth/forgot-password/reset',
		),
		LOGOUT: withBaseUrl(SERVICE_BASE_URLS.auth, '/auth/logout'),
		ME: withBaseUrl(SERVICE_BASE_URLS.auth, '/auth/me'),
		REFRESH: withBaseUrl(SERVICE_BASE_URLS.auth, '/auth/refresh'),
	},
	USERS: {
		LIST: withBaseUrl(SERVICE_BASE_URLS.users, '/users'),
		DETAIL: (userId: string) => withBaseUrl(SERVICE_BASE_URLS.users, `/users/${userId}`),
	},
	SYSTEM: {
		HEALTH: withBaseUrl(SERVICE_BASE_URLS.core, '/health'),
	},
} as const;
