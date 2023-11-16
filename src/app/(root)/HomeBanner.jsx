"use client";
import LoadingImageBanner from "@components/UI/LoadingImageBanner";
import Overlay from "@components/UI/Overlay";
import { apiUrl } from "@utils/constants/links";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { HiChevronRight, HiMapPin, HiMiniUserGroup } from "react-icons/hi2";

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
				<h3 className="flex-center gap-5 text-base text-white uppercase font-bold">
					<span className="flex-center gap-2">
						<HiMapPin />
						{event.venue?.name || ""}
					</span>
					<span className="flex-center gap-2">
						<HiMiniUserGroup />
						{event.bets_placed}
					</span>
				</h3>
				<h4 className="flex-center gap-2 text-base text-white uppercase font-bold">
					<span
						className={`${
							event.odds?.home_team > event.odds?.away_team
								? "before:content-['-'] text-red-500"
								: "before:content-['+'] text-green-500"
						}`}
					>
						{event.odds?.home_team}
					</span>
					<span className="before:content-['+']">
						{event.odds?.draw}
					</span>
					<span
						className={`${
							event.odds?.away_team > event.odds?.home_team
								? "before:content-['-'] text-red-500"
								: "before:content-['+'] text-green-500"
						}`}
					>
						{event.odds?.away_team}
					</span>
				</h4>
			</div>

			<div
				className={`flex-center text-white text-7xl font-bold uppercase absolute bottom-0 left-0 transform translate-x-1/4 -translate-y-1/2 px-6 py-3`}
			>
				<Link
					href="/sportsbook"
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
