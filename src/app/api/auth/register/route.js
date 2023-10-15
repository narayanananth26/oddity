import User from "@/models/User";
import { connectToMongoDB } from "@utils/database/connectToMongoDB";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
	try {
		const { username, email, password } = await request.json();
		await connectToMongoDB();

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
	} catch (error) {
		console.log(error);
		return new NextResponse(error.message, {
			status: 500,
		});
	}
};
