"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiLockClosed, HiMiniEnvelope, HiUser, HiXMark } from "react-icons/hi2";
import { registerValidation } from "@utils/validations/authValidation";
import FormLayout from "@components/Form/FormLayout";
import FormField from "@components/Form/FormField";
import Button from "@components/Buttons/Button";
import RedirectTo from "@components/UI/RedirectTo";
import { registerLink, signInLink } from "@utils/constants/links";

const Register = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null); // State to store error message
	const router = useRouter();

	const handleSubmit = async ({ username, email, password }) => {
		try {
			setIsLoading(true);
			const response = await fetch(`/api/auth/${registerLink.route}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					email,
					password,
				}),
			});

			const responseMessage = await response.text();

			if (response.status === 201) {
				setIsLoading(false);
				router.push(`${signInLink.route}?success=true`);
			} else {
				setError(responseMessage);
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
			setError("An error occurred while registering.");
			setIsLoading(false);
		}
	};

	return (
		<FormLayout
			initialValues={{
				username: "",
				email: "",
				password: "",
			}}
			validationSchema={registerValidation}
			onSubmit={handleSubmit}
		>
			{error && (
				<div className="flex-between text-red-500 text-md bg-red-100 p-2 rounded-lg">
					{error}
					<button
						onClick={(e) => {
							e.preventDefault();
							setError(false);
						}}
						className="hover:text-red-800 active:text-red-500"
					>
						<HiXMark />
					</button>
				</div>
			)}
			<FormField
				label={<HiUser fill="gray" />}
				type="text"
				name="username"
				placeholder="Username"
			/>
			<FormField
				label={<HiMiniEnvelope fill="gray" />}
				type="email"
				name="email"
				placeholder="Email"
			/>
			<FormField
				label={<HiLockClosed fill="gray" />}
				type="password"
				name="password"
				placeholder="Password"
			/>
			<Button type="submit" style="primary" disabled={isLoading}>
				{isLoading ? "Loading..." : "Register"}
			</Button>
			<RedirectTo
				text="Already a member?"
				linkText="Sign in"
				redirectTo={signInLink.route}
			/>
		</FormLayout>
	);
};

export default Register;
