const NavLayout = ({ className, children }) => {
	return <nav className={`${className} py-1 px-10 text-xl`}>{children}</nav>;
};

export default NavLayout;
