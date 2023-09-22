"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiLockClosed, HiMiniEnvelope, HiUser } from "react-icons/hi2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { userValidation } from "@utils/validations/user";
import InputField from "@components/Form/InputField";
import InputError from "@components/Form/InputError";

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

	const initialValues = {
		username: "",
		email: "",
		password: "",
	};

	return (
		<div className="flex-center h-auto">
			<div className="rounded font-oswald px-5 py-10 mt-16 w-80">
				<Formik
					initialValues={initialValues}
					validationSchema={userValidation}
					onSubmit={handleSubmit}
				>
					<Form className="flex flex-col gap-3 w-full">
						<div className="flex gap-2">
							<label htmlFor="username" className="flex-center">
								<HiUser />
							</label>
							<div className="flex flex-col gap-0.5 w-full">
								<InputField
									type="text"
									name="username"
									placeholder="Username"
								/>
								<InputError name="username" />
							</div>
						</div>

						<div className="flex gap-2">
							<label htmlFor="email" className="flex-center">
								<HiMiniEnvelope />
							</label>
							<div className="flex flex-col gap-0.5 w-full">
								<InputField
									type="email"
									name="email"
									placeholder="Email"
								/>
								<InputError name="email" />
							</div>
						</div>

						<div className="flex gap-2">
							<label htmlFor="email" className="flex-center">
								<HiLockClosed />
							</label>
							<div className="flex flex-col gap-0.5 w-full">
								<InputField
									type="password"
									name="password"
									placeholder="Password"
								/>
								<InputError name="password" />
							</div>
						</div>

						<button
							type="submit"
							className="uppercase bg-red-600 rounded-lg py-1 hover:bg-red-800 text-white active:bg-red-600 text-xl mt-5"
						>
							Register
						</button>
						<p className="text-md">
							Already a member?{" "}
							<Link
								href="/sign-in"
								className="text-red-600 hover:underline hover:text-red-700"
							>
								Sign in
							</Link>
						</p>
					</Form>
				</Formik>
			</div>
		</div>
	);
};

export default Register;
