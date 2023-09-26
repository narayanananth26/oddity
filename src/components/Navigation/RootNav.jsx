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

			<div className="flex-center">
				<Link
					href="/"
					className="uppercase text-red-500 text-7xl font-medium hover:text-red-800 active:text-red-500"
				>
					Oddity
				</Link>
			</div>

			<NavLinks
				pathname={pathname}
				links={rightNavLinks}
				className="flex-end gap-10"
			/>
		</NavLayout>
	);
};

export default RootNav;
