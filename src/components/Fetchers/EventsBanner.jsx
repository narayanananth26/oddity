"use client";
import LoadingImageBanner from "@components/Loading/LoadingImageBanner";
import EventBetsPlaced from "@components/UI/EventBetsPlaced";
import EventVenue from "@components/UI/EventVenue";
import EventOdds from "@components/UI/EventOdds";
import { apiUrl } from "@utils/constants/links";
import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import { HiChevronRight } from "react-icons/hi2";

const getAllEvents = async () => {
	const res = await fetch(`${apiUrl}/events`, { next: { revalidate: 3600 } });

	if (!res) throw new Error("Failed to fetch events");
	return await res.json();
};

const getAllTeams = async () => {
	const res = await fetch(`${apiUrl}/teams`, { next: { revalidate: 3600 } });

	if (!res) throw new Error("Failed to fetch teams");
	return await res.json();
};

const EventsBanner = () => {
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
	console.log(events, teams);

	// Filter live events
	const liveEvents = events.filter((event) => event.status === "live");

	// Select the first live event (if any)
	const event = liveEvents.length > 0 ? liveEvents[0] : null;

	const homeTeam = teams.find((team) => team._id === event.home_team);
	const awayTeam = teams.find((team) => team._id === event.away_team);
	return isLoading ? (
		<LoadingImageBanner />
	) : event ? (
		<section className="w-screen h-screen bg-slate-100 overflow-hidden flex flex-col relative pt-24">
			<div className="flex-center mb-5 gap-10">
				<h2 className="flex-center text-slate-500 text-xl uppercase font-bold">
					{event.name}
				</h2>{" "}
				{" | "}
				<EventVenue
					venue={event.venue}
					className="text-slate-500 uppercase"
				/>
			</div>
			<div className="flex-center gap-10 mb-5">
				<div className="bg-slate-200 rounded-xl p-10">
					<Image
						src={homeTeam.logo}
						alt={homeTeam.name}
						width={125}
						height={125}
						className="rounded-full bg-white p-4"
					/>
				</div>
				<div className="flex flex-col gap-5">
					<div className="flex-center bg-red-500 text-lg text-white text-center uppercase font-bold px-2 py-2 rounded-sm w-fit">
						<GoDotFill />
						live
					</div>
					<EventBetsPlaced betsPlaced={event.bets_placed} />
				</div>
				<div className="bg-slate-200 rounded-xl p-10">
					<Image
						src={awayTeam.logo}
						alt={awayTeam.name}
						width={125}
						height={125}
						className="rounded-full bg-white p-4"
					/>
				</div>
			</div>
			<EventOdds
				className="grid grid-cols-3 gap-3 text-base uppercase font-bold px-24 mb-5"
				oddClassName="flex-center rounded-md p-3 bg-slate-200"
				odds={event.odds}
			/>
			<div className="flex flex-col flex-center gap-2 w-full">
				<h1 className="text-center text-7xl uppercase text-red-500 font-bold">
					{event.description}
				</h1>
			</div>

			<div
				className={`flex-center text-3xl font-bold uppercase absolute bottom-0 left-1/2 transform -translate-x-1/2 px-6 py-3 mt-10`}
			>
				<Link
					href={`/sportsbook/${event.slug}`}
					className="relative pb-2 underline_animation after:bg-red-500 after:h-1"
				>
					Wager Now
				</Link>{" "}
				<HiChevronRight className="text-red-500" />
			</div>
		</section>
	) : (
		<div>No live events</div>
	);
};

export default EventsBanner;
