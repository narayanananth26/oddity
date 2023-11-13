import Event from "@models/Event";
import { connectToMongoDB } from "@utils/database/connectToMongoDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
	try {
		await connectToMongoDB();
		const events = await Event.find();

		return new NextResponse(JSON.stringify(events), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
		return new NextResponse(error.message, {
			status: 500,
		});
	}
};
