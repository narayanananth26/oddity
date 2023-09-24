import LogoBanner from "./LogoBanner";
import NavLeft from "./NavLeft";
import NavRight from "./NavRight";

const Nav = () => {
	return (
		<nav className="bg-transparent w-full flex-between">
			<NavLeft />
			<LogoBanner />
			<NavRight />
		</nav>
	);
};

export default Nav;
