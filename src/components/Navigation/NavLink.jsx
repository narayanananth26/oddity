import Link from "next/link";

const NavLink = ({ link, isActive }) => {
	return (
		<Link
			href={link.route}
			className={`flex-center px-3 py-3 rounded uppercase underline-offset-4  hover:underline ${
				isActive
					? "text-white bg-red-500 hover:text-white"
					: "hover:text-red-500"
			}`}
		>
			{link.label}
		</Link>
	);
};

export default NavLink;
