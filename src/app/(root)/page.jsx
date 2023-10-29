"use client";
import { useState, useEffect } from "react";
import ImageBanner from "@components/UI/ImageBanner";
import LoadingImageBanner from "@components/UI/LoadingImageBanner";
import BannerContent from "@components/UI/BannerContent";
import UnderConstruction from "@components/UI/UnderConstruction";
import { apiUrl } from "@utils/constants/links";
import { HiMapPin, HiMiniUserGroup } from "react-icons/hi2";

const Home = () => {
	const [liveEvent, setLiveEvent] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const res = await fetch(`${apiUrl}/events/live`, {
					next: { revalidate: 60 },
				});
				if (!res) throw new Error("Failed to fetch events");
				const events = await res.json();

				if (events.length) {
					const maxEvent = events.reduce((maxEvent, event) => {
						if (event.bets_placed > maxEvent.bets_placed)
							return event;
						return maxEvent;
					});
					setLiveEvent(maxEvent);
				}

				setIsLoading(false);
			} catch (error) {
				console.error(error);
				setIsLoading(false);
			}
		};

		fetchEvents();
	}, []);

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
					<ImageBanner src={liveEvent.image} alt={liveEvent.name}>
						<BannerContent
							h1={liveEvent.description}
							h2={liveEvent.name}
							h3={
								<>
									<span className="flex-center gap-2">
										<HiMapPin />
										{liveEvent.venue?.name}
									</span>
									<span className="flex-center gap-2">
										<HiMiniUserGroup />
										{liveEvent.bets_placed}
									</span>
								</>
							}
							h4={
								<>
									<span
										className={`${
											liveEvent.odds?.home_team >
											liveEvent.odds?.away_team
												? "before:content-['-'] text-red-500"
												: "before:content-['+'] text-green-500"
										}`}
									>
										{liveEvent.odds?.home_team}
									</span>
									<span className="before:content-['+']">
										{liveEvent.odds?.draw}
									</span>
									<span
										className={`${
											liveEvent.odds?.away_team >
											liveEvent.odds?.home_team
												? "before:content-['-'] text-red-500"
												: "before:content-['+'] text-green-500"
										}`}
									>
										{liveEvent.odds?.away_team}
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
