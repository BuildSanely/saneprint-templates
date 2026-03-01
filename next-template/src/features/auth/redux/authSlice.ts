import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AuthUser {
	id: string;
	email: string;
	name?: string;
	avatarUrl?: string;
	role?: string;
	[key: string]: unknown;
}

interface AuthState {
	status: 'idle' | 'loading' | 'authenticated' | 'guest';
	isAuthenticated: boolean;
	user: AuthUser | null;
}

const initialState: AuthState = {
	status: 'idle',
	isAuthenticated: false,
	user: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthLoading(state) {
			state.status = 'loading';
		},
		setAuthenticated(state, action: PayloadAction<AuthUser>) {
			state.status = 'authenticated';
			state.isAuthenticated = true;
			state.user = action.payload;
		},
		clearAuth(state) {
			state.status = 'guest';
			state.isAuthenticated = false;
			state.user = null;
		},
	},
});

export const { clearAuth, setAuthenticated, setAuthLoading } = authSlice.actions;
export const authReducer = authSlice.reducer;
