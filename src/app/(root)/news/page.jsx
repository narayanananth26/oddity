import NewsList from "@components/Fetchers/NewsList";
import NewsBanner from "@components/Fetchers/NewsBanner";
import UnderConstruction from "@components/UI/UnderConstruction";

const News = () => {
	return (
		<div>
			<NewsBanner />
			<NewsList />
		</div>
	);
};

export default News;
