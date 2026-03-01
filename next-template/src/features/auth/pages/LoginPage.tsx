import { LinkAsButton } from '@core';
import { LoginForm } from '../components/LoginForm';
import AuthWrapper from '@/features/auth/components/AuthWrapper';

export function LoginPage() {
	return (
		<AuthWrapper
			title='Welcome back'
			subtitle='Enter your credentials to access your workspace.'
		>
			<LoginForm />
			<div className='border-border/50 flex items-center justify-between gap-4 border-t pt-5'>
				<p className='body-sm text-muted'>New to this?</p>
				<LinkAsButton
					href='/signup'
					variant='ghost'
					intent='secondary'
					size='sm'
					className='font-semibold'
				>
					Create account →
				</LinkAsButton>
			</div>
		</AuthWrapper>
	);
}

export default LoginPage;
