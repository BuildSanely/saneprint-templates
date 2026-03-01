type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
	[key: string]: unknown;
}

interface LogEntry {
	level: LogLevel;
	message: string;
	context?: LogContext;
	timestamp: string;
}

interface LoggerTransport {
	debug?(entry: LogEntry): void;
	info?(entry: LogEntry): void;
	warn?(entry: LogEntry): void;
	error?(entry: LogEntry): void;
}

const isProduction = process.env.NODE_ENV === 'production';

function createLogEntry(
	level: LogLevel,
	message: string,
	context?: LogContext,
): LogEntry {
	return {
		level,
		message,
		context,
		timestamp: new Date().toISOString(),
	};
}

function writeConsole(entry: LogEntry) {
	if (isProduction && entry.level !== 'error') {
		return;
	}

	const payload = entry.context ? [entry.message, entry.context] : [entry.message];
	switch (entry.level) {
		case 'debug':
			console.debug(...payload);
			break;
		case 'info':
			console.info(...payload);
			break;
		case 'warn':
			console.warn(...payload);
			break;
		case 'error':
			console.error(...payload);
			break;
	}
}

function writeExternal(entry: LogEntry) {
	if (!isProduction) {
		return;
	}

	// Hook production observability providers here.
	// Examples: Sentry.captureException, datadogLogs.logger.error, etc.
	void entry;
}

const defaultTransport: LoggerTransport = {
	debug: writeConsole,
	info: writeConsole,
	warn: writeConsole,
	error(entry) {
		writeConsole(entry);
		writeExternal(entry);
	},
};

let activeTransport: LoggerTransport = defaultTransport;

function log(level: LogLevel, message: string, context?: LogContext) {
	const entry = createLogEntry(level, message, context);
	activeTransport[level]?.(entry);
}

export const Logger = {
	setTransport(transport: LoggerTransport) {
		activeTransport = transport;
	},
	resetTransport() {
		activeTransport = defaultTransport;
	},
	debug(message: string, context?: LogContext) {
		log('debug', message, context);
	},
	info(message: string, context?: LogContext) {
		log('info', message, context);
	},
	warn(message: string, context?: LogContext) {
		log('warn', message, context);
	},
	error(message: string, context?: LogContext) {
		log('error', message, context);
	},
};

export type { LogContext, LogEntry, LoggerTransport };
