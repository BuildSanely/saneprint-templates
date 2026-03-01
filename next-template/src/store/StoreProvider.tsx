'use client';

import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { PersistProvider } from './PersistProvider';
import { store } from './store';

export function StoreProvider({ children }: PropsWithChildren) {
	return (
		<Provider store={store}>
			<PersistProvider>{children}</PersistProvider>
		</Provider>
	);
}
