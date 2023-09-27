"use client";
import FormField from "@components/Form/FormField";
import FormLayout from "@components/Form/FormLayout";
import Button from "@components/UI/Button";
import Or from "@components/UI/Or";
import RedirectTo from "@components/UI/RedirectTo";
import {
	forgotPasswordLink,
	homeLink,
	registerLink,
} from "@utils/constants/links";
import { signInValidation } from "@utils/validations/authValidation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiUser, HiLockClosed } from "react-icons/hi2";

const SignIn = () => {
	const router = useRouter();
	const handleSubmit = async ({ emailOrUsername, password }) => {
		console.log(emailOrUsername, password);
		try {
			const isEmail = emailOrUsername.includes("@");
			const credentials = isEmail
				? { email: emailOrUsername }
				: { username: emailOrUsername };

			const signInResponse = await signIn("credentials", {
				...credentials,
				password,
			});

			if (signInResponse?.error) {
				console.error("Authentication error:", signInResponse.error);
			} else {
				router.push("/");
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<FormLayout
			initialValues={{
				emailOrUsername: "",
				password: "",
			}}
			validationSchema={signInValidation}
			onSubmit={handleSubmit}
		>
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
			<Button type="submit" style="primary">
				Sign In
			</Button>
			<Or />
			<Button
				type="button"
				style="secondary"
				onClick={(e) => {
					e.preventDefault();
					signIn("google", { callbackUrl: homeLink.route });
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
				redirectTo={registerLink.route}
			/>
		</FormLayout>
	);
};

export default SignIn;
