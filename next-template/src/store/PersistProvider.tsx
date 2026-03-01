'use client';

import { PropsWithChildren } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store';

export function PersistProvider({ children }: PropsWithChildren) {
	return (
		<PersistGate loading={null} persistor={persistor}>
			{children}
		</PersistGate>
	);
}
