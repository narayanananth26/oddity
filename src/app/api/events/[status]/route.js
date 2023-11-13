import Event from "@models/Event";
import { connectToMongoDB } from "@utils/database/connectToMongoDB";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
	try {
		await connectToMongoDB();
		const { status } = params;
		const filteredEvents = await Event.find({ status });

		return new NextResponse(JSON.stringify(filteredEvents), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
		return new NextResponse(error.message, {
			status: 500,
		});
	}
};
