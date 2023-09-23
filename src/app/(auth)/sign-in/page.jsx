"use client";
import FormField from "@components/Form/FormField";
import FormLayout from "@components/Form/FormLayout";
import Button from "@components/UI/Button";
import Or from "@components/UI/Or";
import RedirectTo from "@components/UI/RedirectTo";
import {
	signInValidation,
	userValidation,
} from "@utils/validations/userValidation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { HiUser, HiLockClosed } from "react-icons/hi2";

const SignIn = () => {
	const handleSubmit = async ({ email, password }) => {
		console.log(email, password);
		try {
			await signIn("credentials", { email, password, callbackUrl: "/" });
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<FormLayout
			initialValues={{
				email: "",
				password: "",
			}}
			validationSchema={signInValidation}
			onSubmit={handleSubmit}
		>
			<FormField
				label={<HiUser />}
				type="email"
				name="email"
				placeholder="Email"
			/>
			<FormField
				label={<HiLockClosed />}
				type="password"
				name="password"
				placeholder="Password"
			/>
			<RedirectTo
				linkText="Forgot password?"
				redirectTo="/forgot-password"
			/>
			<Button type="submit" style="primary">
				Sign In
			</Button>
			<Or />
			<Button
				type="button"
				style="secondary"
				onClick={(e) => {
					e.preventDefault();
					signIn("google");
				}}
			>
				<Image
					src="/assets/google-logo.svg"
					alt="Google logo"
					width={18}
					height={18}
					className="my-auto"
				/>
				<span className="py-1">Continue with Google</span>
			</Button>
			<RedirectTo
				text="Not yet a member?"
				linkText="Register here"
				redirectTo="/register"
			/>
		</FormLayout>
	);
};

export default SignIn;
