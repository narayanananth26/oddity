"use client";

import { leftNavLinks, rightNavLinks } from "@utils/constants/links";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";
import Link from "next/link";

const { default: NavLayout } = require("./NavLayout");

const RootNav = () => {
	const pathname = usePathname();

	return (
		<NavLayout>
			<div className="flex-start gap-10">
				{leftNavLinks.map((link, index) => {
					const isActive =
						(pathname.includes(link.route) &&
							link.route.length > 1) ||
						pathname === link.route;
					return (
						<NavLink key={index} link={link} isActive={isActive} />
					);
				})}
			</div>

			<Link
				href="/"
				className="flex-center uppercase text-red-500 text-7xl font-medium"
			>
				Oddity
			</Link>

			<div className="flex-end gap-10">
				{rightNavLinks.map((link, index) => {
					const isActive =
						(pathname.includes(link.route) &&
							link.route.length > 1) ||
						pathname === link.route;
					return (
						<NavLink key={index} link={link} isActive={isActive} />
					);
				})}
			</div>
		</NavLayout>
	);
};

export default RootNav;
