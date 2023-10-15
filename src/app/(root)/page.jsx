"use client";
import ImageBanner from "@components/UI/ImageBanner";
import UnderConstruction from "@components/UI/UnderConstruction";
import { apiUrl } from "@utils/constants/links";
import { useEffect, useState } from "react";

const Home = () => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		fetch(`${apiUrl}/events?filterBy=status&status=Live`)
			.then((response) => response.json())
			.then((data) => setEvents(data))
			.catch((error) => console.error("Error fetching events.", error));
	}, []);

	let event;

	if (events) {
		event = events.reduce(
			(maxEvent, event) => {
				if (
					event.number_of_bets_placed > maxEvent.number_of_bets_placed
				) {
					return event;
				}
				return maxEvent;
			},
			{ number_of_bets_placed: -1 }
		);
	}
	return (
		<>
			<ImageBanner src="/img.webp" alt="banner" data={event} />
			<UnderConstruction />
		</>
	);
};

export default Home;
