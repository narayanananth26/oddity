import BettingForm from "@components/Form/BettingForm";
import Footer from "@components/UI/Footer";
import { apiUrl } from "@utils/constants/links";

const getEvent = async (slug) => {
	console.log(`${apiUrl}/event/${slug}`);
	const res = await fetch(`${apiUrl}/event/${slug}`);

	if (!res) throw new Error("Error fetching the event!");

	return await res.json();
};

const page = async ({ params }) => {
	const eventData = await getEvent(params.slug);
	return (
		<>
			<div className="w-screen h-screen flex-center">
				<BettingForm eventData={eventData} eventId={params.slug} />
			</div>
			<Footer />
		</>
	);
};

export default page;
