import User from "@/models/User";
import { connectToDB } from "@utils/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
	try {
		const { username, email, password } = await request.json();
		await connectToDB();

		const hashedPassword = await bcrypt.hash(password, 5);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});
		console.log(newUser);

		await newUser.save();

		return new NextResponse("User has been created", {
			status: 201,
		});
	} catch (err) {
		return new NextResponse(err.message, {
			status: 500,
		});
	}
};
