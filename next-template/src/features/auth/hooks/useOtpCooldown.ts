'use client';

import { useEffect, useState } from 'react';

const DEFAULT_COOLDOWN_SECONDS = 30;

export function useOtpCooldown(cooldownSeconds = DEFAULT_COOLDOWN_SECONDS) {
	const [remainingSeconds, setRemainingSeconds] = useState(0);

	useEffect(() => {
		if (remainingSeconds <= 0) {
			return;
		}

		const intervalId = window.setInterval(() => {
			setRemainingSeconds((currentSeconds) =>
				currentSeconds <= 1 ? 0 : currentSeconds - 1,
			);
		}, 1000);

		return () => {
			window.clearInterval(intervalId);
		};
	}, [remainingSeconds]);

	return {
		remainingSeconds,
		canResend: remainingSeconds === 0,
		startCooldown: () => setRemainingSeconds(cooldownSeconds),
	};
}
