import AuthWrapper from '@/features/auth/components/AuthWrapper';
import { LinkAsButton } from '@core';

import { ForgotPasswordFlow } from '../components/ForgotPasswordFlow';

export function ForgotPasswordPage() {
	return (
		<AuthWrapper
			title='Forgot your password?'
			subtitle='Enter your email to receive password reset instructions.'
		>
			<ForgotPasswordFlow />
			<div className='border-border/50 flex items-center justify-between gap-4 border-t pt-5'>
				<p className='body-sm text-muted'>Remembered your password?</p>
				<LinkAsButton
					href='/login'
					variant='ghost'
					intent='secondary'
					size='sm'
					className='font-semibold'
				>
					← Back to login
				</LinkAsButton>
			</div>
		</AuthWrapper>
	);
}
