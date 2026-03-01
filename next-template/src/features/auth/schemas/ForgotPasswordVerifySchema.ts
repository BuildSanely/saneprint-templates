import { z } from 'zod';

export const ForgotPasswordVerifySchema = z.object({
	email: z.email('Enter a valid email address.'),
	code: z
		.string()
		.min(6, 'Enter the 6-digit code.')
		.max(6, 'Enter the 6-digit code.')
		.regex(/^\d{6}$/, 'Code must contain 6 digits.'),
});

export type ForgotPasswordVerifyValues = z.infer<typeof ForgotPasswordVerifySchema>;
