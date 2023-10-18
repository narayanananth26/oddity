"use client";

import NavLayout from "./NavLayout";
import { homeLink } from "@utils/constants/links";
import { usePathname } from "next/navigation";
import NavLinks from "./NavLinks";
import Logo from "@components/UI/Logo";
import Button from "@components/UI/Button";
import { HiArrowLeft, HiHome } from "react-icons/hi2";
import Link from "next/link";

const AuthNav = () => {
	return (
		<NavLayout layout="flex-between mt-3">
			<Logo width={200} height={200} />
			<Link href="/">
				<Button style="primary">
					<HiArrowLeft size="1.5rem" />
					<HiHome size="2rem" />
				</Button>
			</Link>
		</NavLayout>
	);
};

export default AuthNav;
