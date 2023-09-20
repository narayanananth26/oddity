"use client";
import Link from "next/link";
import { useState } from "react";
import { HiUser } from "react-icons/hi2";

const ForgotPassword = () => {
	const [emailSent, setEmailSent] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const email = e.target[0].value;
		try {
			const res = await fetch("/api/auth/forgot-password", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			if (res.ok) {
				setEmailSent(true);
			} else {
				const data = await res.json();
				setError(data.message);
			}
		} catch (error) {
			console.error(error);
			setError("An error occurred");
		}
	};
	return (
		<div className="flex-center h-auto">
			<div className="flex flex-col flex-between  rounded font-oswald px-5 py-10 mt-16 w-80">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-3 w-full"
				>
					<div className="flex gap-2">
						<div className="flex-center">
							<HiUser />
						</div>

						<input
							type="text"
							placeholder="Email"
							required
							className="input border-slate-400 border-b py-1 px-2 w-full"
						/>
					</div>

					<button className="uppercase bg-red-600 rounded-lg py-1 hover:bg-red-800 text-white active:bg-red-600 text-xl mt-5">
						Next
					</button>
					<Link
						href="/sign-in"
						className="flex-center gap-2 border border-slate-400 rounded-lg  px-10 hover:bg-slate-100 hover:border-white text-xl active:bg-white active:border-slate-400"
					>
						Back
					</Link>
				</form>
			</div>
		</div>
	);
};

export default ForgotPassword;
