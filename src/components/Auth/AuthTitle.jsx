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
			title = link.label;
	});
	return (
		<p className="flex-center tracking-wider uppercase text-4xl font-semibold text-red-500 mt-36">
			{title}
		</p>
	);
};

export default AuthTitle;
