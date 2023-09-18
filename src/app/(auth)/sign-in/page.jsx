"use client";
import { signIn } from "next-auth/react";

const SignIn = () => {
	return (
		<div>
			<button onClick={() => signIn("google")}>
				Continue with Google
			</button>
		</div>
	);
};

export default SignIn;
