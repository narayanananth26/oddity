import Team from "@models/Team";
import { connectToMongoDB } from "@utils/database/connectToMongoDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
	try {
		await connectToMongoDB();
		const teams = await Team.find();

		return new NextResponse(JSON.stringify(teams), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
		return new NextResponse(error.message, {
			status: 500,
		});
	}
};
