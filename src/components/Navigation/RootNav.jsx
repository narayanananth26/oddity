"use client";

import { leftNavLinks, rightNavLinks } from "@utils/constants/links";
import { usePathname } from "next/navigation";
import NavLinks from "./NavLinks";
import NavLayout from "./NavLayout";
import Logo from "@components/UI/Logo";

const RootNav = () => {
	const pathname = usePathname();

	return (
		<NavLayout layout="grid grid-cols-3 h-fit">
			<NavLinks
				pathname={pathname}
				links={leftNavLinks}
				positioning="flex-start gap-7"
			/>
			<Logo />
			<NavLinks
				pathname={pathname}
				links={rightNavLinks}
				positioning="flex-end gap-7 h-fit"
			/>
		</NavLayout>
	);
};

export default RootNav;
