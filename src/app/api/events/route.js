import Event from "@models/Event";
import { connectToMongoDB } from "@utils/database/connectToMongoDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
	const filterBy = request.nextUrl.searchParams.get("filterBy");
	const filter = request.nextUrl.searchParams.get(filterBy);

	await connectToMongoDB();
	try {
		let query = { [filterBy]: filter };
		const filteredEvents = await Event.find(query);

		return new NextResponse(JSON.stringify(filteredEvents), {
			status: 200,
		});
	} catch (error) {
		console.log("events/route.js\n", error);
		return new NextResponse(error.message, {
			status: 500,
		});
	}
};
