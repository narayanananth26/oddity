import Link from "next/link";

const NavLinks = ({ links, pathname, positioning}) => {
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
						className={`${
							isActive && "text-red-50 bg-red-500"
						} rounded px-2 py-2`}
					>
						<span
							className={`nav ${
								isActive &&
								"hover:text-red-50 hover:after:bg-red-50"
							}`}
						>
							{link.label}
						</span>
					</Link>
				);
			})}
		</div>
	);
};

export default NavLinks;
