import Bet from "@models/Bet";
import { connectToMongoDB } from "@utils/database/connectToMongoDB";
import { NextResponse } from "next/server";

export const GET = async (req, { params: { userId } }) => {
	try {
		await connectToMongoDB();
		const bets = await Bet.find({ user: userId }).populate("event");

		return new NextResponse(JSON.stringify(bets), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error fetching user bets:", error);
		return new NextResponse(error.message, {
			status: 500,
		});
	}
};
