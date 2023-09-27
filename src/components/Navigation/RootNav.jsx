"use client";

import { leftNavLinks, rightNavLinks } from "@utils/constants/links";
import { usePathname } from "next/navigation";
import NavLinks from "./NavLinks";
import NavLayout from "./NavLayout";
import Image from "next/image";
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
			<Link href="/" className="flex-center">
				<Image
					src="/assets/logo.png"
					alt="Oddity logo"
					width={150}
					height={150}
				/>
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
