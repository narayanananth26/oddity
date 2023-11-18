"use client";
import EventCard from "@components/Cards/EventCard";
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
		<div className="grid grid-cols-3 gap-2 px-10">
			{events.map((event) => (
				<EventCard key={event._id} event={event} teams={teams} />
			))}
		</div>
	);
};

export default EventsList;
