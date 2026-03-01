import { toast } from 'sonner';

export const notify = {
	success: (message: string, description?: string) =>
		toast.success(message, description ? { description } : undefined),
	error: (message: string, description?: string) =>
		toast.error(message, description ? { description } : undefined),
	info: (message: string, description?: string) =>
		toast(message, description ? { description } : undefined),
	loading: (message: string, description?: string) =>
		toast.loading(message, description ? { description } : undefined),
	promise: <T>(
		promise: Promise<T>,
		messages: {
			loading: string;
			success: string;
			error: string;
		},
	) =>
		toast.promise(promise, {
			loading: messages.loading,
			success: messages.success,
			error: messages.error,
		}),
	dismiss: (toastId?: string | number) => toast.dismiss(toastId),
};
