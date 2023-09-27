"use client";

import { leftNavLinks, rightNavLinks } from "@utils/constants/links";
import { usePathname } from "next/navigation";
import NavLinks from "./NavLinks";
import NavLayout from "./NavLayout";
import NavTitle from "./NavTitle";

const RootNav = () => {
	const pathname = usePathname();

	return (
		<NavLayout className="grid grid-cols-3">
			<NavLinks
				pathname={pathname}
				links={leftNavLinks}
				className="flex-start gap-10"
			/>

			<NavTitle link={true} text={Oddity} />

			<NavLinks
				pathname={pathname}
				links={rightNavLinks}
				className="flex-end gap-10"
			/>
		</NavLayout>
	);
};

export default RootNav;
