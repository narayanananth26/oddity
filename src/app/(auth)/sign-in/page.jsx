"use client";
import { signIn } from "next-auth/react";

const SignIn = () => {
	const handleSubmit = (e) => {
		e.preventDefault();

		const email = e.target[0].value;
		const password = e.target[1].value;

		signIn("credentials", { email, password });
	};
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="flex flex-col flex-between">
				<form onSubmit={handleSubmit} className="flex flex-col">
					<input type="email" placeholder="email" required />
					<input type="password" placeholder="password" required />
					<button>Login</button>
				</form>
				<button onClick={() => signIn("google")}>
					Continue with Google
				</button>
			</div>
		</div>
	);
};

export default SignIn;
