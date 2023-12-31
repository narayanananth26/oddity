import HomeBanner from "@app/(root)/HomeBanner";
import EventsListCarousel from "@components/Fetchers/EventsListCarousel";
import Carousel from "@components/UI/Carousel";
import HomeNews from "@components/Fetchers/HomeNews";
import Footer from "@components/UI/Footer";
import Logo from "@components/UI/Logo";

const Home = () => {
	return (
		<>
			<HomeBanner />
			<div className="flex-center relative mt-24 mb-16 text-5xl uppercase text-red-500 bg-white w-full">
				<span className="flex-center border-b-2 border-slate-300 w-3/4 h-0" />
				<span className="flex-center absolute right-1/2 translate-x-1/2 z-10 h-fit bg-inherit px-3">
					Events
				</span>
			</div>
			<Carousel>
				<EventsListCarousel />
			</Carousel>
			<div className="flex-center relative mt-24 mb-16 text-5xl uppercase text-red-500 bg-white w-full">
				<span className="flex-center border-b-2 border-slate-300 w-3/4 h-0" />
				<span className="flex-center absolute right-1/2 translate-x-1/2 z-10 h-fit bg-inherit px-3">
					News
				</span>
			</div>
			<HomeNews />
			<Footer />
		</>
	);
};

export default Home;
