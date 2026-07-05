import 'server-only';

import { clientEnv } from '@/config/client-env';

export const serverEnv = {
	AUTH_SESSION_COOKIE_NAME:
		process.env.AUTH_SESSION_COOKIE_NAME?.trim() ||
		clientEnv.NEXT_PUBLIC_AUTH_SESSION_COOKIE_NAME,
} as const;
