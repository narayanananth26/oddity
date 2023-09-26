"use client";

import { authTexts } from "@utils/constants/authText";
import { usePathname } from "next/navigation";

const AuthText = () => {
	const pathname = usePathname();
	let text = "";
	authTexts.forEach((link) => {
		if (
			(pathname.includes(link.route) && link.route.length > 1) ||
			pathname === link.route
		)
			text = link.text;
	});
	return <span className="font-medium text-9xl text-white">{text}</span>;
};

export default AuthText;
