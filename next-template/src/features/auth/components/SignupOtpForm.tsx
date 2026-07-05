'use client';

import { FormEventHandler } from 'react';

import { Control, Controller, FieldErrors } from 'react-hook-form';

import { Button, Input, OTPInput } from '@core';

import { SignupOtpFormValues } from '../schemas/SignupOtpSchema';

interface SignupOtpFormProps {
	email: string;
	errors: FieldErrors<SignupOtpFormValues>;
	control: Control<SignupOtpFormValues>;
	isSubmitting: boolean;
	isResending: boolean;
	canResend: boolean;
	remainingSeconds: number;
	onSubmit: FormEventHandler<HTMLFormElement>;
	onResend: () => void;
}

export function SignupOtpForm({
	control,
	email,
	errors,
	canResend,
	isSubmitting,
	isResending,
	remainingSeconds,
	onResend,
	onSubmit,
}: SignupOtpFormProps) {
	return (
		<form className='flex flex-col gap-6' onSubmit={onSubmit} noValidate>
			<Input label='Work email' value={email} readOnly disabled />
			<Controller
				control={control}
				name='code'
				render={({ field }) => (
					<OTPInput
						label='Verify your email'
						description='Enter the 6-digit code sent to your inbox.'
						value={field.value}
						onChange={field.onChange}
						errorMessage={errors.code?.message}
					/>
				)}
			/>
			{errors.root?.message ? (
				<p className='body-sm text-danger'>{errors.root.message}</p>
			) : null}
			<div className='flex items-center justify-between gap-4'>
				<Button
					type='button'
					variant='ghost'
					intent='secondary'
					size='sm'
					onClick={onResend}
					disabled={!canResend}
					loading={isResending}
					loadingText='Sending code...'
				>
					Resend code
				</Button>
				<p className='body-sm text-muted'>
					{canResend ? 'You can request another code.' : `Resend in ${remainingSeconds}s`}
				</p>
			</div>
			<Button
				type='submit'
				fullWidth
				loading={isSubmitting}
				loadingText='Verifying email'
			>
				Verify and continue
			</Button>
		</form>
	);
}
