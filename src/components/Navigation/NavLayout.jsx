const NavLayout = ({ layout, children }) => {
	return (
		<nav
			className={`${layout} absolute top-3 left-3 w-[98%] rounded py-2 px-10 text-xl bg-red-50 z-50 h-[70px]`}
		>
			{children}
		</nav>
	);
};

export default NavLayout;
