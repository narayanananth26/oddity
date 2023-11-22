import User from "@models/User";
import { connectToMongoDB } from "@utils/database/connectToMongoDB";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params: { userId } }) => {
	try {
		const { betId } = await req.json();

		await connectToMongoDB();

		console.log("betId", betId);

		const user = await User.findByIdAndUpdate(userId, {
			$push: { bets: betId },
		});

		return new NextResponse(JSON.stringify(user), {
			status: 200,
		});
	} catch (error) {
		console.error("Error updating user bets:", error);
		return new NextResponse(error.message, {
			status: 500,
		});
	}
};
