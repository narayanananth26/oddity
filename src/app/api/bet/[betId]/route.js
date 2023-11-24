import Bet from "@models/Bet";
import { connectToMongoDB } from "@utils/database/connectToMongoDB";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params: { betId } }) => {
	try {
		const { stakeAmount, payout } = await req.json();
		await connectToMongoDB();
		const updatedBet = await Bet.findByIdAndUpdate(
			betId,
			{ $set: { stake_amount: stakeAmount, payout } },
			{ new: true }
		);

		return new NextResponse(JSON.stringify(updatedBet), {
			status: 200,
		});
	} catch (error) {
		console.error("Error updating bet amount:", error);
		return new NextResponse(error.message, {
			status: 500,
		});
	}
};

export const DELETE = async (req, { params: { betId } }) => {
	try {
		await connectToMongoDB();
		const deletedBet = await Bet.findByIdAndDelete(betId);

		if (!deletedBet) {
			return new NextResponse("Bet not found", {
				status: 404,
			});
		}

		return new NextResponse(JSON.stringify(deletedBet), {
			status: 200,
		});
	} catch (error) {
		console.error("Error deleting bet:", error);
		return new NextResponse(error.message, {
			status: 500,
		});
	}
};
