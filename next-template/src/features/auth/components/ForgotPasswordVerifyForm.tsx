'use client';

import { FormEventHandler } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Button, Input, OTPInput } from '@core';
import { ForgotPasswordVerifyValues } from '../schemas/ForgotPasswordVerifySchema';

interface ForgotPasswordVerifyFormProps {
	email: string;
	control: Control<ForgotPasswordVerifyValues>;
	errors: FieldErrors<ForgotPasswordVerifyValues>;
	isSubmitting: boolean;
	isResending: boolean;
	canResend: boolean;
	remainingSeconds: number;
	onSubmit: FormEventHandler<HTMLFormElement>;
	onUseAnotherEmail: () => void;
	onResend: () => void;
}

export function ForgotPasswordVerifyForm({
	control,
	email,
	errors,
	canResend,
	isSubmitting,
	isResending,
	remainingSeconds,
	onResend,
	onSubmit,
	onUseAnotherEmail,
}: ForgotPasswordVerifyFormProps) {
	return (
		<form className='flex flex-col gap-6' onSubmit={onSubmit} noValidate>
			<Input label='Work email' value={email} readOnly />
			<Controller
				control={control}
				name='code'
				render={({ field }) => (
					<OTPInput
						label='Reset code'
						description='Enter the 6-digit code sent to your email.'
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
			<div className='flex gap-2'>
				<Button
					type='button'
					variant='ghost'
					intent='secondary'
					fullWidth
					onClick={onUseAnotherEmail}
				>
					Use another email
				</Button>
				<Button
					type='submit'
					fullWidth
					loading={isSubmitting}
					loadingText='Verifying code'
				>
					Verify code
				</Button>
			</div>
		</form>
	);
}
