"use client";
import { useEffect, useState } from "react";

const NavLayout = ({ layout, children }) => {
	const [scrolling, setScrolling] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			console.log(window.scrollY);
			if (window.scrollY > 0) {
				setScrolling(true);
			} else {
				setScrolling(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav
			className={`${layout} absolute top-3 left-3 w-[98%] backdrop-blur-sm rounded-xl py-2 px-10 text-xl ${
				scrolling ? "bg-red-50 text-black" : " text-red-50"
			} z-50 h-[70px]`}
		>
			{children}
		</nav>
	);
};

export default NavLayout;
