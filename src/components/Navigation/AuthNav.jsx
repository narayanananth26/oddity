"use client";

import NavLayout from "./NavLayout";
import { homeLink } from "@utils/constants/links";
import { usePathname } from "next/navigation";
import NavLinks from "./NavLinks";
import Logo from "@components/UI/Logo";

const AuthNav = () => {
	const pathname = usePathname();
	return (
		<NavLayout layout="flex-between">
			<Logo width={200} height={200} />
			<NavLinks pathname={pathname} links={[homeLink]} active={true} />
		</NavLayout>
	);
};

export default AuthNav;
