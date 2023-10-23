import "@/styles/globals.css";
import AuthNav from "@components/Navigation/AuthNav";
import AuthText from "@components/Auth/AuthText";
import AuthTitle from "@components/Auth/AuthTitle";
import AuthProvider from "@context/AuthContext";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
	title: "Oddity",
	description: "Place bets on your favorite sports events.",
};

const RootLayout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<AuthProvider>
					<div className="max-w-screen-xl min-h-screen grid grid-cols-2 h-screen overflow-hidden font-oswald bg-red-50 text-red-50">
						<section className="bg-red-500 flex-center p-20">
							<AuthText />
						</section>
						<main className="overflow-hidden">
							<NextTopLoader
								color={"#ef4444"}
								showSpinner={false}
							/>
							<AuthNav />
							<AuthTitle />
							{children}
						</main>
					</div>
				</AuthProvider>
			</body>
		</html>
	);
};

export default RootLayout;
