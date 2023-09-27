import Link from "next/link";

const NavTitle = ({ link, text }) => {
	return (
		<div className="flex-center">
			{link ? (
				<Link
					href="/"
					className="uppercase text-red-500 text-7xl font-medium hover:text-red-800 active:text-red-500"
				>
					{text}
				</Link>
			) : (
				<span className="uppercase text-red-500 text-7xl font-medium">
					{text}
				</span>
			)}
		</div>
	);
};

export default NavTitle;
