import Nav from "@/components/Nav";
import "@/styles/globals.css";
import AuthProvider from "@components/AuthProvider/AuthProvider";
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
					<main className="app">
						<Nav />
						{children}
					</main>
				</AuthProvider>
			</body>
		</html>
	);
};

export default RootLayout;
