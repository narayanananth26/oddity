import Button from "@components/Buttons/Button";
import EventBetsPlaced from "@components/UI/EventBetsPlaced";
import EventVenue from "@components/UI/EventVenue";
import EventOdds from "@components/UI/EventOdds";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";

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
			<div className="bg-white rounded-lg overflow-hidden border border-slate-300 shadow-md p-4 flex flex-col gap-3">
				{event.status === "live" ? (
					<div className="flex-center bg-red-500 text-sm text-white text-center uppercase font-bold px-2 py-2.5 rounded-sm w-fit h-5">
						<GoDotFill />
						live
					</div>
				) : (
					<div className="flex-between h-5">
						<div className="text-gray-700">
							{new Date(event.date).toLocaleDateString("en-GB", {
								day: "2-digit",
								month: "2-digit",
								year: "numeric",
							})}
						</div>
						{event.status === "scheduled" ? (
							<div className="mt-4 flex justify-between">
								<div>
									{countdown.minutes || countdown.seconds ? (
										<p className="text-gray-700">
											{countdown.days}d {countdown.hours}h{" "}
											{countdown.minutes}m{" "}
											{countdown.seconds}s
										</p>
									) : null}
								</div>
							</div>
						) : (
							<div>{event.status}</div>
						)}
					</div>
				)}
				<h2 className="text-xl text-red-500 font-semibold mb-2 h-20 text-center">
					{event.name}
				</h2>
				<div className="flex-center space-x-4 h-16">
					<Image
						src={homeTeam.logo}
						alt={homeTeam.name}
						width={100}
						height={100}
						className="rounded-full bg-slate-200 p-4"
					/>
					<div className="flex-center text-red-500 text-xl">vs</div>
					<Image
						src={awayTeam.logo}
						alt={awayTeam.name}
						width={100}
						height={100}
						className="rounded-full bg-slate-200 p-4"
					/>
				</div>
				<EventOdds
					className="grid grid-cols-3 gap-3 text-base uppercase font-bold w-full mt-10"
					oddClassName="flex-center rounded-md p-3 bg-slate-200"
					odds={event.odds}
				/>
				<div className="flex-between text-slate-500">
					<EventVenue venue={event.venue} />
					<EventBetsPlaced betsPlaced={event.bets_placed} />
				</div>

				<Link href="/sportsbook" className="flex-end">
					<Button style="primary">Place bet</Button>
				</Link>
			</div>
		)
	);
};

export default EventCard;
