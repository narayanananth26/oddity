"use client";

import { leftNavLinks, rightNavLinks } from "@utils/constants/links";
import { usePathname } from "next/navigation";
import NavLinks from "./NavLinks";
import NavLayout from "./NavLayout";
import Link from "next/link";

const RootNav = () => {
	const pathname = usePathname();

	return (
		<NavLayout layout="grid grid-cols-3">
			<NavLinks
				pathname={pathname}
				links={leftNavLinks}
				positioning="flex-start gap-10"
			/>

			<Link
				href="/"
				className="flex-center uppercase text-container text-red-500 font-medium hover:text-red-800 active:text-red-500"
			>
				Oddity
			</Link>

			<NavLinks
				pathname={pathname}
				links={rightNavLinks}
				positioning="flex-end gap-10"
			/>
		</NavLayout>
	);
};

export default RootNav;
