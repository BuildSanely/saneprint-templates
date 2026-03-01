'use client';

import { FormEventHandler } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Button, Input } from '@core';
import { ForgotPasswordRequestValues } from '../schemas/ForgotPasswordRequestSchema';

interface ForgotPasswordRequestFormProps {
	errors: FieldErrors<ForgotPasswordRequestValues>;
	isSubmitting: boolean;
	onSubmit: FormEventHandler<HTMLFormElement>;
	register: UseFormRegister<ForgotPasswordRequestValues>;
}

export function ForgotPasswordRequestForm({
	errors,
	isSubmitting,
	onSubmit,
	register,
}: ForgotPasswordRequestFormProps) {
	return (
		<form className='flex flex-col gap-6' onSubmit={onSubmit} noValidate>
			<Input
				label='Work email'
				type='email'
				placeholder='name@company.com'
				autoComplete='email'
				errorMessage={errors.email?.message}
				{...register('email')}
			/>
			{errors.root?.message ? (
				<p className='body-sm text-danger'>{errors.root.message}</p>
			) : null}
			<Button
				type='submit'
				fullWidth
				loading={isSubmitting}
				loadingText='Sending reset code'
			>
				Send reset code
			</Button>
		</form>
	);
}
