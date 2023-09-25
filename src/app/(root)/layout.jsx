import Nav from "@components/Navigation/Nav";
import "@/styles/globals.css";
import AuthProvider from "@context/AuthContext";
import LogoBanner from "@components/Navigation/LogoBanner";
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
					<div className="max-w-screen-xl min-h-screen flex flex-col h-screen overflow-hidden font-oswald">
						<Nav />
						<main className="overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-red-100">
							{children}
						</main>
					</div>
				</AuthProvider>
			</body>
		</html>
	);
};

export default RootLayout;
