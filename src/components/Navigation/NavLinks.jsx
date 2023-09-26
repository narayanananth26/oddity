import Link from "next/link";

const NavLinks = ({ links, pathname, className }) => {
	return (
		<div className={className}>
			{links.map((link, index) => {
				const isActive =
					(pathname.includes(link.route) && link.route.length > 1) ||
					pathname === link.route;
				return (
					<Link
						key={index}
						href={link.route}
						className={`flex-center px-3 py-3 rounded uppercase hover:bg-red-800  hover:text-white active:bg-red-500 ${
							isActive && "text-white bg-red-500"
						}`}
					>
						{link.label}
					</Link>
				);
			})}
		</div>
	);
};

export default NavLinks;
