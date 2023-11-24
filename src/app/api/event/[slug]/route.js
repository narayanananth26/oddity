import Event from "@models/Event";
import Team from "@models/Team";
import { connectToMongoDB } from "@utils/database/connectToMongoDB";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
	try {
		await connectToMongoDB();
		const { slug } = params;
		const event = await Event.findById(slug);
		const homeTeam = await Team.findById(event.home_team);
		const awayTeam = await Team.findById(event.away_team);
		// Combine the event, homeTeam, and awayTeam data
		const eventData = {
			event,
			homeTeam,
			awayTeam,
		};

		return new NextResponse(JSON.stringify(eventData), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
		return new NextResponse(error.message, {
			status: 500,
		});
	}
};

export const PATCH = async (req, { params: { slug } }) => {
	try {
		await connectToMongoDB();
		const event = await Event.findByIdAndUpdate(slug, {
			$inc: { bets_placed: 1 },
		});

		return new NextResponse(JSON.stringify(event), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
		return new NextResponse(error.message, {
			status: 500,
		});
	}
};
