import axios, { AxiosError } from 'axios';

export interface ApiErrorPayload {
	message: string;
	status?: number;
	code?: string;
	details?: unknown;
}

function normalizeApiError(error: AxiosError<ApiErrorPayload>) {
	const payload = error.response?.data;
	const nextError = new Error(
		payload?.message || error.message || 'Something went wrong while contacting the API.',
	) as Error & ApiErrorPayload;

	nextError.status = error.response?.status;
	nextError.code = payload?.code || error.code;
	nextError.details = payload?.details;

	return nextError;
}

export const apiClient = axios.create({
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 15000,
});

apiClient.interceptors.response.use(
	(response) => response,
	(error: AxiosError<ApiErrorPayload>) => Promise.reject(normalizeApiError(error)),
);
