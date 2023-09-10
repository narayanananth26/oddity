const Nav = () => {
	return (
		<nav className="z-100 font-oswald flex-between w-[98%] text-lg px-3 py-2 uppercase fixed top-5 bg-white">
			<div className="flex-between w-1/3">
				<p>Events</p>
				<p>News</p>
				<p>Rankings</p>
				<p>Athletes</p>
			</div>
			<h1 className=" font-bold text-6xl text-red-600">Oddity</h1>
			<div className="flex-between w-1/3">
				<p>Newsletter</p>
				<p>Sign up</p>
				<p>Profile</p>
				<p>Search</p>
			</div>
		</nav>
	);
};

export default Nav;
