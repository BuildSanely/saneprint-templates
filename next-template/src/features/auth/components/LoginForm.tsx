'use client';

import { Button, Input, LinkAsButton } from '@core';

import { useLoginFlow } from '../hooks/useLoginFlow';

export function LoginForm() {
	const {
		applyDemoCredentials,
		demoCredentials,
		isSubmittingPassword,
		passwordForm,
		showDemoCredentials,
		submitPasswordLogin,
	} = useLoginFlow();

	return (
		<form className='flex flex-col gap-6' onSubmit={submitPasswordLogin} noValidate>
			<Input
				label='Work email'
				type='email'
				placeholder='name@company.com'
				autoComplete='email'
				errorMessage={passwordForm.formState.errors.email?.message}
				{...passwordForm.register('email')}
			/>
			<Input
				label='Password'
				type='password'
				placeholder='Enter your password'
				autoComplete='current-password'
				errorMessage={passwordForm.formState.errors.password?.message}
				{...passwordForm.register('password')}
			/>
			{passwordForm.formState.errors.root?.message ? (
				<p className='body-sm text-danger'>
					{passwordForm.formState.errors.root.message}
				</p>
			) : null}
			<Button
				type='submit'
				fullWidth
				loading={isSubmittingPassword}
				loadingText='Signing in'
			>
				Sign in with password
			</Button>
			{showDemoCredentials ? (
				<div className='border-border bg-background rounded-xl border p-4'>
					<div className='flex items-start justify-between gap-4'>
						<div className='space-y-1'>
							<p className='label text-foreground'>Demo credentials</p>
							<p className='body-sm text-muted'>{demoCredentials.email}</p>
							<p className='body-sm text-muted'>{demoCredentials.password}</p>
						</div>
						<Button
							type='button'
							size='sm'
							variant='outlined'
							intent='secondary'
							onClick={applyDemoCredentials}
						>
							Use demo
						</Button>
					</div>
				</div>
			) : null}
			<div className='flex items-center justify-end gap-4'>
				<LinkAsButton
					href='/forgot-password'
					variant='ghost'
					intent='secondary'
					size='sm'
				>
					Forgot password?
				</LinkAsButton>
			</div>
		</form>
	);
}
