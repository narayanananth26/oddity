"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiLockClosed, HiMiniEnvelope, HiUser } from "react-icons/hi2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { userValidation } from "@utils/validations/user";
import InputField from "@components/Form/InputField";
import InputError from "@components/Form/InputError";
import FormLayout from "@components/Form/FormLayout";
import FormField from "@components/Form/FormField";
import Button from "@components/UI/Button";
import RedirectTo from "@components/UI/RedirectTo";

const Register = () => {
	const [, setError] = useState(false);
	const router = useRouter();

	const handleSubmit = async ({ username, email, password }) => {
		try {
			const res = await fetch("/api/auth/register", {
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

			// 	console.log(res);

			if (res.status === 201) router.push("/sign-in?success=true");
			else {
				const data = await res.json();
				console.log(data);
			}

			// 	// res.status === 201 && router.push("/sign-in?success=true");
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
			validationSchema={userValidation}
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
				question="Already a member?"
				redirectTo="Sign In"
				redirectToLink="/sign-in"
			/>
		</FormLayout>
	);
};

export default Register;
