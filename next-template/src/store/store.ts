import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { rootReducer } from './rootReducer';

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					'persist/PERSIST',
					'persist/REHYDRATE',
					'persist/PAUSE',
					'persist/PURGE',
					'persist/REGISTER',
					'persist/FLUSH',
				],
			},
		}),
	devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
