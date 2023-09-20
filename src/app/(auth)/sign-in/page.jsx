"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { HiUser, HiLockClosed } from "react-icons/hi2";

const SignIn = () => {
	const handleSubmit = (e) => {
		e.preventDefault();

		const email = e.target[0].value;
		const password = e.target[1].value;

		signIn("credentials", { email, password });
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
							placeholder="Email or Username"
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

					<a
						href="#"
						className="text-sm text-red-600 hover:text-red-700 hover:underline"
					>
						Forgot password?
					</a>
					<button className="uppercase bg-red-600 rounded-lg py-1 hover:bg-red-800 text-white active:bg-red-600 text-xl mt-5">
						Login
					</button>
					<div className="inline-flex items-center justify-center w-full">
						<hr className="w-full h-px my-3 bg-gray-200 border-0" />
						<span className="absolute px-3 font-medium -translate-x-1/2 text-slate-500 bg-white left-1/2">
							or
						</span>
					</div>
					<button
						onClick={(e) => {
							e.preventDefault();
							signIn("google");
						}}
						className="flex-center gap-2 border border-slate-400 rounded-lg  px-10 hover:bg-slate-100 hover:border-white text-xl active:bg-white active:border-slate-400"
					>
						<Image
							src="/assets/google-logo.svg"
							alt="Google logo"
							width={18}
							height={18}
							// className="my-auto"
						/>
						<span className="py-1">Continue with Google</span>
					</button>

					<p className="text-md">
						Not yet a member?{" "}
						<Link
							href="/register"
							className="text-red-600 hover:underline hover:text-red-700"
						>
							Register here
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
