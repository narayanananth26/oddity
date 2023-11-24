import TeamsList from "@components/Fetchers/TeamsList";
import Footer from "@components/UI/Footer";

export const metadata = {
	title: "Teams",
};

const page = () => {
	return (
		<>
			<TeamsList />
			<Footer />
		</>
	);
};

export default page;
