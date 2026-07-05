import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { serverEnv } from '@/config/server-env';

const AUTH_SESSION_COOKIE_NAME = serverEnv.AUTH_SESSION_COOKIE_NAME;
const PROTECTED_PATH_PREFIXES = ['/dashboard'] as const;
const AUTH_ROUTE_PREFIXES = ['/login', '/signup'] as const;

function hasSessionCookie(request: NextRequest) {
	return request.cookies.has(AUTH_SESSION_COOKIE_NAME);
}

function isProtectedPath(pathname: string) {
	return PROTECTED_PATH_PREFIXES.some(
		(prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
	);
}

function isAuthRoute(pathname: string) {
	return AUTH_ROUTE_PREFIXES.some(
		(prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
	);
}

function buildContentSecurityPolicy() {
	return [
		"default-src 'self'",
		"base-uri 'self'",
		"font-src 'self' https: data:",
		"form-action 'self'",
		"frame-ancestors 'none'",
		"img-src 'self' https: data: blob:",
		"object-src 'none'",
		"script-src 'self' 'unsafe-inline'",
		"style-src 'self' 'unsafe-inline'",
		"connect-src 'self' https: http:",
	].join('; ');
}

function applySecurityHeaders(response: NextResponse) {
	response.headers.set('Content-Security-Policy', buildContentSecurityPolicy());
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-XSS-Protection', '1; mode=block');
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

	return response;
}

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const hasSession = hasSessionCookie(request);

	if (isProtectedPath(pathname) && !hasSession) {
		const loginUrl = new URL('/login', request.url);
		loginUrl.searchParams.set('redirect', pathname);
		return applySecurityHeaders(NextResponse.redirect(loginUrl));
	}

	if (isAuthRoute(pathname) && hasSession) {
		return applySecurityHeaders(
			NextResponse.redirect(new URL('/dashboard', request.url)),
		);
	}

	return applySecurityHeaders(NextResponse.next());
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
