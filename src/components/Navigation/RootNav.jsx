"use client";

import { leftNavLinks, rightNavLinks } from "@utils/constants/links";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavLinks from "./NavLinks";
import NavLayout from "./NavLayout";

const RootNav = () => {
	const pathname = usePathname();

	return (
		<NavLayout className="grid grid-cols-3">
			<NavLinks
				pathname={pathname}
				links={leftNavLinks}
				className="flex-start gap-10"
			/>

			<Link
				href="/"
				className="flex-center uppercase text-red-500 text-7xl font-medium"
			>
				Oddity
			</Link>

			<NavLinks
				pathname={pathname}
				links={rightNavLinks}
				className="flex-end gap-10"
			/>
		</NavLayout>
	);
};

export default RootNav;
