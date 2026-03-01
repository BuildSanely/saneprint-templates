'use client';

import { Button } from '../form/Button';
import { notify } from '@utils/notify';

export function ToastShowcase() {
	function showPromiseToast() {
		void notify.promise(
			new Promise((resolve) => {
				setTimeout(() => resolve('Published'), 1200);
			}),
			{
				loading: 'Publishing project',
				success: 'Project published successfully',
				error: 'Unable to publish project',
			},
		);
	}

	return (
		<div className='flex flex-wrap gap-2'>
			<Button
				type='button'
				size='sm'
				onClick={() => notify.success('Saved successfully')}
			>
				Success toast
			</Button>
			<Button
				type='button'
				size='sm'
				intent='secondary'
				onClick={() => notify.info('Background sync started')}
			>
				Info toast
			</Button>
			<Button
				type='button'
				size='sm'
				intent='danger'
				variant='outlined'
				onClick={() => notify.error('Something went wrong')}
			>
				Error toast
			</Button>
			<Button
				type='button'
				size='sm'
				variant='ghost'
				intent='secondary'
				onClick={showPromiseToast}
			>
				Promise toast
			</Button>
		</div>
	);
}
