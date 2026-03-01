'use client';

import { useAuth } from '../hooks/useAuth';

export function AuthSessionBootstrap() {
	useAuth();
	return null;
}
