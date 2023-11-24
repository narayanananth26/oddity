import { HiMapPin } from "react-icons/hi2";

const EventVenue = ({ venue, className }) => {
	return (
		<span className={`flex-center gap-2 ${className}`}>
			<HiMapPin />
			{venue || ""}
		</span>
	);
};

export default EventVenue;
