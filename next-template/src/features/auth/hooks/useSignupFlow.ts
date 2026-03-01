'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiClient, ENDPOINTS } from '@services';
import { Logger } from '@utils/logger';
import { AUTH_SESSION_QUERY_KEY } from './useAuth';
import { useOtpCooldown } from './useOtpCooldown';
import { SignupOtpFormValues, SignupOtpSchema } from '../schemas/SignupOtpSchema';
import { SignupFormValues, SignupSchema } from '../schemas/SignupSchema';

export function useSignupFlow() {
	const queryClient = useQueryClient();
	const router = useRouter();
	const [email, setEmail] = useState('');
	const verificationCooldown = useOtpCooldown();

	const signupForm = useForm<SignupFormValues>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		mode: 'onBlur',
	});

	const verifyForm = useForm<SignupOtpFormValues>({
		resolver: zodResolver(SignupOtpSchema),
		defaultValues: {
			code: '',
		},
		mode: 'onBlur',
	});

	const signupMutation = useMutation({
		mutationFn: async (values: SignupFormValues) => {
			const response = await apiClient.post(ENDPOINTS.AUTH.SIGN_UP, values);
			return response.data;
		},
		onSuccess: (_, values) => {
			setEmail(values.email);
			verificationCooldown.startCooldown();
		},
		onError: (error) => {
			Logger.error('Signup request failed.', {
				error,
				feature: 'auth',
				action: 'signup-request',
			});
			signupForm.setError('root', {
				message:
					error instanceof Error
						? error.message
						: 'Unable to create your account right now.',
			});
		},
	});

	const verifyMutation = useMutation({
		mutationFn: async (values: SignupOtpFormValues) => {
			const response = await apiClient.post(ENDPOINTS.AUTH.VERIFY_SIGN_UP_OTP, {
				email,
				code: values.code,
			});
			return response.data;
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: AUTH_SESSION_QUERY_KEY });
			router.push('/');
			router.refresh();
		},
		onError: (error) => {
			Logger.error('Signup OTP verification failed.', {
				error,
				feature: 'auth',
				action: 'signup-verify',
			});
			verifyForm.setError('root', {
				message:
					error instanceof Error ? error.message : 'Unable to verify your email code.',
			});
		},
	});

	const resendMutation = useMutation({
		mutationFn: async () => {
			const response = await apiClient.post(ENDPOINTS.AUTH.RESEND_SIGN_UP_OTP, {
				email,
			});
			return response.data;
		},
		onSuccess: () => {
			verificationCooldown.startCooldown();
		},
		onError: (error) => {
			Logger.error('Signup OTP resend failed.', {
				error,
				feature: 'auth',
				action: 'signup-resend',
			});
			verifyForm.setError('root', {
				message:
					error instanceof Error
						? error.message
						: 'Unable to resend your email code right now.',
			});
		},
	});

	async function resendVerificationCode() {
		if (!email || !verificationCooldown.canResend || resendMutation.isPending) {
			return;
		}

		verifyForm.clearErrors('root');
		await resendMutation.mutateAsync();
	}

	return {
		email,
		signupForm,
		verifyForm,
		submitSignup: signupForm.handleSubmit(async (values) => {
			signupForm.clearErrors('root');
			await signupMutation.mutateAsync(values);
		}),
		submitVerification: verifyForm.handleSubmit(async (values) => {
			verifyForm.clearErrors('root');
			await verifyMutation.mutateAsync(values);
		}),
		resendVerificationCode,
		isSubmittingSignup: signupMutation.isPending,
		isVerifyingEmail: verifyMutation.isPending,
		isResendingVerificationCode: resendMutation.isPending,
		canResendVerificationCode: verificationCooldown.canResend,
		verificationCooldownSeconds: verificationCooldown.remainingSeconds,
	};
}
