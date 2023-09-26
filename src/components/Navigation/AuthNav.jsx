"use client";

import Link from "next/link";
import NavLayout from "./NavLayout";
import { homeLink } from "@utils/constants/links";

const AuthNav = () => {
	return (
		<NavLayout className="flex-end mt-5">
			<Link
				href={homeLink.route}
				className="px-3 py-3 rounded uppercase text-white bg-red-500 underline-offset-4  hover:underline "
			>
				Home
			</Link>
		</NavLayout>
	);
};

export default AuthNav;
