const Nav = () => {
	return (
		<nav className="font-oswald flex-between w-full text-lg p-5 uppercase">
			<div className="flex-between w-4/12">
				<p>Events</p>
				<p>News</p>
				<p>Rankings</p>
				<p>Athletes</p>
			</div>
			<div className=" font-bold text-6xl text-red-600">Oddity</div>
			<div className="flex-between w-4/12">
				<p>Newsletter</p>
				<p>Sign up</p>
				<p>Profile</p>
				<p>Search</p>
			</div>
		</nav>
	);
};

export default Nav;
