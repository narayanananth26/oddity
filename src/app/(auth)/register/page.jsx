"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
	const [error, setError] = useState(false);
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

			res.status === 201 && router.push("/sign-in?success=true");
		} catch (err) {
			setError(false);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="username" required />
				<input type="email" placeholder="email" required />
				<input type="password" placeholder="password" required />
				<button>Register</button>
			</form>
			{error && "Something went wrong!"}
			<Link href="/sign-in ">Login with and existing account</Link>
		</div>
	);
};

export default Register;
