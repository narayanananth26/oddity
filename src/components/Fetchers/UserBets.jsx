"use client";
import Button from "@components/Buttons/Button";
import LoadingEventCard from "@components/Loading/LoadingEventCard";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const UserBets = () => {
	const { data: session, status: sessionStatus } = useSession();
	const [userBets, setUserBets] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [changingAmountId, setChangingAmountId] = useState(null);
	const [newStakeAmount, setNewStakeAmount] = useState("");

	const handleChangeAmount = (betId) => {
		setChangingAmountId(betId);
	};

	const handleCancelChangeAmount = () => {
		setChangingAmountId(null);
		setNewStakeAmount("");
	};

	const handleSaveNewAmount = async (betId, prevPayout, prevAmount) => {
		try {
			const odds = (prevPayout * 100) / prevAmount;
			const amount = Number(newStakeAmount);
			let newPayout = amount + (amount / 100) * odds;
			newPayout = newPayout.toFixed(2);
			const response = await fetch(`/api/bet/${betId}/`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					stakeAmount: newStakeAmount,
					payout: newPayout,
				}),
			});

			if (response.ok) {
				const updatedBet = await response.json();
				setUserBets((prevBets) =>
					prevBets.map((bet) =>
						bet._id === updatedBet._id ? updatedBet : bet
					)
				);
			} else {
				console.error(
					"Error updating bet amount:",
					response.statusText
				);
			}

			// Reset the state
			setChangingAmountId(null);
			setNewStakeAmount("");
		} catch (error) {
			console.error("Error updating bet amount:", error);
		}
	};

	const handleDeleteBet = async (betId) => {
		try {
			const response = await fetch(`/api/bet/${betId}/`, {
				method: "DELETE",
			});

			if (response.ok) {
				// Remove the deleted bet from the state
				setUserBets((prevBets) =>
					prevBets.filter((bet) => bet._id !== betId)
				);
			} else {
				console.error("Error deleting bet:", response.statusText);
			}
		} catch (error) {
			console.error("Error deleting bet:", error);
		}
	};

	useEffect(() => {
		// Fetch user bets when the session is available
		if (session && session.user) {
			fetch(`/api/user/${session.user.id}/bets`)
				.then((response) => response.json())
				.then((data) => setUserBets(data))
				.catch((error) =>
					console.error("Error fetching user bets:", error)
				)
				.finally(() => setIsLoading(false));
		}
	}, [session]);

	return (
		<>
			<div className="flex-center relative mt-32 mb-16 text-5xl uppercase text-red-500 bg-white w-full">
				<span className="flex-center border-b-2 border-slate-300 w-3/4 h-0" />
				<span className="flex-center absolute right-1/2 translate-x-1/2 z-10 h-fit bg-inherit px-3">
					Your bets
				</span>
			</div>
			<div className="grid grid-cols-3 gap-2 px-20">
				{sessionStatus === "loading" && isLoading ? (
					<>
						<LoadingEventCard />
						<LoadingEventCard />
						<LoadingEventCard />
					</>
				) : (
					userBets.map((bet) => {
						if (bet.status !== "completed")
							return (
								<div
									key={bet._id}
									className="bg-slate-100 p-5 rounded-lg text-black"
								>
									<p className="text-lg uppercase">
										{bet.event?.name}
									</p>
									<p className="text-red-500">
										<span className="text-black">
											Stake:
										</span>{" "}
										{bet.stake_amount}
									</p>
									<p className="border-t-2 border-dotted py-3 mt-3 text-green-400 border-black">
										<span className="text-black">
											Payout:
										</span>{" "}
										{bet.payout}
									</p>
									{changingAmountId === bet._id ? (
										<div className="flex gap-2 mt-3">
											<input
												type="number"
												value={newStakeAmount}
												onChange={(e) =>
													setNewStakeAmount(
														e.target.value
													)
												}
												className="rounded-lg border border-slate-400 p-1.5 focus:outline-none w-24 h-fit pl-3"
											/>
											<Button
												onClick={() =>
													handleSaveNewAmount(
														bet._id,
														bet.payout,
														bet.stake_amount
													)
												}
												style="primary"
											>
												Save
											</Button>
											<Button
												onClick={
													handleCancelChangeAmount
												}
												style="secondary"
											>
												Cancel
											</Button>
										</div>
									) : (
										<Button
											onClick={() =>
												handleChangeAmount(bet._id)
											}
											style="secondary"
										>
											Change amount
										</Button>
									)}
									<Button
										onClick={() => handleDeleteBet(bet._id)}
										style="primary"
									>
										Delete
									</Button>
								</div>
							);
						else return null;
					})
				)}
			</div>
		</>
	);
};

export default UserBets;
