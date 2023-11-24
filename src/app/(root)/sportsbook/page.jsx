import UserBets from "@components/Fetchers/UserBets";
import Footer from "@components/UI/Footer";
import UnderConstruction from "@components/UI/UnderConstruction";

export const metadata = {
	title: "Sports Book",
};

const page = () => {
	return (
		<>
			<UserBets />
			<Footer />
		</>
	);
};

export default page;
