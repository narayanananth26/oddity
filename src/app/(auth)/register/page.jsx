"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiLockClosed, HiMiniEnvelope, HiUser } from "react-icons/hi2";
import { registerValidation } from "@utils/validations/authValidation";
import FormLayout from "@components/Form/FormLayout";
import FormField from "@components/Form/FormField";
import Button from "@components/UI/Button";
import RedirectTo from "@components/UI/RedirectTo";
import { registerLink, signInLink } from "@utils/constants/links";

const Register = () => {
	const [, setError] = useState(false);
	const router = useRouter();

	const handleSubmit = async ({ username, email, password }) => {
		try {
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

			if (response.status === 201)
				router.push(`${signInLink.route}?success=true`);
			else {
				const data = await response.json();
				console.log(data);
			}
		} catch (error) {
			setError(false);
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
			<Button type="submit" style="primary">
				Register
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
