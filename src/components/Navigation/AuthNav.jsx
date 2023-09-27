"use client";

import NavLayout from "./NavLayout";
import { homeLink } from "@utils/constants/links";
import { usePathname } from "next/navigation";
import NavLinks from "./NavLinks";
import Image from "next/image";

const AuthNav = () => {
	const pathname = usePathname();
	return (
		<NavLayout layout="flex-between">
			<div href="/" className="flex-center">
				<Image
					src="/assets/logo.png"
					alt="Oddity logo"
					width={150}
					height={150}
				/>
			</div>
			<NavLinks pathname={pathname} links={[homeLink]} active={true} />
		</NavLayout>
	);
};

export default AuthNav;
