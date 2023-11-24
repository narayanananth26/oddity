"use client";
import LoadingImageBanner from "@components/UI/LoadingImageBanner";
import { apiUrl } from "@utils/constants/links";
import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import EventVenue from "@components/UI/EventVenue";
import EventCard from "@components/Cards/EventCard";

const getLiveEvents = async () => {
	const res = await fetch(`${apiUrl}/events/live`, {
		next: { revalidate: 3600 },
	});
	if (!res) throw new Error("Failed to fetch live events");
	const data = await res.json();
	return data;
};

const getAllTeams = async () => {
	const res = await fetch(`${apiUrl}/teams`, {
		next: { revalidate: 3600 },
	});

	if (!res) throw new Error("Failed to fetch teams");
	return await res.json();
};

const EventsBanner = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [liveEvents, setLiveEvents] = useState([]);
	const [teams, setTeams] = useState([]);
	const [error, setError] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const fetchLiveEventsAndTeams = async () => {
			try {
				setIsLoading(true);
				const data = await getLiveEvents();
				setLiveEvents(data);
				const teamsData = await getAllTeams();
				setTeams(teamsData);
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchLiveEventsAndTeams();
	}, []);

	const nextEvent = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === liveEvents.length - 1 ? 0 : prevIndex + 1
		);
	};

	const prevEvent = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? liveEvents.length - 1 : prevIndex - 1
		);
	};

	return isLoading ? (
		<LoadingImageBanner />
	) : (
		<section className="w-screen h-screen relative overflow-hidden flex-center">
			<div
				className="w-4/6 h-full flex-center"
				style={{
					backgroundImage: `url(${liveEvents[currentIndex]?.image})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					// filter: "brightness(0.7)",
				}}
			>
				<div className="flex-center flex-col">
					<h2 className="text-xl text-white uppercase font-bold">
						{liveEvents[currentIndex]?.name}
					</h2>
					<h1 className="text-center text-7xl uppercase text-red-500 font-bold">
						{liveEvents[currentIndex]?.description}
					</h1>
					<div className="flex-center gap-5 text-base text-white uppercase font-bold">
						<EventVenue
							venue={liveEvents[currentIndex]?.venue?.name}
						/>
					</div>
				</div>
			</div>
			<div className="w-2/6 h-full flex-center bg-red-100">
				<div className="p-1 border border-white rounded-lg box-shadow-red-sm">
					<EventCard
						event={liveEvents[currentIndex]}
						teams={teams}
						className="h-96 w-64"
					/>
				</div>
			</div>
			<div
				className="absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer rounded-lg bg-red-500 text-white	  font-extrabold p-5 mx-10 hover:bg-red-800	active:bg-red-500"
				onClick={prevEvent}
			>
				<HiChevronLeft />
			</div>
			<div
				className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer rounded-lg bg-red-500 text-white  font-extrabold p-5 mx-10 hover:bg-red-800	active:bg-red-500"
				onClick={nextEvent}
			>
				<HiChevronRight />
			</div>
		</section>
	);
};

export default EventsBanner;
