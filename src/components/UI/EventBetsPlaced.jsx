import { HiMiniUserGroup } from "react-icons/hi2";

const EventBetsPlaced = ({ betsPlaced }) => {
	return (
		<span className="flex-center gap-2">
			<HiMiniUserGroup />
			{betsPlaced}
		</span>
	);
};

export default EventBetsPlaced;
