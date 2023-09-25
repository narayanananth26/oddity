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
						className={`flex-center px-3 py-3 rounded uppercase underline-offset-4  hover:underline ${
							isActive
								? "text-white bg-red-500 hover:text-white"
								: "hover:text-red-500"
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
