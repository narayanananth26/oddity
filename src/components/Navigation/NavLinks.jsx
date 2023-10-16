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
						className={`${
							active && "bg-red-500 hover:bg-red-800 "
						} active:bg-red-500 active:text-red-50 ${
							isActive &&
							"text-red-50 bg-red-500 hover:text-white"
						} nav`}
					>
						{link.label}
					</Link>
				);
			})}
		</div>
	);
};

export default NavLinks;
