"use client";

import { leftNavLinks } from "@utils/constants/links";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLeft = () => {
	const pathname = usePathname();
	return (
		<div className="flex-start gap-10">
			{leftNavLinks.map((link, index) => {
				const isActive =
					(pathname.includes(link.route) && link.route.length > 1) ||
					pathname === link.route;
				return (
					<Link
						key={index}
						href={link.route}
						className={`font-oswald ${
							isActive ? "bg-red-500 text-white" : "text-black"
						}`}
					>
						{link.label}
					</Link>
				);
			})}
		</div>
	);
};

export default NavLeft;
