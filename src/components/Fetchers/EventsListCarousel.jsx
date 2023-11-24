"use client";
import EventOdds from "@components/UI/EventOdds";
import LoadingEventCard from "@components/Loading/LoadingEventCard";
import Countdown from "@components/UI/Countdown";
import { apiUrl } from "@utils/constants/links";
import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import Button from "@components/Buttons/Button";

const getAllEvents = async () => {
	const res = await fetch(`${apiUrl}/events`, {
		next: { revalidate: 3600 },
	});

	if (!res) throw new Error("Failed to fetch events");
	return await res.json();
};

const getAllTeams = async () => {
	const res = await fetch(`${apiUrl}/teams`, {
		next: { revalidate: 3600 },
	});

	if (!res) throw new Error("Failed to fetch teams");
	return await res.json();
};

const EventsListCarousel = () => {
	const [events, setEvents] = useState([]);
	const [teams, setTeams] = useState([]);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchAllEventsAndTeams = async () => {
			try {
				const eventsData = await getAllEvents();
				setEvents(eventsData);
				const teamsData = await getAllTeams();
				setTeams(teamsData);
			} catch (error) {
				console.log(error);
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchAllEventsAndTeams();
	}, []);

	return isLoading ? (
		<>
			{Array.from({ length: 10 }, (_, index) => (
				<LoadingEventCard key={index} />
			))}
		</>
	) : (
		events.map((event, index) => {
			const homeTeam = teams.find((team) => team._id === event.home_team);
			const awayTeam = teams.find((team) => team._id === event.away_team);
			return (
				<div
					key={index}
					className="w-[300px] h-fit rounded-lg bg-slate-200 flex-shrink-0 transition-transform transform hover:scale-110 border border-slate-300 shadow-md p-4 flex flex-col"
				>
					{event.status === "live" ? (
						<div className="flex-center bg-red-500 text-sm text-white text-center uppercase font-bold px-2 py-2.5 rounded-sm w-fit h-5">
							<GoDotFill />
							live
						</div>
					) : (
						<div className="flex-between h-5">
							<div className="text-gray-700">
								{new Date(event.date).toLocaleDateString(
									"en-GB",
									{
										day: "2-digit",
										month: "2-digit",
										year: "numeric",
									}
								)}
							</div>
							{event.status === "scheduled" ? (
								<div className="mt-4 flex justify-between">
									<Countdown date={event.date} />
								</div>
							) : (
								<div>{event.status}</div>
							)}
						</div>
					)}
					<div className="flex-center space-x-4 h-16 mt-10">
						<Image
							src={homeTeam.logo}
							alt={homeTeam.name}
							width={100}
							height={100}
							className="rounded-full bg-white p-4"
						/>
						<div className="flex-center text-red-500 text-xl">
							vs
						</div>
						<Image
							src={awayTeam.logo}
							alt={awayTeam.name}
							width={100}
							height={100}
							className="rounded-full bg-white p-4"
						/>
					</div>
					<EventOdds
						className="grid grid-cols-3 gap-3 text-base uppercase font-bold w-full mt-10"
						oddClassName="flex-center rounded-md p-3 bg-white"
						odds={event.odds}
					/>
					<Link
						href={`/sportsbook/${event._id}`}
						className="flex-end mt-5"
					>
						<Button style="primary">Place bet</Button>
					</Link>
				</div>
			);
		})
	);
};

export default EventsListCarousel;
