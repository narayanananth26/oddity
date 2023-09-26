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
			const res = await fetch(`/api/auth/${registerLink}`, {
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

			if (res.status === 201) router.push(`${signInLink}?success=true`);
			else {
				const data = await res.json();
				console.log(data);
			}
		} catch (err) {
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
				label={<HiUser />}
				type="text"
				name="username"
				placeholder="Username"
			/>
			<FormField
				label={<HiMiniEnvelope />}
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
			<Button type="submit" style="primary">
				Register
			</Button>
			<RedirectTo
				text="Already a member?"
				linkText="Sign in"
				redirectTo={signInLink}
			/>
		</FormLayout>
	);
};

export default Register;
