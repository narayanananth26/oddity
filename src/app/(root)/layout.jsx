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
					<div className="flex flex-col h-screen">
						<Nav />
						<div className="overflow-scroll">
							<div className="my-0 mx-auto flex flex-col">
								{children}
							</div>
						</div>
					</div>
				</AuthProvider>
			</body>
		</html>
	);
};

export default RootLayout;
