"use client";

import { rightNavLinks } from "@utils/constants/links";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";

const NavRight = () => {
	const pathname = usePathname();
	return (
		<div className="flex-end gap-10p">
			{rightNavLinks.map((link, index) => {
				const isActive =
					(pathname.includes(link.route) && link.route.length > 1) ||
					pathname === link.route;
				return <NavLink key={index} link={link} isActive={isActive} />;
			})}
		</div>
	);
};

export default NavRight;
