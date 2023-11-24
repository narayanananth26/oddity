import Bet from "@models/Bet";
import Event from "@models/Event";
import User from "@models/User";
import { connectToMongoDB } from "@utils/database/connectToMongoDB";
import { NextResponse } from "next/server";

export const POST = async (req, { params: { slug } }) => {
	try {
		const eventId = slug;
		console.log("eventId", eventId);
		const { winner } = await req.json();

		await connectToMongoDB();

		const updatedEvent = await Event.findByIdAndUpdate(eventId, {
			$set: { status: "completed" },
		});

		const winningBets = await Bet.find({
			event: eventId,
			selection: winner,
			status: { $ne: "completed" },
		});

		for (const bet of winningBets) {
			const user = await User.findByIdAndUpdate(bet.user);
			if (user) {
				user.balance += bet.payout;
				await Promise.all([
					user.save(),
					bet.updateOne({ status: "completed" }),
				]);
			}
		}

		await Bet.deleteMany({ event: eventId });

		return new NextResponse(JSON.stringify({ updatedEvent, winningBets }), {
			status: 201,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error declaring winner bet:", error);
		return new NextResponse(error.message, {
			status: 500,
		});
	}
};
