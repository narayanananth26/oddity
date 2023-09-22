import User from "@models/User";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export default async function handler(req) {
	if (req.method !== "POST")
		return NextResponse.error("Method not allowed", 405);

	const { username, email, password } = req.body;
	if (!username || !email || !password) {
		return NextResponse.error("All fields are required.", 400);
	}

	try {
		await connectToDB();

		// Check if a user with entered email or password already exists
		const existingUser = await User.findOne({
			$or: [{ username, email }],
		});

		if (existingUser) {
			if (existingUser.email === email)
				return NextResponse.error("Email is already in use.", 400);
			if (existingUser.username === username)
				return NextResponse.error("Username is already in use.", 400);
		}

		// Create new user
		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});

		// Persist newUser in db
		await newUser.save();

		return NextResponse.created({
			message: "User registered successfully.",
		});
	} catch (error) {
		console.error("Error registering user:", error);
		return NextResponse.error("Internal server error.", 500);
	}
}
