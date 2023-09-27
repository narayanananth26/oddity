const NavLayout = ({ layout, children }) => {
	return (
		<nav className={`${layout} py-3 px-10 text-xl bg-red-50`}>
			{children}
		</nav>
	);
};

export default NavLayout;
