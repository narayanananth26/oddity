"use client";

import NavLayout from "./NavLayout";
import { homeLink } from "@utils/constants/links";
import { usePathname } from "next/navigation";
import { authTexts } from "@utils/constants/authText";
import NavLinks from "./NavLinks";

const AuthNav = () => {
	const pathname = usePathname();
	let label = "";
	authTexts.forEach((link) => {
		if (
			(pathname.includes(link.route) && link.route.length > 1) ||
			pathname === link.route
		)
			label = link.label;
	});
	return (
		<NavLayout className="flex-center">
			<NavLinks
				pathname={pathname}
				links={[homeLink]}
				positioning="flex-end"
				active={true}
			/>
		</NavLayout>
	);
};

export default AuthNav;
