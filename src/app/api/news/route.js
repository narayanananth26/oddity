import { NextResponse } from "next/server";

export const GET = async () => {
	try {
		const res = await fetch(
			"https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=cf95b0e736ef4f66b2c331d0cb7ad222"
		);

		const news = await res.json();
		if (!news) throw new Error("Error fetching sports news");

		return new NextResponse(JSON.stringify(news), {
			status: 200,
		});
	} catch (error) {
		return new NextResponse(error.message, {
			status: 500,
		});
	}
};
