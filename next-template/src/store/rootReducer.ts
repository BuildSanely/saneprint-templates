import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '@auth/redux/authSlice';
import { authPersistConfig } from '@auth/redux/authPersistConfig';
import { persistReducer } from 'redux-persist';

export const rootReducer = combineReducers({
	auth: persistReducer(authPersistConfig, authReducer),
});

export type RootReducerState = ReturnType<typeof rootReducer>;
