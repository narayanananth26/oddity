import Link from "next/link";
import { HiChevronRight } from "react-icons/hi2";

const ZoomOnHoverButton = ({
	linkTo,
	onMouseEnter,
	onMouseLeave,
	children,
}) => {
	return (
		<div
			className={`flex-center text-white text-7xl font-bold uppercase absolute bottom-0 left-0 transform translate-x-1/4 -translate-y-1/2 px-6 py-3`}
		>
			<Link
				href={linkTo}
				className="relative pb-2 underline_animation after:bg-red-500 after:h-1
  "
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				{children}
			</Link>{" "}
			<HiChevronRight className="text-red-500" />
		</div>
	);
};

export default ZoomOnHoverButton;
