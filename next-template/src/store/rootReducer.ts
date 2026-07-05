import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import { authPersistConfig } from '@auth/redux/authPersistConfig';
import { authReducer } from '@auth/redux/authSlice';

export const rootReducer = combineReducers({
	auth: persistReducer(authPersistConfig, authReducer),
});

export type RootReducerState = ReturnType<typeof rootReducer>;
