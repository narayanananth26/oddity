import User from "@models/User";
import { connectToMongoDB } from "@utils/database/connectToMongoDB";
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
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					await connectToMongoDB();
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
				} catch (error) {
					console.log(
						"[next-auth]/route.js - handler/providers/CredentialsProvider\n",
						error
					);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async session({ session }) {
			try {
				const sessionUser = await User.findOne({
					email: session.user.email,
				});

				if (sessionUser) {
					session.user.username = sessionUser.username;
					session.user.image = sessionUser.image;
				}

				return session;
			} catch (error) {
				console.error(
					"[next-auth]/route.js - handler/callbacks/session\n",
					"Session callback error:",
					error
				);
				return session;
			}
		},
		async signIn({ profile, credentials }) {
			try {
				if (credentials) return true;
				await connectToMongoDB();
				const user = await User.findOne({ email: profile.email });
				if (!user) {
					await User.create({
						email: profile.email,
						username: profile.name.replace(" ", "").toLowerCase(),
						image: profile.picture,
					});
					return true;
				} else {
					if (user.image === "/assets/user-icon.svg") {
						user.image = profile.picture;
						await user.save();
					}
					return true;
				}
			} catch (error) {
				console.log(error.message);
				return false;
			}
		},
	},
	pages: {
		error: "/sign-in",
	},
});

export { handler as GET, handler as POST };
