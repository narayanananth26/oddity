import User from "@models/User";
import { connectToDB } from "@utils/mongodb";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		CredentialsProvider({
			id: "credentials",
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text" }, // Add a username field
				password: { label: "Password", type: "password" }, // Add a password field
			},
			async authorize(credentials) {
				await connectToDB();
				try {
					const { username, password } = credentials;
					const user = await User.findOne({
						$or: [{ email: username }, { username: username }],
					});

					if (user) {
						const isPasswordCorrect = await bcrypt.compare(
							password,
							user.password
						);

						if (isPasswordCorrect) {
							return user;
						} else {
							throw new Error("Wrong Credentials!");
						}
					} else {
						throw new Error("User not found!");
					}
				} catch (err) {
					throw new Error(err);
				}
			},
		}),
	],
	pages: {
		error: "/sign-in",
	},
});

export { handler as GET, handler as POST };
