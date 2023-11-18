import EventsBanner from "@components/Fetchers/EventsBanner";
import EventsList from "@components/Fetchers/EventsList";
import UnderConstruction from "@components/UI/UnderConstruction";

const page = () => {
	return (
		<>
			<EventsBanner />
			<EventsList />
			<UnderConstruction />
		</>
	);
};

export default page;
