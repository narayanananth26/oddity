import Team from "@models/Team";
import { connectToMongoDB } from "@utils/database/connectToMongoDB";
import { NextResponse } from "next/server";

export const GET = async (req, { params: { teamId } }) => {
	try {
		await connectToMongoDB();
		const team = await Team.findById({ teamId });

		return new NextResponse(JSON.stringify(team), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
		return new NextResponse(error.message, {
			status: 500,
		});
	}
};
