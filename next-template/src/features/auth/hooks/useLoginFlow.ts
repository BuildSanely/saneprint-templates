'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { apiClient, ENDPOINTS } from '@services';
import { Logger } from '@utils/logger';

import { AUTH_SESSION_QUERY_KEY } from './useAuth';
import {
	DEMO_AUTH_CREDENTIALS,
	shouldShowDemoCredentials,
} from '../constants/demoCredentials';
import {
	LoginPasswordFormValues,
	LoginPasswordSchema,
} from '../schemas/LoginPasswordSchema';
import { createDemoSession } from '../utils/demoSession';

export function useLoginFlow() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const searchParams = useSearchParams();

	const passwordForm = useForm<LoginPasswordFormValues>({
		resolver: zodResolver(LoginPasswordSchema),
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onBlur',
	});

	async function completeLogin() {
		await queryClient.invalidateQueries({ queryKey: AUTH_SESSION_QUERY_KEY });
		const redirectTo = searchParams.get('redirect') || '/';
		router.push(redirectTo);
		router.refresh();
	}

	function isDemoCredentialMatch(values: LoginPasswordFormValues) {
		return (
			shouldShowDemoCredentials() &&
			values.email === DEMO_AUTH_CREDENTIALS.email &&
			values.password === DEMO_AUTH_CREDENTIALS.password
		);
	}

	const passwordLoginMutation = useMutation({
		mutationFn: async (values: LoginPasswordFormValues) => {
			const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, values);
			return response.data;
		},
		onSuccess: () => completeLogin(),
		onError: (error) => {
			Logger.error('Password login request failed.', {
				error,
				feature: 'auth',
				action: 'login-password',
			});
			passwordForm.setError('root', {
				message:
					error instanceof Error
						? error.message
						: 'Unable to sign in right now. Please try again.',
			});
		},
	});

	function applyDemoCredentials() {
		passwordForm.clearErrors();
		passwordForm.reset(
			{
				email: DEMO_AUTH_CREDENTIALS.email,
				password: DEMO_AUTH_CREDENTIALS.password,
			},
			{
				keepDefaultValues: true,
			},
		);
	}

	return {
		passwordForm,
		demoCredentials: DEMO_AUTH_CREDENTIALS,
		showDemoCredentials: shouldShowDemoCredentials(),
		applyDemoCredentials,
		submitPasswordLogin: passwordForm.handleSubmit(async (values) => {
			passwordForm.clearErrors('root');

			if (isDemoCredentialMatch(values)) {
				createDemoSession();
				await completeLogin();
				return;
			}

			await passwordLoginMutation.mutateAsync(values);
		}),
		isSubmittingPassword: passwordLoginMutation.isPending,
	};
}
