'use client';

import { useEffect } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient, ENDPOINTS } from '@services';
import { useAppDispatch, useAppSelector } from '@store';
import { Logger } from '@utils/logger';

import {
	AuthUser,
	clearAuth,
	setAuthenticated,
	setAuthLoading,
} from '../redux/authSlice';
import {
	clearDemoSession,
	getDemoSessionUser,
	isDemoSessionActive,
} from '../utils/demoSession';

const AUTH_SESSION_QUERY_KEY = ['auth', 'session'] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

function normalizeUser(value: unknown): AuthUser | null {
	if (!isRecord(value)) {
		return null;
	}

	const id = value.id;
	const email = value.email;

	if (typeof id !== 'string' || typeof email !== 'string') {
		return null;
	}

	return {
		...value,
		id,
		email,
	};
}

function extractUserFromPayload(payload: unknown): AuthUser | null {
	if (!isRecord(payload)) {
		return null;
	}

	const directUser = normalizeUser(payload.user);
	if (directUser) {
		return directUser;
	}

	if (isRecord(payload.data)) {
		const nestedUser = normalizeUser(payload.data.user);
		if (nestedUser) {
			return nestedUser;
		}

		return normalizeUser(payload.data);
	}

	return normalizeUser(payload);
}

async function fetchAuthSession() {
	const demoSessionUser = getDemoSessionUser();

	if (demoSessionUser) {
		return demoSessionUser;
	}

	const response = await apiClient.get(ENDPOINTS.AUTH.ME);
	return extractUserFromPayload(response.data);
}

function isExpectedSessionBootstrapError(error: unknown) {
	if (!(error instanceof Error)) {
		return false;
	}

	const authError = error as Error & { status?: number; code?: string };

	return (
		authError.status === 401 ||
		authError.status === 403 ||
		authError.status === 404 ||
		authError.code === 'ERR_NETWORK'
	);
}

export function useAuth() {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const auth = useAppSelector((state) => state.auth);

	const sessionQuery = useQuery({
		queryKey: AUTH_SESSION_QUERY_KEY,
		queryFn: fetchAuthSession,
		retry: false,
		staleTime: 1000 * 60 * 5,
	});

	useEffect(() => {
		if (sessionQuery.isPending) {
			dispatch(setAuthLoading());
			return;
		}

		if (sessionQuery.isSuccess) {
			if (sessionQuery.data) {
				dispatch(setAuthenticated(sessionQuery.data));
			} else {
				dispatch(clearAuth());
			}
		}

		if (sessionQuery.isError) {
			if (!isExpectedSessionBootstrapError(sessionQuery.error)) {
				Logger.error('Unable to resolve the active auth session.', {
					error: sessionQuery.error,
					feature: 'auth',
					action: 'session-bootstrap',
				});
			}

			dispatch(clearAuth());
		}
	}, [
		dispatch,
		sessionQuery.data,
		sessionQuery.error,
		sessionQuery.isError,
		sessionQuery.isPending,
		sessionQuery.isSuccess,
	]);

	const logoutMutation = useMutation({
		mutationFn: async () => {
			if (isDemoSessionActive()) {
				clearDemoSession();
				return null;
			}

			const response = await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
			return response.data;
		},
		onSuccess: async () => {
			dispatch(clearAuth());
			await queryClient.removeQueries({ queryKey: AUTH_SESSION_QUERY_KEY });
		},
		onError: (error) => {
			Logger.error('Logout request failed.', {
				error,
				feature: 'auth',
				action: 'logout',
			});
		},
	});

	return {
		...auth,
		isBootstrapping: sessionQuery.isPending,
		sessionError: sessionQuery.error,
		refreshSession: () =>
			queryClient.invalidateQueries({ queryKey: AUTH_SESSION_QUERY_KEY }),
		logout: () => logoutMutation.mutateAsync(),
		isLoggingOut: logoutMutation.isPending,
	};
}

export { AUTH_SESSION_QUERY_KEY };
