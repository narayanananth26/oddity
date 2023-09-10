export const metadata = {
	title: "Oddity",
	description: "Place bets on your favorite sports events.",
};

const RootLayout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<main>{children}</main>
			</body>
		</html>
	);
};

export default RootLayout;
