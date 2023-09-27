const NavLayout = ({ layout, children }) => {
	return (
		<nav className={`${layout} py-0.5 px-10 text-xl bg-red-50`}>
			{children}
		</nav>
	);
};

export default NavLayout;
