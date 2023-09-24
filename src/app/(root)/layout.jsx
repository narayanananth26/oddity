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
					<div className="container h-screen overflow-hidden">
						<Nav />
						<main className="container h-1/2 overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-red-100">
							{children}
						</main>
					</div>
				</AuthProvider>
			</body>
		</html>
	);
};

export default RootLayout;
