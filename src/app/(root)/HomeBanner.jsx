"use client";
import LoadingImageBanner from "@components/UI/LoadingImageBanner";
import EventOdds from "@components/UI/EventOdds";
import Overlay from "@components/UI/Overlay";
import { apiUrl } from "@utils/constants/links";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiChevronRight, HiMapPin, HiMiniUserGroup } from "react-icons/hi2";
import EventVenue from "@components/UI/EventVenue";
import EventBetsPlaced from "@components/UI/EventBetsPlaced";

const getLiveEvents = async () => {
	const res = await fetch(`${apiUrl}/events/live`, {
		next: { revalidate: 3600 },
	});
	if (!res) throw new Error("Failed to fetch live events");
	const data = await res.json();
	return data;
};

const HomeBanner = () => {
	const [isHovered, setIsHovered] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [liveEvents, setLiveEvents] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchLiveEvents = async () => {
			try {
				setIsLoading(true);
				const data = await getLiveEvents();
				setLiveEvents(data);
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchLiveEvents();
	}, []);
	const event = liveEvents.reduce(
		(maxEvent, event) =>
			event.bets_placed > maxEvent.bets_placed ? event : maxEvent,
		{ bets_placed: 0 }
	);

	return isLoading ? (
		<LoadingImageBanner />
	) : (
		<section className="w-screen h-screen relative overflow-hidden">
			<div className="absolute inset-0">
				<Image
					src={event.image}
					alt={event.name}
					fill
					priority
					className={`transition-transform transform-gpu ease-in-out duration-700 object-cover object-center ${
						isHovered && "scale-125 blur-sm"
					}`}
				/>
			</div>

			<Overlay />

			<div className="flex flex-col flex-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-2 w-full">
				<h2 className="text-xl text-white uppercase font-bold">
					{event.name}
				</h2>
				<h1 className="text-center text-7xl uppercase text-red-500 font-bold">
					{event.description}
				</h1>
				<div className="flex-center gap-5 text-base text-white uppercase font-bold">
					<EventVenue venue={event.venue} />
					<EventBetsPlaced betsPlaced={event.bets_placed} />
				</div>
				<EventOdds
					className="flex-center gap-2 text-base text-white uppercase font-bold"
					odds={event.odds}
				/>
			</div>

			<div
				className={`flex-center text-white text-7xl font-bold uppercase absolute bottom-0 left-0 transform translate-x-1/4 -translate-y-1/2 px-6 py-3`}
			>
				<Link
					href={`/sportsbook/${event.slug}`}
					className="relative pb-2 underline_animation after:bg-red-500 after:h-1"
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					Wager Now
				</Link>{" "}
				<HiChevronRight className="text-red-500" />
			</div>
		</section>
	);
};

export default HomeBanner;
