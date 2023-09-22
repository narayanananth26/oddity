import Nav from "@/components/Nav";
import "@/styles/globals.css";
import AuthProvider from "@context/AuthContext";
("@components/AuthProvider/AuthProvider");

export const metadata = {
	title: "Oddity",
	description: "Place bets on your favorite sports events.",
};

const RootLayout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<AuthProvider>
					<div className="layout">
						<div className="main">
							<div className="container">{children}</div>
						</div>
					</div>
				</AuthProvider>
			</body>
		</html>
	);
};

export default RootLayout;
