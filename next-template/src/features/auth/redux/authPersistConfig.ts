import storage from '@store/persistConfig';

export const authPersistConfig = {
	key: 'auth',
	storage,
	whitelist: ['isAuthenticated', 'status', 'user'],
};
