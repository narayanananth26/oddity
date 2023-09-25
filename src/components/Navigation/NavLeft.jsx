"use client";

import { leftNavLinks } from "@utils/constants/links";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";

const NavLeft = () => {
	const pathname = usePathname();
	return (
		<div className="flex-start gap-10">
			{leftNavLinks.map((link, index) => {
				const isActive =
					(pathname.includes(link.route) && link.route.length > 1) ||
					pathname === link.route;
				return <NavLink key={index} link={link} isActive={isActive} />;
			})}
		</div>
	);
};

export default NavLeft;
