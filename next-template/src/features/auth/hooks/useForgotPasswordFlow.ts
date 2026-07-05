'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { apiClient, ENDPOINTS } from '@services';
import { Logger } from '@utils/logger';

import { useOtpCooldown } from './useOtpCooldown';
import {
	ForgotPasswordRequestSchema,
	ForgotPasswordRequestValues,
} from '../schemas/ForgotPasswordRequestSchema';
import {
	ForgotPasswordResetSchema,
	ForgotPasswordResetValues,
} from '../schemas/ForgotPasswordResetSchema';
import {
	ForgotPasswordVerifySchema,
	ForgotPasswordVerifyValues,
} from '../schemas/ForgotPasswordVerifySchema';

export function useForgotPasswordFlow() {
	const [step, setStep] = useState<'request' | 'verify' | 'reset' | 'success'>('request');
	const verificationCooldown = useOtpCooldown();

	const requestForm = useForm<ForgotPasswordRequestValues>({
		resolver: zodResolver(ForgotPasswordRequestSchema),
		defaultValues: {
			email: '',
		},
		mode: 'onBlur',
	});

	const verifyForm = useForm<ForgotPasswordVerifyValues>({
		resolver: zodResolver(ForgotPasswordVerifySchema),
		defaultValues: {
			email: '',
			code: '',
		},
		mode: 'onBlur',
	});

	const resetForm = useForm<ForgotPasswordResetValues>({
		resolver: zodResolver(ForgotPasswordResetSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		mode: 'onBlur',
	});

	const requestMutation = useMutation({
		mutationFn: async (values: ForgotPasswordRequestValues) => {
			const response = await apiClient.post(
				ENDPOINTS.AUTH.FORGOT_PASSWORD_REQUEST,
				values,
			);
			return response.data;
		},
		onSuccess: (_, values) => {
			verifyForm.reset({
				email: values.email,
				code: '',
			});
			verificationCooldown.startCooldown();
			setStep('verify');
		},
		onError: (error) => {
			Logger.error('Forgot password request failed.', {
				error,
				feature: 'auth',
				action: 'forgot-password-request',
			});
			requestForm.setError('root', {
				message:
					error instanceof Error
						? error.message
						: 'Unable to send a reset code right now.',
			});
		},
	});

	const verifyMutation = useMutation({
		mutationFn: async (values: ForgotPasswordVerifyValues) => {
			const response = await apiClient.post(
				ENDPOINTS.AUTH.FORGOT_PASSWORD_VERIFY_OTP,
				values,
			);
			return response.data;
		},
		onSuccess: (_, values) => {
			resetForm.reset({
				email: values.email,
				password: '',
				confirmPassword: '',
			});
			setStep('reset');
		},
		onError: (error) => {
			Logger.error('Forgot password verification failed.', {
				error,
				feature: 'auth',
				action: 'forgot-password-verify',
			});
			verifyForm.setError('root', {
				message:
					error instanceof Error
						? error.message
						: 'Unable to verify your reset code right now.',
			});
		},
	});

	const resetMutation = useMutation({
		mutationFn: async (values: ForgotPasswordResetValues) => {
			const response = await apiClient.post(ENDPOINTS.AUTH.FORGOT_PASSWORD_RESET, values);
			return response.data;
		},
		onSuccess: () => {
			setStep('success');
		},
		onError: (error) => {
			Logger.error('Password reset failed.', {
				error,
				feature: 'auth',
				action: 'forgot-password-reset',
			});
			resetForm.setError('root', {
				message:
					error instanceof Error
						? error.message
						: 'Unable to reset your password right now.',
			});
		},
	});

	const resendMutation = useMutation({
		mutationFn: async () => {
			const response = await apiClient.post(ENDPOINTS.AUTH.FORGOT_PASSWORD_REQUEST, {
				email: verifyForm.getValues('email'),
			});
			return response.data;
		},
		onSuccess: () => {
			verificationCooldown.startCooldown();
		},
		onError: (error) => {
			Logger.error('Forgot password OTP resend failed.', {
				error,
				feature: 'auth',
				action: 'forgot-password-resend',
			});
			verifyForm.setError('root', {
				message:
					error instanceof Error
						? error.message
						: 'Unable to resend your reset code right now.',
			});
		},
	});

	return {
		step,
		setStep,
		requestForm,
		verifyForm,
		resetForm,
		submitRequest: requestForm.handleSubmit(async (values) => {
			requestForm.clearErrors('root');
			await requestMutation.mutateAsync(values);
		}),
		submitVerification: verifyForm.handleSubmit(async (values) => {
			verifyForm.clearErrors('root');
			await verifyMutation.mutateAsync(values);
		}),
		submitReset: resetForm.handleSubmit(async (values) => {
			resetForm.clearErrors('root');
			await resetMutation.mutateAsync(values);
		}),
		returnToRequestStep: () => {
			requestForm.setValue('email', verifyForm.getValues('email'), {
				shouldDirty: true,
			});
			setStep('request');
		},
		resendResetCode: async () => {
			if (!verificationCooldown.canResend || resendMutation.isPending) {
				return;
			}

			verifyForm.clearErrors('root');
			await resendMutation.mutateAsync();
		},
		isRequestingReset: requestMutation.isPending,
		isVerifyingResetCode: verifyMutation.isPending,
		isResettingPassword: resetMutation.isPending,
		isResendingResetCode: resendMutation.isPending,
		canResendResetCode: verificationCooldown.canResend,
		resetCodeCooldownSeconds: verificationCooldown.remainingSeconds,
	};
}
