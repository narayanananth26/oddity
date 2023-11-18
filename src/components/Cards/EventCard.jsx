import Image from "next/image";
import { useEffect, useState } from "react";

const EventCard = ({ event, teams }) => {
	const homeTeam = teams.find((team) => team._id === event.home_team);
	const awayTeam = teams.find((team) => team._id === event.away_team);
	const calculateCountdown = () => {
		const eventDate = new Date(event.date);
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

		return { days, hours, minutes, seconds };
	};

	const [countdown, setCountdown] = useState(calculateCountdown);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCountdown(calculateCountdown());
		}, 1000);

		// Cleanup the interval on component unmount
		return () => clearInterval(intervalId);
	}, [event.date]); // Include event.date in the dependency array

	return (
		event &&
		teams.length && (
			<div className="bg-white rounded-lg overflow-hidden shadow-md">
				{console.log(homeTeam)}
				<div className="p-4">
					<div className="flex space-x-4">
						<Image
							src={homeTeam.logo}
							alt={homeTeam.name}
							width={200}
							height={200}
						/>
						<div className="flex-center text-red-500 text-xl">
							vs
						</div>
						<Image
							src={awayTeam.logo}
							alt={awayTeam.name}
							width={200}
							height={200}
						/>
					</div>
					<h2 className="text-xl font-semibold mb-2">{event.name}</h2>
					<p className="text-gray-600">{event.description}</p>

					<div className="mt-4 flex justify-between">
						<div>
							<p className="text-gray-700">
								Date:{" "}
								{new Date(event.date).toLocaleDateString(
									"en-GB",
									{
										day: "2-digit",
										month: "2-digit",
										year: "numeric",
									}
								)}
							</p>
							<p className="text-gray-700">
								Countdown: {countdown.days}d {countdown.hours}h{" "}
								{countdown.minutes}m {countdown.seconds}s
							</p>
							<p className="text-gray-700">
								Venue: {event.venue.name}
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default EventCard;
