'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

import { Logger } from '@utils/logger';

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	state: ErrorBoundaryState = {
		hasError: false,
	};

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		Logger.error('A React error boundary captured an error.', {
			error,
			componentStack: errorInfo.componentStack,
			feature: 'core',
			action: 'error-boundary',
		});
	}

	render() {
		if (this.state.hasError) {
			return (
				this.props.fallback ?? (
					<div className='border-danger/30 bg-surface rounded-xl border p-8'>
						<p className='label text-danger'>Something went wrong</p>
						<p className='body-sm text-muted mt-1'>
							This section crashed while rendering. Check the logs for more details.
						</p>
					</div>
				)
			);
		}

		return this.props.children;
	}
}
