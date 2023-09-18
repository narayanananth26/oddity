import Link from "next/link";

const Nav = () => {
	return (
		<nav className="flex-between w-full font-oswald text-lg uppercase px-10 py-2">
			<div className="flex-between w-1/3">
				<p>Events</p>
				<p>News</p>
				<p>Rankings</p>
				<p>Athletes</p>
			</div>
			<Link href="/" className=" font-bold text-6xl text-red-600">
				Oddity
			</Link>
			<div className="flex-between w-1/3">
				<p>Newsletter</p>
				<p>Profile</p>
				<p>Search</p>
				<Link href="/sign-in">Sign in</Link>
			</div>
		</nav>
	);
};

export default Nav;
