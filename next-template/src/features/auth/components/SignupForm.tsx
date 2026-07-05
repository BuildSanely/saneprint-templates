'use client';

import { FormEventHandler } from 'react';

import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Button, Input } from '@core';

import { SignupFormValues } from '../schemas/SignupSchema';

interface SignupFormProps {
	errors: FieldErrors<SignupFormValues>;
	isSubmitting: boolean;
	onSubmit: FormEventHandler<HTMLFormElement>;
	register: UseFormRegister<SignupFormValues>;
}

export function SignupForm({
	errors,
	isSubmitting,
	onSubmit,
	register,
}: SignupFormProps) {
	return (
		<form className='flex flex-col gap-6' onSubmit={onSubmit} noValidate>
			<Input
				label='Full name'
				placeholder='Jordan Lee'
				errorMessage={errors.name?.message}
				{...register('name')}
			/>
			<Input
				label='Work email'
				type='email'
				placeholder='name@company.com'
				autoComplete='email'
				errorMessage={errors.email?.message}
				{...register('email')}
			/>
			<Input
				label='Password'
				type='password'
				autoComplete='new-password'
				errorMessage={errors.password?.message}
				{...register('password')}
			/>
			<Input
				label='Confirm password'
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
				loadingText='Creating account'
			>
				Create account
			</Button>
		</form>
	);
}
