'use client';

import { LinkAsButton } from '@core';

import { ForgotPasswordRequestForm } from './ForgotPasswordRequestForm';
import { ForgotPasswordVerifyForm } from './ForgotPasswordVerifyForm';
import { ResetPasswordForm } from './ResetPasswordForm';
import { useForgotPasswordFlow } from '../hooks/useForgotPasswordFlow';

export function ForgotPasswordFlow() {
	const {
		isRequestingReset,
		canResendResetCode,
		isResendingResetCode,
		isVerifyingResetCode,
		isResettingPassword,
		requestForm,
		resendResetCode,
		resetCodeCooldownSeconds,
		returnToRequestStep,
		submitVerification,
		resetForm,
		step,
		submitRequest,
		submitReset,
		verifyForm,
	} = useForgotPasswordFlow();

	if (step === 'success') {
		return (
			<div className='flex flex-col gap-6'>
				<div className='border-border bg-background rounded-lg border p-6'>
					<p className='label text-foreground'>Password updated</p>
					<p className='body-sm text-muted mt-1'>
						Your password has been reset successfully. You can now sign in.
					</p>
				</div>
				<LinkAsButton href='/login' fullWidth>
					Back to login
				</LinkAsButton>
			</div>
		);
	}

	return step === 'request' ? (
		<ForgotPasswordRequestForm
			errors={requestForm.formState.errors}
			isSubmitting={isRequestingReset}
			onSubmit={submitRequest}
			register={requestForm.register}
		/>
	) : step === 'verify' ? (
		<ForgotPasswordVerifyForm
			email={verifyForm.getValues('email')}
			control={verifyForm.control}
			errors={verifyForm.formState.errors}
			canResend={canResendResetCode}
			isSubmitting={isVerifyingResetCode}
			isResending={isResendingResetCode}
			onSubmit={submitVerification}
			onResend={resendResetCode}
			remainingSeconds={resetCodeCooldownSeconds}
			onUseAnotherEmail={returnToRequestStep}
		/>
	) : (
		<ResetPasswordForm
			errors={resetForm.formState.errors}
			isSubmitting={isResettingPassword}
			onSubmit={submitReset}
			register={resetForm.register}
		/>
	);
}
