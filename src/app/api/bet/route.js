import Bet from "@models/Bet";
import { connectToMongoDB } from "@utils/database/connectToMongoDB";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
	try {
		const { user, event, stakeAmount, payout, selection } =
			await req.json();

		await connectToMongoDB();

		const newBet = {
			user,
			event,
			stake_amount: stakeAmount,
			payout,
			selection,
		};

		console.log(newBet);

		const bet = await Bet.create(newBet);

		return new NextResponse(JSON.stringify(bet), {
			status: 201,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error placing bet:", error);
		return new NextResponse(error.message, {
			status: 500,
		});
	}
};
