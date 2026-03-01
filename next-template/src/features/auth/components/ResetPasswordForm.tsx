'use client';

import { FormEventHandler } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Button, Input } from '@core';
import { ForgotPasswordResetValues } from '../schemas/ForgotPasswordResetSchema';

interface ResetPasswordFormProps {
	errors: FieldErrors<ForgotPasswordResetValues>;
	isSubmitting: boolean;
	onSubmit: FormEventHandler<HTMLFormElement>;
	register: UseFormRegister<ForgotPasswordResetValues>;
}

export function ResetPasswordForm({
	errors,
	isSubmitting,
	onSubmit,
	register,
}: ResetPasswordFormProps) {
	return (
		<form className='flex flex-col gap-6' onSubmit={onSubmit} noValidate>
			<Input label='Work email' readOnly {...register('email')} />
			<Input
				label='New password'
				type='password'
				autoComplete='new-password'
				errorMessage={errors.password?.message}
				{...register('password')}
			/>
			<Input
				label='Confirm new password'
				type='password'
				autoComplete='new-password'
				errorMessage={errors.confirmPassword?.message}
				{...register('confirmPassword')}
			/>
			{errors.root?.message ? (
				<p className='body-sm text-danger'>{errors.root.message}</p>
			) : null}
			<Button
				type='submit'
				fullWidth
				loading={isSubmitting}
				loadingText='Resetting password'
			>
				Reset password
			</Button>
		</form>
	);
}
