import NewsList from "@components/Fetchers/NewsList";
import NewsBanner from "@components/Fetchers/NewsBanner";

const News = () => {
	return (
		<div>
			<NewsBanner />
			<div className="flex-center relative mt-24 mb-16 text-5xl uppercase text-red-500 bg-white w-full">
				<span className="flex-center border-b-2 border-slate-300 w-3/4 h-0" />
				<span className="flex-center absolute right-1/2 translate-x-1/2 z-10 h-fit bg-inherit px-3">
					Latest News
				</span>
			</div>
			<NewsList />
		</div>
	);
};

export default News;
