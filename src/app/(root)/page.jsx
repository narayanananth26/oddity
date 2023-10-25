import ImageBanner from "@components/UI/ImageBanner";
import UnderConstruction from "@components/UI/UnderConstruction";
import { apiUrl } from "@utils/constants/links";

const getLiveEvent = async () => {
	const res = await fetch(`${apiUrl}/events?filterBy=status&status=Live`, {
		next: { revalidate: 3600 },
	});
	if (!res) throw new Error("Failed to fetch events");

	const events = await res.json();

	const event = events.reduce((maxEvent, event) => {
		if (event.bets_placed > maxEvent.bets_placed) return event;
		return maxEvent;
	});

	return event;
};

const Home = async () => {
	const event = await getLiveEvent();
	return (
		<>
			<ImageBanner data={event} />
			<UnderConstruction />
		</>
	);
};

export default Home;
