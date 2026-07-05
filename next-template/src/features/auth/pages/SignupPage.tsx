import AuthWrapper from '@/features/auth/components/AuthWrapper';
import { LinkAsButton } from '@core';

import { SignupFlow } from '../components/SignupFlow';

export function SignupPage() {
	return (
		<AuthWrapper title='Create your account' subtitle='Join thousands of teams building.'>
			<SignupFlow />
			<div className='border-border/50 flex items-center justify-between gap-4 border-t pt-5'>
				<p className='body-sm text-muted'>Already have an account?</p>
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
