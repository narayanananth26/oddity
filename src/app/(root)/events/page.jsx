import EventsBanner from "@components/Fetchers/EventsBanner";
import EventsList from "@components/Fetchers/EventsList";
import Footer from "@components/UI/Footer";
import UnderConstruction from "@components/UI/UnderConstruction";

const page = () => {
	return (
		<>
			<EventsBanner />
			<div className="flex-center relative mt-24 mb-16 text-5xl uppercase text-red-500 bg-white w-full">
				<span className="flex-center border-b-2 border-slate-300 w-3/4 h-0" />
				<span className="flex-center absolute right-1/2 translate-x-1/2 z-10 h-fit bg-inherit px-3">
					Events
				</span>
			</div>
			<EventsList />
			<Footer />
		</>
	);
};

export default page;
