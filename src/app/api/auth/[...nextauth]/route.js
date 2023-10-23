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
			callbacks: {
				async signIn(user, account, metadata) {
					const { email, name, image } = metadata;

					// Connect to the database
					await connectToMongoDB();
					console.log(email, name, image);

					// Check if the user already exists in your database
					let existingUser = await User.findOne({ email });

					if (!existingUser) {
						// If the user doesn't exist, create a new user record
						existingUser = await User.create({
							email,
							username: name.replace(" ", "").toLowerCase(),
							image,
							// Add other user fields as needed
						});
					} else {
						// If the user exists, update their data
						existingUser.image = image;
						// Update other user fields as needed
						await existingUser.save();
					}

					return true;
				},
			},
		}),
		CredentialsProvider({
			id: "credentials",
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				await connectToMongoDB();
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
				} catch (error) {
					console.log(error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			try {
				// Ensure that `User.findOne` query succeeds
				const sessionUser = await User.findOne({
					email: session.user.email,
				});

				if (sessionUser) {
					console.log(sessionUser);
					// Access user data if it exists
					session.user.username = sessionUser.username;
					session.user.image = sessionUser.image;
				}

				return session;
			} catch (error) {
				// Handle any errors gracefully
				console.error("Session callback error:", error);
				return session;
			}
		},
	},

	pages: {
		error: "/sign-in",
	},
});

export { handler as GET, handler as POST };
