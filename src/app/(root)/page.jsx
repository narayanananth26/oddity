"use client";
import { useState, useEffect } from "react";
import ImageBanner from "@components/UI/ImageBanner";
import LoadingImageBanner from "@components/UI/LoadingImageBanner";
import BannerContent from "@components/UI/BannerContent";
import UnderConstruction from "@components/UI/UnderConstruction";
import { apiUrl } from "@utils/constants/links";
import { HiMapPin, HiMiniUserGroup } from "react-icons/hi2";
import { getAllEvents } from "@utils/fetch-functions/getAllEvents";

const Home = () => {
	const [events, setEvents] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const events = await getAllEvents();
				setEvents(events);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
				setIsLoading(false);
			}
		};

		fetchEvents();
	}, []);

	let bannerEvent;

	if (events.length) {
		bannerEvent = events
			.filter((event) => event.status === "live")
			.reduce(
				(maxEvent, event) =>
					event.bets_placed > maxEvent.bets_placed ? event : maxEvent,
				{ bets_placed: -Infinity }
			);
	}

	return (
		<>
			{isLoading ? (
				<LoadingImageBanner />
			) : (
				<div
					className={`transition-opacity duration-500 ${
						isLoading ? "opacity-0" : "opacity-100"
					}`}
				>
					<ImageBanner src={bannerEvent.image} alt={bannerEvent.name}>
						<BannerContent
							h1={bannerEvent.description}
							h2={bannerEvent.name}
							h3={
								<>
									<span className="flex-center gap-2">
										<HiMapPin />
										{bannerEvent.venue?.name}
									</span>
									<span className="flex-center gap-2">
										<HiMiniUserGroup />
										{bannerEvent.bets_placed}
									</span>
								</>
							}
							h4={
								<>
									<span
										className={`${
											bannerEvent.odds?.home_team >
											bannerEvent.odds?.away_team
												? "before:content-['-'] text-red-500"
												: "before:content-['+'] text-green-500"
										}`}
									>
										{bannerEvent.odds?.home_team}
									</span>
									<span className="before:content-['+']">
										{bannerEvent.odds?.draw}
									</span>
									<span
										className={`${
											bannerEvent.odds?.away_team >
											bannerEvent.odds?.home_team
												? "before:content-['-'] text-red-500"
												: "before:content-['+'] text-green-500"
										}`}
									>
										{bannerEvent.odds?.away_team}
									</span>
								</>
							}
						/>
					</ImageBanner>
				</div>
			)}
			<UnderConstruction />
		</>
	);
};

export default Home;
