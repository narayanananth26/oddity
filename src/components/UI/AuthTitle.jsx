"use client";

import { authTexts } from "@utils/constants/authText";
import { usePathname } from "next/navigation";

const AuthTitle = () => {
	const pathname = usePathname();
	let title = "";
	authTexts.forEach((link) => {
		if (
			(pathname.includes(link.route) && link.route.length > 1) ||
			pathname === link.route
		)
			title = link.title;
	});
	return (
		<p className="flex-center tracking-wide  text-5xl font-medium text-red-500 mb-10">
			{title}
		</p>
	);
};

export default AuthTitle;
