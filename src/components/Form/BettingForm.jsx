"use client";

import Button from "@components/Buttons/Button";
import EventOdds from "@components/UI/EventOdds";
import { apiUrl } from "@utils/constants/links";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BettingForm = ({ eventData: { event, homeTeam, awayTeam }, eventId }) => {
	const [selectedTeam, setSelectedTeam] = useState("home_team");
	const [stakeAmount, setStakeAmount] = useState(500);
	const [estimatedPayout, setEstimatedPayout] = useState(0);
	const { data: session, status: sessionStatus } = useSession();
	const [error, setError] = useState("");
	const router = useRouter();
	useEffect(() => {
		// Calculate initial estimated payout based on initial stake amount and odds
		if (selectedTeam && stakeAmount) {
			let amount = Number(stakeAmount);
			const odds = event.odds[selectedTeam];
			const payout = amount + (amount / odds) * 100;
			setEstimatedPayout(payout.toFixed(2));
		} else {
			setEstimatedPayout(0);
		}
	}, [stakeAmount, selectedTeam, event]);
	const handleTeamChange = (team) => {
		setSelectedTeam(team);

		// Calculate estimated payout based on odds and stake amount
		if (stakeAmount) {
			let amount = Number(stakeAmount);
			const odds = event.odds[team];
			const payout = amount + (amount / odds) * 100;
			setEstimatedPayout(payout.toFixed(2));
		} else {
			setEstimatedPayout(0);
		}
	};

	const handleStakeChange = (amount) => {
		setStakeAmount(amount);

		// Calculate estimated payout based on odds and stake amount
		if (selectedTeam && amount) {
			const odds = event.odds[selectedTeam];
			const numAmount = Number(amount);
			const payout = numAmount + (numAmount / 100) * odds;
			setEstimatedPayout(payout.toFixed(2));
		} else {
			setEstimatedPayout(0);
		}
	};

	const placeBet = async (userId, eventId) => {
		try {
			console.log("placing...");
			const numAmount = Number(stakeAmount);

			const team =
				selectedTeam === "home_team" ? homeTeam._id : awayTeam._id;
			// Check if user has sufficient funds
			if (session.user.balance < numAmount) {
				setError("Insufficient funds.");

				setStakeAmount(500);
				setSelectedTeam("home_team");
				setEstimatedPayout(0);
				return;
			}
			const betResponse = await fetch("/api/bet", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user: userId,
					event: eventId,
					selection: team,
					stakeAmount,
					payout: estimatedPayout,
				}),
			});

			console.log("bet placed");

			let betData = await betResponse.text();
			betData = JSON.parse(betData);

			const userResponse = await fetch(`${apiUrl}/user/${userId}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					balance: session.user.balance - numAmount,
					betId: betData._id,
				}),
			});

			const userData = await userResponse.text();

			const eventResponse = await fetch(`/api/event/${eventId}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
			});

			const eventData = await eventResponse.text();
			router.push("/sportsbook");
		} catch (error) {
			console.error("Error placing bet:", error);
		}
	};

	if (sessionStatus === "loading") {
		return <p>Loading...</p>;
	}

	console.log("BettingForm", event);

	return (
		<div className="w-fit h-fit flex-center bg-red-500 mt-20 rounded-xl px-6 py-10 gap-5 box-shadow-red ">
			<div className="flex-center gap-10 mb-5 flex-col">
				<div className="flex-center gap-10">
					<div className="bg-white rounded-xl p-10">
						<Image
							src={homeTeam.logo}
							alt={homeTeam.name}
							width={125}
							height={125}
							className="rounded-full bg-slate-200 p-4"
						/>
					</div>

					<div className="bg-white rounded-xl p-10">
						<Image
							src={awayTeam.logo}
							alt={awayTeam.name}
							width={125}
							height={125}
							className="rounded-full bg-slate-200 p-4"
						/>
					</div>
				</div>
				<EventOdds
					className="grid grid-cols-3 text-base uppercase font-bold mb-5 w-full gap-3"
					oddClassName="flex-center rounded-md p-3 bg-white"
					odds={event.odds}
				/>
			</div>
			<div className="bg-white rounded-lg gap-4 flex flex-col p-10">
				{error !== "" ? (
					<p className="flex-center text-red-500 h-5">{error}</p>
				) : (
					<p className="h-5"></p>
				)}
				<h2 className="w-full flex-center">Betting</h2>
				<div className="flex-center gap-2">
					<label className="w-40">Select Team:</label>
					<select
						onChange={(e) => handleTeamChange(e.target.value)}
						className="rounded-sm focus:outline-none border border-slate-400 p-1.5 w-52"
					>
						<option value="home_team" className="rounded-sm">
							{homeTeam.name}
						</option>
						<option value="away_team" className="rounded-sm">
							{awayTeam.name}
						</option>
					</select>
				</div>
				<div className="flex-center gap-2">
					<label className="w-40">Stake Amount:</label>
					<input
						type="number"
						value={stakeAmount}
						onChange={(e) => handleStakeChange(e.target.value)}
						className="rounded-sm border border-slate-400 p-1.5 focus:outline-none w-52 h-fit pl-3"
					/>
				</div>
				<div className="flex-center gap-2">
					<p className="w-40">Estimated Payout: </p>
					<span className="border border-slate-400 p-1.5 rounded-sm w-52 h-fit pl-3">
						${estimatedPayout}
					</span>
				</div>
				<Button
					onClick={() => placeBet(session.user.id, eventId)}
					style="primary"
				>
					Place Bet
				</Button>
			</div>
		</div>
	);
};

export default BettingForm;
