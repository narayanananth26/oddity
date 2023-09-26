const NavLayout = ({ className, children }) => {
	return (
		<nav className={`${className} py-1 px-10 text-xl bg-red-50`}>
			{children}
		</nav>
	);
};

export default NavLayout;
