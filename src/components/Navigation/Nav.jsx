import LogoBanner from "./LogoBanner";
import NavLeft from "./NavLeft";
import NavRight from "./NavRight";

const Nav = () => {
	return (
		<nav className="grid grid-cols-3 py-1 px-10 text-xl">
			<NavLeft />
			<LogoBanner />
			<NavRight />
		</nav>
	);
};

export default Nav;
