import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const NavLinks = ({ links, pathname, positioning }) => {
	const { data: session } = useSession();
	console.log(session);
	return (
		<div className={positioning}>
			{links.map((link, index) => {
				const isActive =
					(pathname.includes(link.route) && link.route.length > 1) ||
					pathname === link.route;
				return link.route === "/sign-in" && session ? (
					<Link
						href="/profile"
						className="flex-center gap-2"
						key={index}
					>
						<Image
							src={session?.user.image || "/assets/user.svg"}
							width={37}
							height={37}
							className="rounded-full"
							alt="Profile"
						/>
						<span className="w-fit hover:text-red-500">
							{session?.user.username || "User"}
						</span>
					</Link>
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
							} flex-center relative text-2xl uppercase tracking-wider text-black hover:text-red-500 active:text-black pb-1 underline_animation after:bg-red-500 after:h-[3px] `}
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
