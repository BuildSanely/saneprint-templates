const DEFAULT_APP_URL = 'http://localhost:3000';
const DEFAULT_API_URL = 'http://localhost:4000';
const DEFAULT_SESSION_COOKIE = '__pixscaffold_session';

function optionalUrl(value: string | undefined, fallback: string, key: string) {
	const candidate = value?.trim() || fallback;

	try {
		return new URL(candidate).toString();
	} catch {
		throw new Error(`${key} must be a valid URL.`);
	}
}

export const clientEnv = {
	NEXT_PUBLIC_APP_URL: optionalUrl(
		process.env.NEXT_PUBLIC_APP_URL,
		DEFAULT_APP_URL,
		'NEXT_PUBLIC_APP_URL',
	),
	NEXT_PUBLIC_API_BASE_URL: optionalUrl(
		process.env.NEXT_PUBLIC_API_BASE_URL,
		DEFAULT_API_URL,
		'NEXT_PUBLIC_API_BASE_URL',
	),
	NEXT_PUBLIC_AUTH_API_BASE_URL: optionalUrl(
		process.env.NEXT_PUBLIC_AUTH_API_BASE_URL,
		DEFAULT_API_URL,
		'NEXT_PUBLIC_AUTH_API_BASE_URL',
	),
	NEXT_PUBLIC_USERS_API_BASE_URL: optionalUrl(
		process.env.NEXT_PUBLIC_USERS_API_BASE_URL,
		DEFAULT_API_URL,
		'NEXT_PUBLIC_USERS_API_BASE_URL',
	),
	NEXT_PUBLIC_AUTH_SESSION_COOKIE_NAME:
		process.env.NEXT_PUBLIC_AUTH_SESSION_COOKIE_NAME?.trim() || DEFAULT_SESSION_COOKIE,
} as const;
