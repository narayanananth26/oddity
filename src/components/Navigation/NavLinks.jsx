import Link from "next/link";

const NavLinks = ({ links, pathname, positioning, active }) => {
	return (
		<div className={positioning}>
			{links.map((link, index) => {
				const isActive =
					(pathname.includes(link.route) && link.route.length > 1) ||
					pathname === link.route;
				return (
					<Link
						key={index}
						href={link.route}
						className={`flex-center px-3 py-3 rounded text-2xl uppercase hover:bg-red-800  hover:text-red-50 ${active && 'bg-red-500'} active:bg-red-500 ${
							isActive && "text-red-50 bg-red-500"
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
