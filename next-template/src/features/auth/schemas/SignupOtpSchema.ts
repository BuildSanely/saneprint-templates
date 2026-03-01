import { z } from 'zod';

export const SignupOtpSchema = z.object({
	code: z
		.string()
		.min(6, 'Enter the 6-digit code.')
		.max(6, 'Enter the 6-digit code.')
		.regex(/^\d{6}$/, 'Code must contain 6 digits.'),
});

export type SignupOtpFormValues = z.infer<typeof SignupOtpSchema>;
