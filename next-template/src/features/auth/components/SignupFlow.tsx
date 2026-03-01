'use client';

import { SignupForm } from './SignupForm';
import { SignupOtpForm } from './SignupOtpForm';
import { useSignupFlow } from '../hooks/useSignupFlow';

export function SignupFlow() {
	const {
		email,
		canResendVerificationCode,
		isSubmittingSignup,
		isResendingVerificationCode,
		isVerifyingEmail,
		resendVerificationCode,
		signupForm,
		submitSignup,
		submitVerification,
		verificationCooldownSeconds,
		verifyForm,
	} = useSignupFlow();

	return email ? (
		<SignupOtpForm
			email={email}
			control={verifyForm.control}
			errors={verifyForm.formState.errors}
			canResend={canResendVerificationCode}
			isSubmitting={isVerifyingEmail}
			isResending={isResendingVerificationCode}
			onSubmit={submitVerification}
			onResend={resendVerificationCode}
			remainingSeconds={verificationCooldownSeconds}
		/>
	) : (
		<SignupForm
			errors={signupForm.formState.errors}
			isSubmitting={isSubmittingSignup}
			onSubmit={submitSignup}
			register={signupForm.register}
		/>
	);
}
