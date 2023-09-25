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
					<div className="max-w-screen-xl min-h-screen grid grid-cols-2 h-screen overflow-hidden font-oswald bg-white">
						<section className="bg-red-500">{}</section>
						<main className="overflow-hidden">{children}</main>
					</div>
				</AuthProvider>
			</body>
		</html>
	);
};

export default RootLayout;
