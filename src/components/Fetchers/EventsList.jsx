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
	const [filter, setFilter] = useState("all");
	const [sort, setSort] = useState("date");

	// Add these functions
	const filterEvents = (events, filter) => {
		if (filter === "all") return events;
		return events.filter((event) => event.status === filter);
	};

	const sortEvents = (events, sort) => {
		if (sort === "asc") {
			events.sort((a, b) => new Date(a.date) - new Date(b.date));
		} else if (sort === "desc") {
			events.sort((a, b) => new Date(b.date) - new Date(a.date));
		}
		return events;
	};

	useEffect(() => {
		const fetchAllEventsAndTeams = async () => {
			try {
				const eventsData = await getAllEvents();
				const filteredEvents = filterEvents(eventsData, filter);
				const sortedEvents = sortEvents(filteredEvents, sort);
				setEvents(sortedEvents);
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
	}, [filter, sort]);

	console.log("events", events);

	return (
		<>
			<div className="flex-end mx-10 my-5">
				<label className="mr-4 flex-center gap-2">
					Filter by Status:
					<select
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						className="focus:outline-none border border-slate-400 rounded-sm"
					>
						{/* "scheduled", "live", "completed", "postponed", "canceled" */}
						<option value="all">All</option>
						<option value="live">Live</option>
						<option value="scheduled">Scheduled</option>
						<option value="completed">Completed</option>
						<option value="postponed">Postponed</option>
						<option value="canceled">Canceled</option>
					</select>
				</label>

				<label className="flex-center gap-2">
					Sort by:
					<select
						value={sort}
						onChange={(e) => setSort(e.target.value)}
						className="focus:outline-none border border-slate-400 rounded-base"
					>
						<option value="asc">Date ↑</option>
						<option value="desc">Date ↓</option>
					</select>
				</label>
			</div>
			<div className="grid grid-cols-3 gap-4 px-20">
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
