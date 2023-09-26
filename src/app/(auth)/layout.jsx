import "@/styles/globals.css";
import AuthNav from "@components/Navigation/AuthNav";
import AuthText from "@components/UI/AuthText";
import AuthTitle from "@components/UI/AuthTitle";
import AuthProvider from "@context/AuthContext";
import { authTexts } from "@utils/constants/authText";

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
						<section className="bg-red-500 flex-center p-20">
							<AuthText />
						</section>
						<main className="overflow-hidden">
							<AuthNav />
							{children}
						</main>
					</div>
				</AuthProvider>
			</body>
		</html>
	);
};

export default RootLayout;
