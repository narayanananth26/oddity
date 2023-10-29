"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { HiUser, HiLockClosed, HiXMark, HiXCircle } from "react-icons/hi2";
import FormField from "@components/Form/FormField";
import FormLayout from "@components/Form/FormLayout";
import Button from "@components/Buttons/Button";
import Or from "@components/UI/Or";
import RedirectTo from "@components/UI/RedirectTo";
import {
	forgotPasswordLink,
	homeLink,
	registerLink,
	signInLink,
} from "@utils/constants/links";
import { signInValidation } from "@utils/validations/authValidation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

const SignIn = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null); // State to handle error;

	const handleSubmit = async ({ emailOrUsername, password }, action) => {
		try {
			setIsLoading(true);
			const isEmail = emailOrUsername.includes("@");
			const credentials = isEmail
				? { email: emailOrUsername }
				: { username: emailOrUsername };

			const response = await signIn("credentials", {
				...credentials,
				password,
				redirect: false,
				callbackUrl: "/",
			});

			if (response.error) {
				router.push(`${signInLink.route}?success=false`);
				setError("Incorrect username or password.");
			} else {
				router.push("/");
				setError(null);
			}
		} catch (error) {
			console.log("sign-in/page.jsx\n", error.message);
		} finally {
			setIsLoading(false);
			action.resetForm();
		}
	};

	return (
		<>
			<FormLayout
				initialValues={{
					emailOrUsername: "",
					password: "",
				}}
				validationSchema={signInValidation}
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
					name="emailOrUsername"
					placeholder="Email or Username"
				/>
				<FormField
					label={<HiLockClosed fill="gray" />}
					type="password"
					name="password"
					placeholder="Password"
				/>

				<RedirectTo
					linkText="Forgot password?"
					redirectTo={forgotPasswordLink.route}
				/>
				<Button type="submit" style="primary" disabled={isLoading}>
					{isLoading ? (
						<CircularProgress
							sx={{
								color: "#ffffff",
							}}
							size={25}
						/>
					) : (
						"Sign In"
					)}
				</Button>
				<Or />
				<Button
					type="button"
					style="secondary"
					onClick={(e) => {
						e.preventDefault();
						setIsLoading(true);
						signIn("google", { callbackUrl: homeLink.route });
					}}
					disabled={isLoading}
				>
					{isLoading ? (
						<CircularProgress
							sx={{
								color: "#ef4444",
							}}
							size={25}
						/>
					) : (
						<>
							<Image
								src="/assets/google-logo.svg"
								alt="Google logo"
								width={18}
								height={18}
								className="my-auto"
							/>
							<span className="py-1">Continue with Google</span>
						</>
					)}
				</Button>
				<RedirectTo
					text="Not yet a member?"
					linkText="Register here"
					redirectTo={registerLink.route}
				/>
			</FormLayout>
		</>
	);
};

export default SignIn;
