import { z } from 'zod';

export const ForgotPasswordRequestSchema = z.object({
	email: z.email('Enter a valid email address.'),
});

export type ForgotPasswordRequestValues = z.infer<typeof ForgotPasswordRequestSchema>;
