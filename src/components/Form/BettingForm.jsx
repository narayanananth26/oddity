"use client";

import Button from "@components/Buttons/Button";
import EventBetsPlaced from "@components/UI/EventBetsPlaced";
import EventOdds from "@components/UI/EventOdds";
import { apiUrl } from "@utils/constants/links";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const BettingForm = ({ eventData: { event, homeTeam, awayTeam } }) => {
	const [selectedTeam, setSelectedTeam] = useState("home_team");
	const [stakeAmount, setStakeAmount] = useState(500);
	const [estimatedPayout, setEstimatedPayout] = useState(0);
	const { data: session, status: sessionStatus } = useSession();
	useEffect(() => {
		// Calculate initial estimated payout based on initial stake amount and odds
		if (selectedTeam && stakeAmount) {
			const odds = event.odds[selectedTeam];
			const payout = stakeAmount + (stakeAmount / odds) * 100;
			setEstimatedPayout(payout.toFixed(2));
		} else {
			setEstimatedPayout(0);
		}
	}, [stakeAmount, selectedTeam, event]);
	const handleTeamChange = (team) => {
		setSelectedTeam(team);

		// Calculate estimated payout based on odds and stake amount
		if (stakeAmount) {
			const odds = event.odds[team];
			const payout = stakeAmount + (stakeAmount / odds) * 100;
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
			const payout = (amount / 100) * odds;
			setEstimatedPayout(payout.toFixed(2));
		} else {
			setEstimatedPayout(0);
		}
	};

	const placeBet = async (userId, eventId) => {
		try {
			const betResponse = await fetch("/api/bet", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user: userId,
					event: eventId,
					stakeAmount,
					payout: estimatedPayout,
				}),
			});

			console.log("bet placed");

			let betData = await betResponse.text();
			betData = JSON.parse(betData);
			console.log("betData", betData._id);

			const userResponse = await fetch(`${apiUrl}/user/${userId}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					betId: betData._id,
				}),
			});

			const userData = await userResponse.text();
			console.log(userData);
		} catch (error) {
			console.error("Error placing bet:", error);
		}
	};

	if (sessionStatus === "loading") {
		return <p>Loading...</p>;
	}

	return (
		<div className="w-fit h-fit flex-center bg-red-500 mt-20 rounded-xl px-6 py-10 gap-5">
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
				<div className="flex-center">
					<Button
						onClick={() => placeBet(session.user.id, event._id)}
						style="primary"
					>
						Place Bet
					</Button>
				</div>
			</div>
		</div>
	);
};

export default BettingForm;
