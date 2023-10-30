import "@/styles/globals.css";
import AuthProvider from "@context/AuthContext";
import RootNav from "@components/Navigation/RootNav";
import NextTopLoader from "nextjs-toploader";
("@components/AuthProvider/AuthProvider");

export const metadata = {
	title: {
		default: "Oddity - India's Premier Sports Betting App",
		template: "%s | Oddity",
	},
	description: "Place bets on your favorite sports events.",
};

const RootLayout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<NextTopLoader color={"#ef4444"} showSpinner={false} />
				<AuthProvider>
					<div className="max-w-screen-xl min-h-screen flex flex-col h-screen font-oswald">
						<RootNav />
						<main className="overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-red-50">
							{children}
						</main>
					</div>
				</AuthProvider>
			</body>
		</html>
	);
};

export default RootLayout;
