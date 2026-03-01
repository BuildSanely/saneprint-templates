import { z } from 'zod';

export const ForgotPasswordResetSchema = z
	.object({
		email: z.email('Enter a valid email address.'),
		password: z.string().min(8, 'Password must be at least 8 characters long.'),
		confirmPassword: z
			.string()
			.min(8, 'Confirm password must be at least 8 characters long.'),
	})
	.refine((values) => values.password === values.confirmPassword, {
		message: 'Passwords do not match.',
		path: ['confirmPassword'],
	});

export type ForgotPasswordResetValues = z.infer<typeof ForgotPasswordResetSchema>;
