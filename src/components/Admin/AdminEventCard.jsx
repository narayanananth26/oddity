"use client";
import Button from "@components/Buttons/Button";
import EventOdds from "@components/UI/EventOdds";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import Countdown from "@components/UI/Countdown";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AdminEventCard = ({ event, teams, className }) => {
	const homeTeam = teams.find((team) => team._id === event.home_team);
	const awayTeam = teams.find((team) => team._id === event.away_team);
	const router = useRouter();

	const [selectedWinner, setSelectedWinner] = useState(null);

	console.log("card event", event);
	const handleDeclareWinner = async () => {
		if (!selectedWinner) {
			// Display an error message or handle accordingly
			console.error("Please select a winning team.");
			return;
		}
		try {
			const response = await fetch(
				`/api/event/${event._id}/declare-winner`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ winner: selectedWinner }),
				}
			);

			console.log(response);
			const userData = await response.text();
			console.log(userData);
			router.push("/sportsbook");
		} catch (error) {
			console.error("Error declaring winner:", error);
		}
	};

	return (
		event &&
		teams.length && (
			<div
				className={`${className} bg-slate-200 rounded-lg overflow-hidden border border-slate-300 shadow-md p-2 flex flex-col gap-3`}
			>
				{event.status === "live" ? (
					<div className="flex-center bg-red-500 text-sm text-white text-center uppercase font-bold px-2 py-2.5 rounded-sm w-fit h-5">
						<GoDotFill />
						live
					</div>
				) : (
					<div className="flex-between h-5">
						<div className="text-gray-700">
							{new Date(event.date).toLocaleDateString("en-GB", {
								day: "2-digit",
								month: "2-digit",
								year: "numeric",
							})}
						</div>
						{event.status === "scheduled" ? (
							<div className="mt-4 flex justify-between">
								<Countdown date={event.date} />
							</div>
						) : (
							<div>{event.status}</div>
						)}
					</div>
				)}
				<h2 className="text uppercase bg-white rounded text-slate-600 font-semibold mb-4 text-center h-16 flex-center">
					{event.name}
				</h2>
				<div className="flex-center space-x-4 h-16">
					<Image
						src={homeTeam.logo}
						alt={homeTeam.name}
						width={100}
						height={100}
						className="rounded-full bg-white p-4"
					/>
					<div className="flex-center text-red-500 text-xl">vs</div>
					<Image
						src={awayTeam.logo}
						alt={awayTeam.name}
						width={100}
						height={100}
						className="rounded-full bg-white p-4"
					/>
				</div>
				<EventOdds
					className="grid grid-cols-3 gap-1 text-base uppercase font-bold w-full mt-5"
					oddClassName="flex-center rounded-md p-3 bg-white"
					odds={event.odds}
				/>
				<div className="flex-center gap-4">
					{event.status !== "completed" && (
						<>
							<select
								value={selectedWinner}
								onChange={(e) =>
									setSelectedWinner(e.target.value)
								}
								className="rounded-sm focus:outline-none border border-slate-400 p-1.5 w-52"
							>
								<option value="x" disabled>
									Select Winner
								</option>
								<option value={homeTeam._id}>
									{homeTeam.name}
								</option>
								<option value={awayTeam._id}>
									{awayTeam.name}
								</option>
							</select>
							<Button
								onClick={handleDeclareWinner}
								style="primary"
							>
								Winner
							</Button>
						</>
					)}
				</div>
			</div>
		)
	);
};

export default AdminEventCard;
