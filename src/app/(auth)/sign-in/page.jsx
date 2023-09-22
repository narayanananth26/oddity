"use client";
import FormField from "@components/Form/FormField";
import FormLayout from "@components/Form/FormLayout";
import Button from "@components/UI/Button";
import Or from "@components/UI/Or";
import RedirectTo from "@components/UI/RedirectTo";
import { userValidation } from "@utils/validations/user";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiUser, HiLockClosed } from "react-icons/hi2";

const SignIn = () => {
	const router = useRouter();
	const handleSubmit = (e) => {
		e.preventDefault();

		const email = e.target[0].value;
		const password = e.target[1].value;

		signIn("credentials", { email, password });
		router.push("/");
	};
	return (
		<FormLayout
			initialValues={{
				email: "",
				password: "",
			}}
			validationSchema={userValidation}
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
			<Link
				href="/forgot-password"
				className="text-sm text-red-600 hover:text-red-700 hover:underline"
			>
				Forgot password?
			</Link>
			<Button style="primary">Sign In</Button>
			<Or />
			<Button style="secondary">
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
				question="Not yet a member?"
				redirectTo="Register here"
				redirectToLink="/register"
			/>
		</FormLayout>
	);
};

export default SignIn;
