"use client";

import { leftNavLinks, rightNavLinks } from "@utils/constants/links";
import { usePathname } from "next/navigation";
import NavLinks from "./NavLinks";
import NavLayout from "./NavLayout";
import Logo from "@components/UI/Logo";

const RootNav = () => {
	const pathname = usePathname();

	return (
		<NavLayout layout="grid grid-cols-3">
			<NavLinks
				pathname={pathname}
				links={leftNavLinks}
				positioning="flex-start gap-10"
			/>
			<Logo width={100} height={100} />
			<NavLinks
				pathname={pathname}
				links={rightNavLinks}
				positioning="flex-end gap-10"
			/>
		</NavLayout>
	);
};

export default RootNav;
