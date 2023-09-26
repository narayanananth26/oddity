"use client";

import Link from "next/link";
import NavLayout from "./NavLayout";
import { homeLink } from "@utils/constants/links";

const AuthNav = () => {
	return (
		<NavLayout className="flex-end mt-2">
			<Link
				href={homeLink.route}
				className="px-3 py-3 rounded text-2xl uppercase text-red-50 bg-red-500 hover:bg-red-800 active:bg-red-500"
			>
				Home
			</Link>
		</NavLayout>
	);
};

export default AuthNav;
