import Event from "@models/Event";
import { connectToMongoDB } from "@utils/database/connectToMongoDB";
import { NextResponse } from "next";

export default handleRequest = async (req) => {
	if (req.method === "GET") {
		if (req.query.filterBy === "sport") {
			return getEventBySport(req);
		} else if (req.query.filterBy === "status") {
			return getEventByStatus(req);
		} else {
			return new NextResponse("Invalid filterBy parameter", {
				status: 400,
			});
		}
	} else if (req.method === "POST") {
		return createEvent(req);
	} else if (req.method === "PATCH") {
		return updateEvent(req);
	} else if (req.method === "DELETE") {
		return deleteEvent(req);
	}

	return new NextResponse("Invalid HTTP method", {
		status: 405,
	});
};

async function getEventBySport(req) {
	try {
		const { sport } = req.query;

		if (!sport) {
			return new NextResponse("Sport parameter is required", {
				status: 400,
			});
		}

		await connectToMongoDB();
		const events = await Event.find({ sport });

		if (!events || events.length === 0) {
			return new NextResponse("No events found for the specified sport", {
				status: 404,
			});
		}

		return new NextResponse(events, {
			status: 200,
		});
	} catch (error) {
		return new NextResponse(
			{ error: "Error fetching events by sport" },
			{
				status: 500,
			}
		);
	}
}

async function getEventByStatus(req) {
	const { status } = req.query;

	if (!status) {
		return new NextResponse("Status parameter is required", {
			status: 400,
		});
	}

	await connectToMongoDB();

	try {
		const events = await Event.find({ status });

		if (!events || events.length === 0) {
			return new NextResponse(
				"No events found with the specified status",
				{
					status: 404,
				}
			);
		}

		return new NextResponse(events, {
			status: 200,
		});
	} catch (error) {
		return new NextResponse(
			{ error: "Error fetching events by status" },
			{
				status: 500,
			}
		);
	}
}

async function createEvent(req) {
	// !POST
}

async function updateEvent(req) {
	// !PATCH
}

async function deleteEvent(req) {
	// !DELETE
}
