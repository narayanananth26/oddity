"use client";
import FormField from "@components/Form/FormField";
import FormLayout from "@components/Form/FormLayout";
import Button from "@components/UI/Button";
import { forgotPasswordValidation } from "@utils/validations/authValidation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiMiniEnvelope } from "react-icons/hi2";

const ForgotPassword = () => {
	const router = useRouter();

	const [emailSent, setEmailSent] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async ({ email }) => {
		try {
			const res = await fetch("/api/auth/forgot-password", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			if (res.ok) {
				setEmailSent(true);
			} else {
				const data = await res.json();
				setError(data.message);
			}
		} catch (error) {
			console.error(error);
			setError("An error occurred");
		}
	};
	return (
		<FormLayout
			initialValues={{ email: "" }}
			validationSchema={forgotPasswordValidation}
			onSubmit={handleSubmit}
		>
			<FormField
				label={<HiMiniEnvelope />}
				type="email"
				name="email"
				placeholder="Email"
			/>
			<Button type="submit" style="primary">
				Continue
			</Button>
			<Button
				type="button"
				style="secondary"
				onClick={(e) => {
					e.preventDefault();
					router.back();
				}}
			>
				Go back
			</Button>
		</FormLayout>
	);
};

export default ForgotPassword;
