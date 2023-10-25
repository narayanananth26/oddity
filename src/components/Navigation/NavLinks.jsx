import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
const NavLinks = ({ links, pathname, positioning }) => {
	const { data: session, status: sessionStatus } = useSession();
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [isSessionStatusLoading, setIsSessionStatusLoading] = useState(
		sessionStatus === "loading"
	);

	const toggleDropdown = () => {
		setIsDropdownVisible(!isDropdownVisible);
	};

	useEffect(() => {
		setIsSessionStatusLoading(false);
	}, [sessionStatus]);

	return (
		<div className={positioning}>
			{links.map((link, index) => {
				const isActive =
					(pathname.includes(link.route) && link.route.length > 1) ||
					pathname === link.route;

				if (link.route === "/sign-in" && isSessionStatusLoading)
					return (
						<CircularProgress
							sx={{
								color: "#ef4444",
							}}
							size={40}
							key={index}
						/>
					);
				return link.route === "/sign-in" && session ? (
					<div key={index} className="relative">
						<div
							onClick={toggleDropdown}
							className="flex-center gap-2 hover:text-red-500 cursor-pointer"
							style={{ position: "relative" }} // Set relative positioning
						>
							<Image
								src={session?.user.image}
								width={37}
								height={37}
								className="rounded-full"
								alt="Profile"
							/>
							<span>{session?.user.username}</span>
						</div>

						{isDropdownVisible && (
							<div className="absolute left-0 mt-2 w-36">
								<div className="bg-white border rounded shadow">
									<Link href="/profile">
										<span className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
											Profile
										</span>
									</Link>
									<button
										onClick={() => {
											signOut();
											setIsDropdownVisible(false);
										}}
										className="block px-4 py-2 text-red-500 hover:bg-red-100 w-full flex-start"
									>
										Sign Out
									</button>
								</div>
							</div>
						)}
					</div>
				) : (
					<Link
						key={index}
						href={link.route}
						className={`${
							isActive && "text-red-50 bg-red-500"
						} rounded px-2 py-2`}
					>
						<span
							className={`${
								isActive &&
								"text-red-50 hover:text-white hover:after:bg-red-50 active:text-black"
							} flex-center relative text-2xl uppercase tracking-wider text-black hover:text-red-500 active:text-black pb-1 underline_animation after:bg-red-500 after:h-[3px]`}
						>
							{link.label}
						</span>
					</Link>
				);
			})}
		</div>
	);
};

export default NavLinks;
