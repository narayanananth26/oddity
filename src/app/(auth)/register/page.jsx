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

const Register = () => {
	const [, setError] = useState(false);
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

			console.log(res);

			if (res.status === 201) router.push("/sign-in?success=true");
			else {
				const data = await res.json();
				console.log(data);
			}

			// res.status === 201 && router.push("/sign-in?success=true");
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
			<Button style="primary">Register</Button>
			<p className="text-md">
				Already a member?{" "}
				<Link
					href="/sign-in"
					className="text-red-600 hover:underline hover:text-red-700"
				>
					Sign in
				</Link>
			</p>
		</FormLayout>
	);
};

export default Register;
