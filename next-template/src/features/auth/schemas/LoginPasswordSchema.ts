import { z } from 'zod';

export const LoginPasswordSchema = z.object({
	email: z.email('Enter a valid email address.'),
	password: z.string().min(8, 'Password must be at least 8 characters long.'),
});

export type LoginPasswordFormValues = z.infer<typeof LoginPasswordSchema>;
