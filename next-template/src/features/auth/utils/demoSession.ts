import { AuthUser } from '../redux/authSlice';
import { DEMO_AUTH_CREDENTIALS } from '../constants/demoCredentials';

const DEMO_SESSION_STORAGE_KEY = 'pixscaffold_demo_session';
const DEFAULT_AUTH_SESSION_COOKIE_NAME = '__pixscaffold_session';

function getDemoSessionCookieName() {
	return (
		process.env.NEXT_PUBLIC_AUTH_SESSION_COOKIE_NAME ||
		DEFAULT_AUTH_SESSION_COOKIE_NAME
	);
}

export function isDemoSessionEnabled() {
	return process.env.NODE_ENV !== 'production';
}

export function getDemoSessionUser(): AuthUser | null {
	if (!isDemoSessionEnabled() || typeof window === 'undefined') {
		return null;
	}

	const storedValue = window.localStorage.getItem(DEMO_SESSION_STORAGE_KEY);

	if (!storedValue) {
		return null;
	}

	try {
		return JSON.parse(storedValue) as AuthUser;
	} catch {
		window.localStorage.removeItem(DEMO_SESSION_STORAGE_KEY);
		return null;
	}
}

export function isDemoSessionActive() {
	return Boolean(getDemoSessionUser());
}

export function createDemoSession() {
	if (!isDemoSessionEnabled() || typeof window === 'undefined') {
		return null;
	}

	// Development-only shortcut for local testing. Do not use this as a real auth path.
	const user: AuthUser = {
		id: 'demo-user',
		email: DEMO_AUTH_CREDENTIALS.email,
		name: 'Demo User',
		role: 'admin',
	};

	window.localStorage.setItem(DEMO_SESSION_STORAGE_KEY, JSON.stringify(user));
	document.cookie = `${getDemoSessionCookieName()}=demo-session; Path=/; SameSite=Lax`;

	return user;
}

export function clearDemoSession() {
	if (typeof window === 'undefined') {
		return;
	}

	window.localStorage.removeItem(DEMO_SESSION_STORAGE_KEY);
	document.cookie = `${getDemoSessionCookieName()}=; Path=/; Max-Age=0; SameSite=Lax`;
}
