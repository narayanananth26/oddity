import User from "@/models/User";
import { connectToDB } from "@utils/database/connectToMongoDB";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
	try {
		const { username, email, password } = await request.json();
		await connectToDB();

		const hashedPassword = await bcrypt.hash(password, 5);

		const newUser = {
			username,
			email,
			password: hashedPassword,
		};
		console.log(newUser);

		await User.create(newUser);

		return new NextResponse("User has been created", {
			status: 201,
		});
	} catch (err) {
		console.log(err);
		return new NextResponse(err.message, {
			status: 500,
		});
	}
};
