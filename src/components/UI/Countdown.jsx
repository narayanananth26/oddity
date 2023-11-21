import { useEffect, useState } from "react";

const Countdown = ({ date }) => {
	const calculateCountdown = () => {
		const eventDate = new Date(date);
		const currentDate = new Date();

		if (eventDate > currentDate) {
			const timeDifference = eventDate.getTime() - currentDate.getTime();
			const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor(
				(timeDifference % (1000 * 60 * 60)) / (1000 * 60)
			);
			const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

			return { days, hours, minutes, seconds };
		} else {
			// Event date is in the past, return countdown values as 0
			return { days: 0, hours: 0, minutes: 0, seconds: 0 };
		}
	};

	const [countdown, setCountdown] = useState(calculateCountdown);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCountdown(calculateCountdown());
		}, 1000);

		// Cleanup the interval on component unmount
		return () => clearInterval(intervalId);
	}, [date]);
	return (
		<div>
			{countdown.minutes || countdown.seconds ? (
				<p className="text-gray-700">
					{countdown.days}d {countdown.hours}h {countdown.minutes}m{" "}
					{countdown.seconds}s
				</p>
			) : null}
		</div>
	);
};

export default Countdown;
