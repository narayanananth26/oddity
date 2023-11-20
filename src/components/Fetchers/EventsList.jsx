"use client";
import EventCard from "@components/Cards/EventCard";
import LoadingEventCard from "@components/Loading/LoadingEventCard";
import { apiUrl } from "@utils/constants/links";
import { useEffect, useState } from "react";

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

const EventsList = () => {
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
	return (
		<>
			<div className="flex-center relative mt-24 mb-16 text-5xl uppercase text-red-500 bg-white w-full">
				<span className="flex-center border-b-2 border-slate-300 w-3/4 h-0" />
				<span className="flex-center absolute right-1/2 translate-x-1/2 z-10 h-fit bg-inherit px-3">
					Events
				</span>
			</div>
			<div className="grid grid-cols-3 gap-2 px-20">
				{isLoading ? (
					<>
						<LoadingEventCard />
						<LoadingEventCard />
						<LoadingEventCard />
					</>
				) : (
					events.map((event) => (
						<EventCard
							key={event._id}
							event={event}
							teams={teams}
						/>
					))
				)}
			</div>
		</>
	);
};

export default EventsList;
