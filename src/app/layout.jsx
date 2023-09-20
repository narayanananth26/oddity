import Nav from "@/components/Nav";
import "@/styles/globals.css";
import Provider from "@context/AuthContext";
("@components/AuthProvider/AuthProvider");

export const metadata = {
	title: "Oddity",
	description: "Place bets on your favorite sports events.",
};

const RootLayout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<Provider>
					<div className="layout">
						<Nav />
						<div className="main">
							<div className="container">{children}</div>
						</div>
					</div>
				</Provider>
			</body>
		</html>
	);
};

export default RootLayout;
