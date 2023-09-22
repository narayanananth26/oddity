"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiLockClosed, HiMiniEnvelope, HiUser } from "react-icons/hi2";

const Register = () => {
	const [, setError] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const name = e.target[0].value;
		const email = e.target[1].value;
		const password = e.target[2].value;

		try {
			const res = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			});

			console.log(res);

			if (res.status === 201) router.push("/sign-in?success=true");
			else {
				const data = await res.json();
				console.log(data);
			}

			// res.status === 201 && router.push("/sign-in?success=true");
		} catch (err) {
			setError(false);
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
							placeholder="Username"
							required
							className="input border-slate-400 border-b py-1 px-2 w-full"
						/>
					</div>
					<div className="flex gap-2">
						<div className="flex-center">
							<HiMiniEnvelope />
						</div>

						<input
							type="email"
							placeholder="Email"
							required
							className="input border-slate-400 border-b py-1 px-2 w-full"
						/>
					</div>

					<div className="flex gap-2">
						<div className="flex-center">
							<HiLockClosed />
						</div>

						<input
							type="password"
							placeholder="Password"
							required
							className="input border-slate-400 border-b py-1 px-2 w-full rounded-sm"
						/>
					</div>

					<button className="uppercase bg-red-600 rounded-lg py-1 hover:bg-red-800 text-white active:bg-red-600 text-xl mt-5">
						Register
					</button>

					<p className="text-md">
						Already a member?{" "}
						<Link
							href="/sign-in"
							className="text-red-600 hover:underline hover:text-red-700"
						>
							Sign in
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Register;
