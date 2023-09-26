const NavLayout = ({ children }) => {
	return (
		<nav className="grid grid-cols-3 py-1 px-10 text-xl">{children}</nav>
	);
};

export default NavLayout;
